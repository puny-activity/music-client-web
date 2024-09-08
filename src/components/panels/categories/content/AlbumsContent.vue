<template>
  <div class="albums-content">
    <div class="albums-content-grid">
      <CustomCard
        v-for="album in albumsList"
        :key="album.id"
        :button-text="album.title"
        card-background-color="#EBEBEB"
        class="albums-content-grid-item"
       :card-image="[defaultAlbumCover, defaultAlbumCover, defaultAlbumCover, defaultAlbumCover]" card-text="album.title"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { AlbumService, GetAlbumsResponse } from '@/services/AlbumService'
import CustomCard from '@/components/custom/CustomCard.vue'
import defaultAlbumCover from '@/assets/defaultAlbumCover.png'

const albumsPrevPage = ref<GetAlbumsResponse>()
const albumsCurrentPage = ref<GetAlbumsResponse>()
const albumsNextPage = ref<GetAlbumsResponse>()

onMounted(async () => {
  let response = AlbumService.getAlbums(21, '')
  albumsCurrentPage.value = (await response).albums
})

const albumsList = computed(() => {
  return albumsCurrentPage.value
})
</script>

<style scoped>
.albums-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.albums-content-grid {
  flex-grow: 1;
  overflow-y: scroll;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  align-items: start;
  align-content: start;
  grid-gap: 1.5%;
  padding: 1.5%;

  overflow-x: hidden;
}

.albums-content-grid-item {
  height: 22vh;
  margin-bottom: 6px;
}
</style>
