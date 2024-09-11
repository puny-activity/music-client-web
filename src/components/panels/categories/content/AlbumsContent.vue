<template>
  <div class="albums-content">
    <div class="albums-content-grid">
      <CustomCard
        v-for="album in albumsList"
        :key="album.id"
        :card-text="album.title"
        :images="[covers[randomizeInteger(0, 6)]]"
        :text="album.title"
        background-color="#EBEBEB"
        class="albums-content-grid-item"
      />
      <CustomCard
        v-for="album in albumsList"
        :key="album.id"
        :card-text="album.title"
        :images="[covers[randomizeInteger(0, 6)], covers[randomizeInteger(0, 6)]]"
        :text="album.title"
        background-color="#EBEBEB"
        class="albums-content-grid-item"
      />
      <CustomCard
        v-for="album in albumsList"
        :key="album.id"
        :card-text="album.title"
        :images="[
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)]
        ]"
        :text="album.title"
        background-color="#EBEBEB"
        class="albums-content-grid-item"
      />
      <CustomCard
        v-for="album in albumsList"
        :key="album.id"
        :card-text="album.title"
        :images="[
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)]
        ]"
        :text="album.title"
        background-color="#EBEBEB"
        class="albums-content-grid-item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { AlbumService, GetAlbumsResponse } from '@/services/AlbumService'
import CustomCard from '@/components/custom/CustomCard.vue'
import coverAce from '@/assets/test/cover-ace.png'
import coverFlat from '@/assets/test/cover-flat.jpg'
import coverEva from '@/assets/test/cover-eva.png'
import coverGachi from '@/assets/test/cover-gachi.png'
import coverUnd from '@/assets/test/cover-und.png'
import coverZhang from '@/assets/test/cover-zhang.png'
import coverLove from '@/assets/test/cover-love.png'

const albumsPrevPage = ref<GetAlbumsResponse>()
const albumsCurrentPage = ref<GetAlbumsResponse>()
const albumsNextPage = ref<GetAlbumsResponse>()

const covers = [coverAce, coverFlat, coverEva, coverGachi, coverUnd, coverZhang, coverLove]
const randomizeInteger = (min: number, max: number): number => {
  return min + Math.floor((max - min + 1) * Math.random())
}

onMounted(async () => {
  let response = AlbumService.getAlbums(5, '')
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  grid-gap: 1.5%;
  padding: 1.5%;
  height: 1000px;
  aspect-ratio: 2/3;

  overflow-x: hidden;
}

.albums-content-grid-item {
  margin-bottom: 6px;
}
</style>
