<template>
  <div class="th-header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /**
     * the header title
     */
    title?: string;
  }>(),
  {
    title: 'ThHeader',
  }
);
</script>

<style scoped lang="scss" src="./ThHeader.scss" />
