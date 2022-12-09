<template>
  <button @click.prevent="handleClick" class="th-button">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  /**
   * The text appearing in the button
   */
  text: {
    type: String,
    default: 'Click here!',
  },
});

const emit = defineEmits(['click']);

const handleClick = () => emit('click');
</script>

<style scoped lang="scss" src="./ThButton.scss" />
