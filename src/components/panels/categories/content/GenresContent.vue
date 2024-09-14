<template>
  <div class="genres-content">
    <div v-if="!isContent" class="genres-content-grid" @scroll="onScroll">
      <CustomCard
        v-for="genre in genresList"
        :key="genre.id"
        :images="getGenreCovers(genre)"
        :text="genre.name"
        background-color="#EBEBEB"
        class="genres-content-grid-item"
        size-change-percent="4"
        @click="openGenreSongs(genre.id)"
      />
    </div>
    <div v-if="isContent" class="genres-content-grid" @scroll="onScroll">
      <CustomCard
        v-for="song in songsList"
        :key="song.id"
        :images="[getSongCover(song)]"
        :text="song.title"
        background-color="#EBEBEB"
        class="genres-content-grid-item"
        size-change-percent="4"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { useCoversStore } from '@/stores/useCoversStore'
import { GenreService } from '@/services/GenreService'
import { type GetSongsSong, SongService } from '@/services/SongService'
import CustomCard from '@/components/custom/CustomCard.vue'
import defaultCover from '@/assets/default/genreCover.png'

const genresList = ref<GetGenresGenre[]>([])
const songsList = ref<GetSongsSong[]>([])
const nextCursor = ref<string | null>(null)
const nextContentCursor = ref<string | null>(null)
const currentGenreId = ref<string | null>(null)
const isLoading = ref(false)
const isContentLoading = ref(false)
const isContent = ref(false)
const coversStore = useCoversStore()

const loadGenres = async () => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    const response = await GenreService.getGenres(21, '', nextCursor.value)
    genresList.value.push(...response.genres)
    nextCursor.value = response.pagination.next_cursor

    for (const genre of response.genres) {
      for (const cover of genre.covers) {
        await coversStore.fetchCoverUrlById(cover.id)
      }
    }
    isLoading.value = false

    await nextTick()
    checkScrollHeight()
  } catch (error) {
    console.error('Ошибка при подгрузке артистов', error)
  } finally {
    isLoading.value = false
  }
}

const openGenreSongs = async (genreId: string) => {
  currentGenreId.value = genreId
  await loadSongs()
}

const loadSongs = async () => {
  isContent.value = true
  if (isContentLoading.value) return

  isContentLoading.value = true
  try {
    const response = await SongService.getSongs(
      21,
      [currentGenreId.value],
      null,
      null,
      null,
      '',
      nextContentCursor.value
    )
    songsList.value.push(...response.songs)
    nextContentCursor.value = response.pagination.next_cursor

    for (const song of response.songs) {
      if (song.coverId) {
        await coversStore.fetchCoverUrlById(song.coverId)
      }
    }
    isContentLoading.value = false

    await nextTick()
    checkScrollHeight()
  } catch (error) {
    console.error('Ошибка при подгрузке песен', error)
  } finally {
    isContentLoading.value = false
  }
}

const checkScrollHeight = () => {
  const container = document.querySelector('.genres-content-grid') as HTMLElement
  if (container.clientHeight >= container.scrollHeight) {
    if (isContent.value) {
      if (nextContentCursor.value) {
        loadSongs()
      }
    } else {
      if (nextCursor.value) {
        loadGenres()
      }
    }
  }
}

onMounted(() => {
  loadGenres()
})

const getGenreCovers = (genre) => {
  if (genre.covers.length === 0) {
    return [defaultCover]
  }
  return genre.covers.slice(0, 4).map((cover) => coversStore.getCoverUrlById(cover.id))
}

const getSongCover = (song: GetSongsSong) => {
  if (song.cover_id) {
    return coversStore.getCoverUrlById(song.cover_id)
  } else {
    return defaultCover
  }
}

const onScroll = (event: Event) => {
  const target = event.target as HTMLElement
  const scrollThreshold = target.scrollHeight - target.scrollTop - target.clientHeight

  if (!isContent.value) {
    if (scrollThreshold < 200 && !isLoading.value && nextCursor.value) {
      loadGenres()
    }
  } else if (isContent.value) {
    if (scrollThreshold < 200 && !isContentLoading.value && nextContentCursor.value) {
      loadSongs()
    }
  }
}
</script>

<style scoped>
.genres-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.genres-content-grid {
  flex-grow: 1;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12%, 1fr));
  align-items: start;
  align-content: start;
  grid-gap: 1.5%;
  padding: 1.5%;

  overflow-y: scroll;
  overflow-x: hidden;
}

.genres-content-grid-item {
  margin-bottom: 6px;
}
</style>
