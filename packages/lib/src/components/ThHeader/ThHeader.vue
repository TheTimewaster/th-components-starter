<template>
  <div class="th-header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
  title: {
    type: String,
    default: 'Default Header',
  },
});
</script>

<style scoped lang="scss" src="./ThHeader.scss" />
