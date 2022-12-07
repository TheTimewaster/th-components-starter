<template>
  <div class="th-header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "Default Header",
  },
});
</script>

<style scoped lang="scss">
.th-header {
  h1 {
    font-weight: bold;
  }
}
</style>
