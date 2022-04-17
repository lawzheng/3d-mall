<template>
  <div v-show="data.isLoading" class="loading">1</div>
  <div>2</div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { getProducts } from '../api/product'

const data = reactive({
  products: [],
  isLoading: true,
})

onMounted(async () => {
  let result = await getProducts()
  console.log(result)
  data.isLoading = false
})
</script>
