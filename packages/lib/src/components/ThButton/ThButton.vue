<template>
  <button class="th-button" @click.prevent="handleClick">
    <slot :text-uppercase="uppercaseText">
      {{ text }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { text = 'click here' } = defineProps<{
  /**
   * the button text content
   */
  text?: string;
}>();

const emit = defineEmits<{
  click: [];
}>();

const uppercaseText = computed(() => text.toUpperCase());

const handleClick = () => emit('click');
</script>

<style scoped lang="scss" src="./ThButton.scss" />
