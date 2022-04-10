<template>
<div class="homepage">
  <HomeSwiper :banner="data.banner"></HomeSwiper>
</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import * as api from '../api/home'
import HomeSwiper from './Home/HomeSwiper.vue'
const data = await api.getHomePage();

const hero = reactive(data.hero)

</script>

<style lang="less" scoped>
.homepage {
  padding-top: 46px;
  height: 575px;
  position: relative;
}

.live {
  width: 1200px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  h1 {
    font-size: 30px;
  }

  .live-list {
    display: flex;
    flex-wrap: wrap;
    .live-item {
      width: 240px;
    }
    .live-btn {
      display: flex;
      height: 73px;
      width: 200px;
      background-color: #fff;
      border-radius: 8px 8px 25px 8px;
      margin-bottom: 30px;
      box-shadow: 5px 5px 5px #ccc;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        position: absolute;
        width: 80px;
        height: 80px;
        left: -15px;
        top: -15px;
      }
      h3 {
        font-weight: 900;
        font-size: 20px;
      }
    }
  }
}
</style>