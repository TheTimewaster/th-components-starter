import { ref } from 'vue';

export default () => {
  const isDarkMode = ref(false);
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };
  return {
    isDarkMode,
    toggleDarkMode,
  };
};
