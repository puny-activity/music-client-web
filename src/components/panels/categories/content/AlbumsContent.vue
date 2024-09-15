<template>
  <div class="albums-content">
    <div v-if="!isContent" class="albums-content-grid" @scroll="onScroll">
      <CustomCard
        v-for="album in albumsList"
        :key="album.id"
        :images="getAlbumCovers(album)"
        :size-change-percent="4"
        :text="album.title"
        background-color="#EBEBEB"
        class="albums-content-grid-item"
        @click="openAlbumSongs(album.id)"
      />
    </div>
    <div v-if="isContent" class="albums-content-grid" @scroll="onScroll">
      <CustomCard
        v-for="song in songsList"
        :key="song.id"
        :images="[getSongCover(song)]"
        :size-change-percent="4"
        :text="song.title"
        background-color="#EBEBEB"
        class="albums-content-grid-item"
        @click="playSong(song)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { useCoversStore } from '@/stores/useCoversStore'
import { AlbumService } from '@/services/AlbumService'
import { type GetSongsSong, SongService } from '@/services/SongService'
import CustomCard from '@/components/custom/CustomCard.vue'
import defaultCover from '@/assets/default/albumCover.png'

const albumsList = ref<GetAlbumsAlbum[]>([])
const songsList = ref<GetSongsSong[]>([])
const nextCursor = ref<string | null>(null)
const nextContentCursor = ref<string | null>(null)
const currentAlbumId = ref<string | null>(null)
const isLoading = ref(false)
const isContentLoading = ref(false)
const isContent = ref(false)
const coversStore = useCoversStore()

const emit = defineEmits(['play-song'])

const playSong = async (song: GetSongsSong) => {
  emit('play-song', song)
}

const loadAlbums = async () => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    const response = await AlbumService.getAlbums(21, '', nextCursor.value)
    albumsList.value.push(...response.albums)
    nextCursor.value = response.pagination.next_cursor

    for (const album of response.albums) {
      for (const cover of album.covers) {
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

const openAlbumSongs = async (albumId: string) => {
  currentAlbumId.value = albumId
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
      [currentAlbumId.value],
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
  const container = document.querySelector('.albums-content-grid') as HTMLElement
  if (container.clientHeight >= container.scrollHeight) {
    if (isContent.value) {
      if (nextContentCursor.value) {
        loadSongs()
      }
    } else {
      if (nextCursor.value) {
        loadAlbums()
      }
    }
  }
}

onMounted(() => {
  loadAlbums()
})

const getAlbumCovers = (album) => {
  if (album.covers.length === 0) {
    return [defaultCover]
  }
  return album.covers.slice(0, 4).map((cover) => coversStore.getCoverUrlById(cover.id))
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
      loadAlbums()
    }
  } else if (isContent.value) {
    if (scrollThreshold < 200 && !isContentLoading.value && nextContentCursor.value) {
      loadSongs()
    }
  }
}
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

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12%, 1fr));
  align-items: start;
  align-content: start;
  grid-gap: 1.5%;
  padding: 1.5%;

  overflow-y: scroll;
  overflow-x: hidden;
}

.albums-content-grid-item {
  margin-bottom: 6px;
}
</style>
