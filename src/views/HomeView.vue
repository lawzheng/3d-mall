<template>
  <div class="home">
    {{ store.count }}
    <button @click="store.count++">++</button>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <a-button>111111111</a-button>
  </div>
</template>

<script lang="ts" setup>
import { counter } from '../store/index'
import HelloWorld from '../components/HelloWorld.vue'

const store = counter()
</script>
