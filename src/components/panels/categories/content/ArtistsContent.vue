<template>
  <div class="artists-content">
    <div v-if="!isContent" class="artists-content-grid" @scroll="onScroll">
      <CustomCard
        v-for="artist in artistsList"
        :key="artist.id"
        :images="getArtistCovers(artist)"
        :text="artist.name"
        background-color="#EBEBEB"
        class="artists-content-grid-item"
        size-change-percent="4"
        @click="openArtistSongs(artist.id)"
      />
    </div>
    <div v-if="isContent" class="artists-content-grid" @scroll="onScroll">
      <CustomCard
        v-for="song in songsList"
        :key="song.id"
        :images="[getSongCover(song)]"
        :text="song.title"
        background-color="#EBEBEB"
        class="artists-content-grid-item"
        size-change-percent="4"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { useCoversStore } from '@/stores/useCoversStore'
import { ArtistService } from '@/services/ArtistService'
import { type GetSongsSong, SongService } from '@/services/SongService'
import CustomCard from '@/components/custom/CustomCard.vue'
import defaultCover from '@/assets/default/artistCover.png'

const artistsList = ref<GetArtistsArtist[]>([])
const songsList = ref<GetSongsSong[]>([])
const nextCursor = ref<string | null>(null)
const nextContentCursor = ref<string | null>(null)
const currentArtistId = ref<string | null>(null)
const isLoading = ref(false)
const isContentLoading = ref(false)
const isContent = ref(false)
const coversStore = useCoversStore()

const loadArtists = async () => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    const response = await ArtistService.getArtists(21, '', nextCursor.value)
    artistsList.value.push(...response.artists)
    nextCursor.value = response.pagination.next_cursor

    for (const artist of response.artists) {
      for (const cover of artist.covers) {
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

const openArtistSongs = async (artistId: string) => {
  currentArtistId.value = artistId
  await loadSongs()
}

const loadSongs = async () => {
  isContent.value = true
  if (isContentLoading.value) return

  isContentLoading.value = true
  try {
    const response = await SongService.getSongs(
      21,
      null,
      null,
      [currentArtistId.value],
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
  const container = document.querySelector('.artists-content-grid') as HTMLElement
  if (container.clientHeight >= container.scrollHeight) {
    if (isContent.value) {
      if (nextContentCursor.value) {
        loadSongs()
      }
    } else {
      if (nextCursor.value) {
        loadArtists()
      }
    }
  }
}

onMounted(() => {
  loadArtists()
})

const getArtistCovers = (artist) => {
  if (artist.covers.length === 0) {
    return [defaultCover]
  }
  return artist.covers.slice(0, 4).map((cover) => coversStore.getCoverUrlById(cover.id))
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
      loadArtists()
    }
  } else if (isContent.value) {
    if (scrollThreshold < 200 && !isContentLoading.value && nextContentCursor.value) {
      loadSongs()
    }
  }
}
</script>

<style scoped>
.artists-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.artists-content-grid {
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

.artists-content-grid-item {
  margin-bottom: 6px;
}
</style>
