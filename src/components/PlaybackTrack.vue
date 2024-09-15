<template>
  <div class="container">
    <CurrentTrack :currentSong="currentSong" class="current-track"></CurrentTrack>
    <PlaybackControl
      :currentSong="currentSong"
      :style="{ height: playbackControlHeight }"
      class="playback-control"
      @toggleMainControlVisibility="toggleMainControlVisibility"
    ></PlaybackControl>
  </div>
</template>

<script lang="ts" setup>
import PlaybackControl from '@/components/panels/playback-control/PlaybackControl.vue'
import CurrentTrack from '@/components/panels/current-track/CurrentTrack.vue'
import { defineProps } from 'vue'
import type { GetSongsSong } from '@/services/SongService'

const props = defineProps<{
  currentSong: GetSongsSong | null
}>()

const emit = defineEmits(['toggleMainControlVisibility'])

const toggleMainControlVisibility = () => {
  emit('toggleMainControlVisibility')
}
</script>

<style scoped>
* {
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #412e45;
  position: relative;
}

.current-track {
}

.playback-control {
  background-color: black;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 3vh; /* Фиксированная высота для нижнего компонента */
  opacity: 20%;
}

</style>
