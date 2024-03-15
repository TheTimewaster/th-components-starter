<template>
  <div class="counter-bar">
    <th-button @click="decrement" v-slot="{ textUppercase }">
      {{ textUppercase }}
    </th-button>
    <span>
      {{ count }}
    </span>
    <th-button text="Plus" @click="increment" />
  </div>
</template>

<script setup lang="ts">
import { ThButton } from '@th-components/lib';
import { ref } from 'vue';

const count = ref<number>(0);
const increment = () => {
  count.value += 1;
};

const decrement = () => {
  count.value -= 1;
};
</script>

<style scoped lang="scss">
.counter-bar {
  display: flex;
  gap: 2rem;
}
</style>
