<script setup lang="ts">
import { ref } from 'vue';
import CounterBar from './components/CounterBar.vue';
import { ThHeader } from '@th-components/lib';

const title = ref<string>('Test UI for component lib 📒');
</script>

<template>
  <div>
    <input v-model="title" class="input" type="text" />
    <header class="header">
      <th-header :title="title" />
    </header>
    <main class="main">
      <counter-bar />
    </main>
  </div>
</template>

<style scoped lang="css">
.input {
  margin-bottom: 1rem;
}

.header {
  margin-bottom: 4rem;
}
</style>
