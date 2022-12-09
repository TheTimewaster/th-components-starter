<template>
  <button @click.prevent="handleClick" class="th-button">
    <slot :textUppercase="uppercaseText">
      {{ text }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, computed } from 'vue';
export interface Props {
  /**
   * the button text content
   */
  text: string;
}

export interface Events {
  (e: 'click'): void;
}

const props = withDefaults(defineProps<Props>(), {
  text: 'click here',
});

const emit = defineEmits<Events>();

const uppercaseText = computed(() => props.text.toUpperCase());

const handleClick = () => emit('click');
</script>

<style scoped lang="scss" src="./ThButton.scss" />
