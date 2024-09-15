<template>
  <div class="container">
    <CategoriesControl class="categories-control" @play-song="playSong"></CategoriesControl>
    <RoomsControl class="rooms-control"></RoomsControl>
  </div>
</template>

<script lang="ts" setup>
import CategoriesControl from '@/components/panels/categories/CategoriesControl.vue'
import RoomsControl from '@/components/panels/rooms/RoomsControl.vue'
import type { GetSongsSong } from '@/services/SongService'

const emit = defineEmits(['play-song'])

function playSong(song: GetSongsSong) {
  emit('play-song', song)
}
</script>

<style scoped>
* {
}

.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
}

.categories-control {
  display: flex;
  width: 75%;
  height: 100%;
}

.rooms-control {
  display: flex;
  width: 25%;
  height: 100%;
  border-left: 2px;
  border-left-color: #ebebeb;
  border-left-style: solid;
}
</style>
