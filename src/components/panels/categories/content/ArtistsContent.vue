<template>
  <div class="artists-content">
    <div class="artists-content-grid">
      <CustomCard
        v-for="artist in artistsList"
        :key="artist.id"
        :card-text="artist.name"
        :images="[covers[randomizeInteger(0, 6)]]"
        :text="artist.name"
        background-color="#EBEBEB"
        class="artists-content-grid-item"
      />
      <CustomCard
        v-for="artist in artistsList"
        :key="artist.id"
        :card-text="artist.name"
        :images="[covers[randomizeInteger(0, 6)], covers[randomizeInteger(0, 6)]]"
        :text="artist.name"
        background-color="#EBEBEB"
        class="artists-content-grid-item"
      />
      <CustomCard
        v-for="artist in artistsList"
        :key="artist.id"
        :card-text="artist.name"
        :images="[
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)]
        ]"
        :text="artist.name"
        background-color="#EBEBEB"
        class="artists-content-grid-item"
      />
      <CustomCard
        v-for="artist in artistsList"
        :key="artist.id"
        :card-text="artist.name"
        :images="[
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)],
          covers[randomizeInteger(0, 6)]
        ]"
        :text="artist.name"
        background-color="#EBEBEB"
        class="artists-content-grid-item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { ArtistService, GetArtistsResponse } from '@/services/ArtistService'
import CustomCard from '@/components/custom/CustomCard.vue'
import coverAce from '@/assets/test/cover-ace.png'
import coverFlat from '@/assets/test/cover-flat.jpg'
import coverEva from '@/assets/test/cover-eva.png'
import coverGachi from '@/assets/test/cover-gachi.png'
import coverUnd from '@/assets/test/cover-und.png'
import coverZhang from '@/assets/test/cover-zhang.png'
import coverLove from '@/assets/test/cover-love.png'

const artistsPrevPage = ref<GetArtistsResponse>()
const artistsCurrentPage = ref<GetArtistsResponse>()
const artistsNextPage = ref<GetArtistsResponse>()

const covers = [coverAce, coverFlat, coverEva, coverGachi, coverUnd, coverZhang, coverLove]
const randomizeInteger = (min: number, max: number): number => {
  return min + Math.floor((max - min + 1) * Math.random())
}

onMounted(async () => {
  let response = ArtistService.getArtists(5, '')
  artistsCurrentPage.value = (await response).artists
})

const artistsList = computed(() => {
  return artistsCurrentPage.value
})
</script>

<style scoped>
.artists-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.artists-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  grid-gap: 1.5%;
  padding: 1.5%;
  height: 1000px;
  aspect-ratio: 2/3;

  overflow-x: hidden;
}

.artists-content-grid-item {
  margin-bottom: 6px;
}
</style>
