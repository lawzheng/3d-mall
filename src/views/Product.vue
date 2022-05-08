<template>
  <div v-show="data.isLoading" class="loading">
    <LoadingBoxVue />
  </div>
  <div v-show="!data.isLoading" id="product" class="product">
    <div class="prod-list" :class="{ hidden: store.isFullscreen }">
      <h1><SketchOutlined></SketchOutlined>产品推荐</h1>
      <div class="products"></div>
    </div>
    <div class="scene-list" :class="{ hidden: store.isFullscreen }">
      <h3><RadarChartOutlined></RadarChartOutlined> 切换使用场景</h3>

      <!-- <div class="scenes">
        <div
          class="scene-item"
          v-for="(scene, index) in data.scenes"
          @click="changeHdr(scene, index)"
        >
          <img
            :class="{ active: index == data.sceneIndex }"
            :src="`./files/hdr/${scene}.jpg`"
            :alt="scene"
          />
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store/index'
import { getProducts } from '../api/product'
import LoadingBoxVue from '../components/LoadingBox.vue'
import {
  SketchOutlined,
  RadarChartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons-vue'

const route = useRoute()
const store = useStore()

const data = reactive({
  products: [],
  isLoading: true,
})

onMounted(async () => {
  let result = await getProducts()
  console.log(result)
  data.isLoading = false

  window.addEventListener('mousewheel', (e) => {
    const deltaY = (e as WheelEvent).deltaY
    if (deltaY > 0) {
      store.setFullscreen(true)
    }
    if (deltaY < 0) {
      store.setFullscreen(false)
    }
  })
})
</script>

<style lang="less" scoped>
.desc {
  position: fixed;
  z-index: 100000;
  background-color: rgba(255, 255, 255, 0.5);
  width: 600px;
  top: 100px;
  left: 50%;
  margin-left: -300px;
  transition: all 0.5s;

  transform: translate(-100vw, 0);
  padding: 15px;
}
.desc.active {
  transform: translate(0, 0);
}
.prod-list {
  width: 300px;
  height: 100vh;
  padding: 60px 0 0;
  position: fixed;
  z-index: 100000;
  transition: all 0.5s;
  background-color: rgba(255, 255, 255, 0.8);
  left: 0;
  top: 0;
  h1 {
    font-size: 20px;
    font-weight: 900;
    padding: 10px 25px 0;
  }
  .products {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .prod-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 250px;
      background-color: #fff;
      border-radius: 20px;
      overflow: hidden;
      margin: 10px 0;
      box-shadow: 2px 2px 5px #666;
      transition: all 0.3s;
      &.active {
        box-shadow: 2px 2px 5px #666, 0px 0px 10px red;
      }
      &:hover {
        transform: translate(0px, -5px);
        box-shadow: 2px 2px 5px #666, 0px 0px 10px orangered;
        // background-color: orange;
      }
      img {
        width: 190px;
      }
      .prod-title {
        padding: 0 20px;
      }
    }
  }
}
.prod-list.hidden {
  transform: translate(-100%, 0);
}
.scene-list {
  width: 300px;
  height: 100vh;
  padding: 60px 0 0;
  position: fixed;
  z-index: 100000;
  transition: all 0.5s;
  background-color: rgba(255, 255, 255, 0.8);
  right: 0;
  top: 0;
  h3 {
    font-size: 20px;
    font-weight: 900;
    padding: 0 30px;
  }
  .scenes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .scene-item {
    padding: 6px 0;

    img {
      width: 250px;
      border-radius: 10px;
      box-shadow: 2px 2px 10px #666;
      transition: all 0.3s;
      &.active {
        box-shadow: 2px 2px 5px #666, 0px 0px 10px red;
      }
      &:hover {
        transform: translate(0px, -5px);
        box-shadow: 2px 2px 5px #666, 0px 0px 10px orangered;
      }
    }
  }
}
.scene-list.hidden {
  transform: translate(100%, 0);
}
</style>
