<template>
  <a class="th-button" :href>
    <slot :textUppercase="uppercaseText">
      {{ text }}
    </slot>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * the button text content
     */
    text: string;

    /**
     * the link href
     */
    href: string;
  }>(),
  {
    text: 'click here',
  },
);

const uppercaseText = computed(() => props.text.toUpperCase());
</script>

<style scoped lang="scss" src="./ThButton.scss" />
