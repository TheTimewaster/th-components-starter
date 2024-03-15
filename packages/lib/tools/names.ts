import ts from 'typescript';
import * as fs from 'fs';
import * as glob from 'glob';

import { consola } from 'consola';
import path from 'path';

const aliases = {
  '@composables': 'src/composables',
  '@components': 'src/components',
};

consola.start('Creating modules file...');
const mode = await consola.prompt('Do you want to export components or composables or both', {
  type: 'select',
  options: ['both', 'components', 'composables'],
  initial: 'both',
});

const addModuleByExtension = (normalizedPath: string, symbolText: string, extensions: Array<string>) => {
  const ret: string[] = [];
  // first test, if the path exists and is a directory, we want to skip that
  if (fs.existsSync(normalizedPath) && fs.lstatSync(normalizedPath).isDirectory()) return ret;

  // next up, test if the file exists with given extensions
  extensions.forEach((ext) => {
    const fullExtension = `.${ext}`;
    let fileName = normalizedPath;
    if (!normalizedPath.endsWith(fullExtension)) {
      // if the symbol text does not end with the file extension, we will add it
      fileName += fullExtension;
    }

    // otherwise test if the file exists
    if (fs.existsSync(fileName) && fs.lstatSync(fileName).isFile()) {
      ret.push(symbolText.replace(fullExtension, ''));
    }
  });

  return ret;
};
// Function to get all exported symbols
function getExportedModules(indexFile: ts.SourceFile, extract: 'components' | 'composables'): string[] {
  const exportedModules: string[] = [];
  // console.log(sourceFile.fileName, sourceFile.getChildren());

  ts.forEachChild(indexFile, (node) => {
    if (ts.isExportDeclaration(node) && node.moduleSpecifier != null) {
      // get only symbol from the text and exclude any file extension
      const text = node.moduleSpecifier.getText().replace(/['"]/g, '');

      let normalizedPath: string | null = null;
      // in case the text starts with a alias, we have to replace it with the actual path
      const alias = Object.keys(aliases).find((key) => text.startsWith(key));
      const symbolText = text.split('/').pop();

      if (alias != null) {
        const normalizedBase = indexFile.fileName.replace('index.ts', '').replace(alias, aliases[alias]);
        normalizedPath = path.join(normalizedBase, text.replace(alias, ''));
      } else if (symbolText != null) {
        normalizedPath = indexFile.fileName.replace('index.ts', symbolText.replace('./', ''));
      }

      if (normalizedPath != null && symbolText != null) {
        // based on the current location of the index.ts, we have to look for a relative path

        if (extract === 'composables') {
          const modules = addModuleByExtension(normalizedPath, symbolText, ['ts', 'js']);
          exportedModules.push(...modules);
        } else {
          const modules = addModuleByExtension(normalizedPath, symbolText, ['vue']);
          exportedModules.push(...modules);

          // in case the component is a typescript file, we have to put this into consideration
        }
      }
    }
  });

  return exportedModules;
}

// Get all index.ts files in the src directory and its subdirectories
const indexFiles = glob.sync('./src/**/index.ts');

// Create a program with the index.ts files
const program = ts.createProgram(indexFiles, {});
const checker = program.getTypeChecker();

const exportedComposables: { [file: string]: string[] } = {};
const extractComposables = (file: string, sourceFile: ts.SourceFile) => {
  if ((mode === 'both' || mode === 'composables') && file.indexOf('composables') >= 0) {
    // composables need other handling than components
    const exportedModules = getExportedModules(sourceFile, 'composables');

    if (exportedModules.length > 0) {
      exportedComposables[file] = exportedModules;
    }
    fs.writeFileSync('./composables.ts', `export default ${JSON.stringify(exportedComposables, null, 2)};`);
  }
};

const exportedComponents: { [file: string]: string[] } = {};
const extractComponents = (file: string, sourceFile: ts.SourceFile) => {
  if ((mode === 'both' || mode === 'components') && file.indexOf('composables') === -1) {
    // components need other handling than composables
    const exportedModules = getExportedModules(sourceFile, 'components');

    if (exportedModules.length > 0) {
      exportedComponents[file] = exportedModules;
    }
    fs.writeFileSync('./components.ts', `export default ${JSON.stringify(exportedComponents, null, 2)};`);
  }
};

// Get all exported modules from each index.ts file
indexFiles.forEach((file) => {
  // exclude the src/index.ts file
  if (file.indexOf('src/index.ts') >= 0) return;

  // here we want to separate composables and components
  // skip the file if it's not the type we want
  if (mode === 'composables' && file.indexOf('composables') >= 0) return;
  if (mode === 'components' && file.indexOf('composables') >= 0) return;

  const sourceFile = program.getSourceFile(file);
  // now if we are here, we are sure that the file is the type we want

  if (sourceFile == null) return;

  extractComposables(file, sourceFile);

  extractComponents(file, sourceFile);
});

if (mode === 'both' || mode === 'composables') {
  consola.info('Exported components:', Object.values(exportedComponents).flat().length);
}

if (mode === 'both' || mode === 'components') {
  consola.info('Exported composables:', Object.values(exportedComposables).flat().length);
}

consola.success('Modules file created to ./components.ts');
