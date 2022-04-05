<template>
  <h1>首页</h1>
  <ul>
    <li v-for="(item, i) in hero">
      <h3>{{ item.category }}</h3>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import * as api from '../api/home'
const data = await api.getHomePage();

const hero = reactive(data.hero)

</script>