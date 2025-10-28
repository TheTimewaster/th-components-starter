<template>
  <div class="th-header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
const { title = 'ThHeader' } = defineProps<{
  /**
   * the header title
   */
  title?: string;
}>();
</script>

<style scoped lang="scss" src="./ThHeader.scss" />
