<template>
  <div class="controls">
    <img
      :src="isPlaying ? iconPause : iconPlay"
      alt="Toggle play/pause"
      class="panel-button"
      @click="togglePlay"
    />
    <div class="time">{{ formatTime(currentTime) }}</div>
    <input
      v-model="currentTime"
      :max="audio.duration || 0"
      class="progress-bar"
      min="0"
      type="range"
      @input="seek"
    />
    <div class="time">{{ formatTime(audio.duration) }}</div>
    <img
      :src="isFullscreen ? iconMinimize : iconMaximize"
      alt="Toggle fullscreen"
      class="panel-button"
      @click="toggleMainControlVisibility"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import iconMaximize from '@/assets/icons/action/maximize-icon.svg'
import iconMinimize from '@/assets/icons/action/minimize-icon.svg'
import iconPlay from '@/assets/icons/action/play-icon.svg'
import iconPause from '@/assets/icons/action/pause-icon.svg'
import { type GetSongsSong, SongService } from '@/services/SongService'

const props = defineProps<{
  currentSong: GetSongsSong | null
}>()

const emit = defineEmits(['toggleMainControlVisibility'])

const audio = new Audio()
const isPlaying = ref(false)
const currentTime = ref(0)
const isFullscreen = ref(false)

watch(
  () => props.currentSong,
  async (newSong) => {
    if (!newSong) {
      return
    }

    try {
      const newUrl = await SongService.getUrl(newSong.id)
      if (audio.src !== newUrl.url) {
        audio.src = newUrl.url
        currentTime.value = 0
        audio.play().catch(() => {
          isPlaying.value = false
        })
        isPlaying.value = true
      }
    } catch (error) {
      console.error('Ошибка при получении URL песни', error)
    }
  }
)

onMounted(() => {
  audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime
  })
  audio.addEventListener('ended', () => {
    // TODO Пока что всегда зациклено
    audio.currentTime = 0
    isPlaying.value = true
    audio.play().catch(() => {
      isPlaying.value = false
    })
    // isPlaying.value = false
  })
})

const togglePlay = () => {
  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play().catch(() => {
      isPlaying.value = false
    })
  }
  isPlaying.value = !isPlaying.value
}

const seek = (event) => {
  audio.currentTime = parseFloat(event.target.value)
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const toggleMainControlVisibility = () => {
  isFullscreen.value = !isFullscreen.value
  emit('toggleMainControlVisibility')
}
</script>

<style scoped>
.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.progress-bar {
  width: 100%;
}

input[type='range'] {
  width: 100%;
}

.time {
  font-size: 0.75vw;
  color: white;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
}

.panel-button {
  height: 100%;
}
</style>
