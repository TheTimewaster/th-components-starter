<template>
  <button @click.prevent="handleClick" class="th-button">
    <slot :textUppercase="uppercaseText">
      {{ text }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Events {
  (e: 'click'): void;
}

const props = withDefaults(
  defineProps<{
    /**
     * the button text content
     */
    text: string;
  }>(),
  {
    text: 'click here',
  }
);

const emit = defineEmits<Events>();

const uppercaseText = computed(() => props.text.toUpperCase());

const handleClick = () => emit('click');
</script>

<style scoped lang="scss" src="./ThButton.scss" />
