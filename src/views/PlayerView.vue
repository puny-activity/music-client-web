<template>
  <div class="player">
    <PlaybackTrack
      :currentSong="currentSong"
      :style="{ height: playbackTrackHeight }"
      class="playback-track"
      @toggleMainControlVisibility="toggleMainControlVisibility"
    ></PlaybackTrack>

    <MainControl
      :style="{ height: mainControlHeight, opacity: mainControlOpacity }"
      class="main-control"
      @play-song="playSong"
    ></MainControl>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PlaybackTrack from '@/components/PlaybackTrack.vue'
import MainControl from '@/components/MainControl.vue'
import type { GetSongsSong } from '@/services/SongService'

const isMainControlVisible = ref(true)
const playbackTrackHeight = ref('30%')
const mainControlHeight = ref('70%')
const mainControlOpacity = ref('100%')
const currentSong = ref<GetSongsSong | null>(null)

const toggleMainControlVisibility = () => {
  if (isMainControlVisible.value) {
    playbackTrackHeight.value = '100%'
    mainControlHeight.value = '0%'
    mainControlOpacity.value = '0%'
  } else {
    playbackTrackHeight.value = '30%'
    mainControlHeight.value = '70%'
    mainControlOpacity.value = '100%'
  }
  isMainControlVisible.value = !isMainControlVisible.value
}

function playSong(song: GetSongsSong) {
  currentSong.value = song
}
</script>

<style scoped>
.player {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.playback-track,
.main-control {
  transition:
    height 0.5s ease-in-out,
    opacity 0.3s linear;
}

.playback-track {
}

.main-control {
}
</style>
