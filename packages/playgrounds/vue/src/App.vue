<script setup lang="ts">
import { ref } from 'vue';
import CounterBar from './components/CounterBar.vue';
import { ThHeader } from '@th-components/lib';

const title = ref<string>('Test UI for component lib 📒');
</script>

<template>
  <div>
    <input type="text" v-model="title" />
    <header>
      <th-header :title="title" />
    </header>
    <main>
      <counter-bar />
    </main>
  </div>
</template>
