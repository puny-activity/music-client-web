<template>
  <div class="container">
    <CurrentTrack class="current-track"></CurrentTrack>
    <PlaybackControl
      :style="{ height: playbackControlHeight }"
      class="playback-control"
      @toggleMainControlVisibility="toggleMainControlVisibility"
    >
    </PlaybackControl>
  </div>
</template>

<script lang="ts" setup>
import PlaybackControl from '@/components/panels/playback-control/PlaybackControl.vue'
import CurrentTrack from '@/components/panels/current-track/CurrentTrack.vue'

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
}

.current-track {
}

.playback-control {
  background-color: black;
  height: 3vh;
  opacity: 20%;
}
</style>
