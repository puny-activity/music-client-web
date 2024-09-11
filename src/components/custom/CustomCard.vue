<script lang="ts" setup>
import BaseInteractive from '@/components/custom/BaseInteractive.vue'
import { nextTick, onMounted, ref } from 'vue'

let resizeObserver: ResizeObserver | null = null

const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)

const props = defineProps({
  backgroundColor: {
    type: String
  },
  images: {
    type: Array as () => string[],
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  await nextTick()
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(containerRef.value)
    updateWidth()
  }
})

const updateWidth = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth
  }
}
</script>

<template>
  <div class = "container" ref = "containerRef">
    <BaseInteractive class = "card" :style="[{  backgroundColor: backgroundColor }]">

      <div class="image-container"  :style="[{ width: containerWidth + 'px', height: containerWidth + 'px' }]">
        <div v-if="images.length === 1" class="image-container" >
          <img :src="images[0]" class="card-image full-image" alt="image0">
        </div>
        <div v-if="images.length === 2" class="image-container" >
          <img :src="images[0]" class="card-image left-image" alt="image0"  :style="[{  height: containerWidth + 'px' }]">
          <img :src="images[1]" class="card-image right-image" alt="image1" :style="[{  height: containerWidth + 'px' }]">
        </div>
        <div v-if="images.length === 3" class="image-container" >
          <img :src="images[0]" class="card-image left-image" alt="image0"  :style="[{  height: containerWidth + 'px' }]">
          <img :src="images[1]" class="card-image right-top-image" alt="image1" :style="[{  height: 0.49*containerWidth + 'px' }]">
          <img :src="images[2]" class="card-image right-bottom-image" alt="image2" :style="[{  height: 0.49*containerWidth + 'px' }]">
        </div>
        <div v-if="images.length === 4" class="image-container" >
          <img :src="images[0]" class="card-image left-top-image" alt="image0"  :style="[{  height: 0.49*containerWidth + 'px' }]">
          <img :src="images[1]" class="card-image left-bottom-image" alt="image1" :style="[{  height: 0.49*containerWidth + 'px' }]">
          <img :src="images[2]" class="card-image right-top-image" alt="image2" :style="[{  height: 0.49*containerWidth + 'px' }]">
          <img :src="images[3]" class="card-image right-bottom-image" alt="image3" :style="[{  height: 0.49*containerWidth + 'px' }]">
        </div>
      </div>

      <div class="text-wrapper">
        <span class="text">{{ text }}</span>
      </div>

    </BaseInteractive>
  </div>
</template>

<style scoped>
* {

}

.card {
  aspect-ratio: 0.82;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.full-image {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.5vw;
}

.left-image {
  width: 100%;
  position: absolute;
  left: -25.5%;
  clip-path: inset(0% 25.5% round 0.5vw 0px 0px 0.5vw);
}

.right-image {
  width: 100%;
  position: absolute;
  right: -25.5%;
  clip-path: inset(0% 25.5% round 0px 0.5vw 0.5vw 0px);
}

.left-top-image {
  width: 49%;
  position: absolute;
  left: 0;
  top: 0;
}

.left-bottom-image {
  width: 49%;
  border-bottom-left-radius: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
}

.right-top-image {
  width: 49%;
  border-top-right-radius: 10px;
  position: absolute;
  right: 0;
  top: 0;
}

.right-bottom-image {
  width: 49%;
  border-bottom-right-radius: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
}

.card-image {
  object-fit: cover;
}

.text-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5vw;
  padding: 0.2vw;
  overflow: hidden;
  text-align: center;
}

.text {
  font-size: 0.7vw;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
