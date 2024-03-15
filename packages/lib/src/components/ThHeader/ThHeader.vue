<template>
  <div class="th-header">
    <h1>{{ title }}</h1>

    <ThButton>Test</ThButton>
  </div>
</template>

<script setup lang="ts">
import ThButton from '@components/ThButton/ThButton.vue';

withDefaults(
  defineProps<{
    /**
     * the header title
     */
    title?: string;
  }>(),
  {
    title: 'ThHeader',
  },
);
</script>

<style scoped lang="scss" src="./ThHeader.scss" />
