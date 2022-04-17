<template>
  <suspense>
    <template #fallback>
      <LoadingBox />
    </template>
    <template #default>
      <HomeAsync />
    </template>
  </suspense>
</template>

<script lang="ts" setup>
import { onMounted, defineAsyncComponent } from 'vue'
import LoadingBox from '../components/LoadingBox.vue'

const HomeAsync = defineAsyncComponent(
  () => import('../components/HomeCom.vue')
)

// onMounted(async () => {
// })
</script>
