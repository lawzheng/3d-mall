<template>
  <suspense>
    <template #fallback>
      <Loading/>
    </template>
    <template #default>
      <HomeAsync/>
    </template>
  </suspense>
</template>

<script lang="ts" setup>
import { onMounted, defineAsyncComponent } from 'vue'
import Loading from '../components/Loading.vue'

const HomeAsync = defineAsyncComponent(() => 
  import('../components/HomeCom.vue')
)

onMounted(async () => {
  
})
</script>
