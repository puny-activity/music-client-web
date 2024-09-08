<template>
  <BaseInteractive class = "custom-card" :style="{ backgroundColor: cardBackgroundColor}">
    <div class="custom-card-content">
      <img
        v-for="(cover, index) in coversToShow"
        :key="index"
        :class="[getImageClass(coversToShow.length, index), 'card-image']"
        :src="cover"
        alt="cover"
      />
      <div
        :style="[{ top: halfWidth * 2 + 'px' }]"
        class="card-text-wrapper"
      >
        <span class="card-text">{{ cardText }}</span>
      </div>
    </div>
  </BaseInteractive>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, onUnmounted, ref} from "vue";
import BaseInteractive from '@/components/custom/BaseInteractive.vue'

const props = defineProps({
  cardBackgroundColor: {
    type: String,
  },
  cardImage: {
    type: Array as () => string[],
    required: true
  },
  cardText: {
    type: String,
    required: true
  },
  sizeChangePercent: {
    type: Number,
    default: 0
  }
})

const coversToShow = computed(() => (props.cardImage))

function getImageClass(length: number, index: number) {
  if (length === 1) {
    return 'card-image-full';

  } else if (length === 2) {
    if (index === 0) {
      return 'card-image-half-left'
    } else if (index === 1) {
      return 'card-image-half-right'
    }

  } else if (length === 3) {
    if (index === 0) {
      return 'card-image-half-left'
    } else if (index === 1) {
      return 'card-image-quarter-top-right';
    } else if (index === 2) {
      return 'card-image-quarter-bottom-right';
    }

  } else if (length === 4) {
    if (index === 0) {
      return 'card-image-quarter-top-left';
    } else if (index === 1) {
      return 'card-image-quarter-top-right';
    } else if (index === 2) {
      return 'card-image-quarter-bottom-left';
    } else if (index === 3) {
      return 'card-image-quarter-bottom-right';
    }
  }
}
</script>

<style scoped>
* {
}

.custom-card {

}

.custom-card-content {
  display: flex;
  flex-direction: column;
}

.card-text-wrapper {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 4px;
  overflow: hidden;
  position: absolute;
}

.card-text {
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-image {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  position: relative;
}

.card-image >>> img {
  width: 100%;
}

.card-image-full {
  width: 100%;
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
}

.card-image-half-left {
  border-radius: 10px;
  width: 100%;
  position: absolute;
  left: -25.5%;
  top: 0;
  clip-path: inset(0% 25.5% round 10px 0px 0px 10px);
}

.card-image-half-right {
  border-radius: 10px;
  width: 100%;
  position: absolute;
  right: -25.5%;
  top: 0;
  clip-path: inset(0% 25.5% round 0px 10px 10px 0px);
}

.card-image-quarter-top-left {
  width: 49%;
  border-top-left-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
}

.card-image-quarter-top-right {
  width: 49%;
  border-top-right-radius: 10px;
  position: absolute;
  right: 0;
  top: 0;
}

.card-image-quarter-bottom-left {
  width: 49%;
  border-bottom-left-radius: 10px;
  position: absolute;
  left: 0;
  bottom: 40px;
}

.card-image-quarter-bottom-right {
  width: 49%;
  border-bottom-right-radius: 10px;
  position: absolute;
  right: 0;
  bottom: 40px;
}
</style>
