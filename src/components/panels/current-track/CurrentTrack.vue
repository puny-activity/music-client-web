<template>
  <div class="container">
    <div class="cover-and-info">
      <div class="album-cover">
        <img :src="currentSong ? getSongCover(currentSong) : defaultCover" alt="Обложка" />
      </div>
      <div :style="{ fontSize: computedFontSize + 'px' }" class="track-info">
        <h2>{{ currentSong ? currentSong.title : '' }}</h2>
        <h4>{{ currentSong ? currentSong.artist.title : '' }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import defaultCover from '@/assets/default/artistCover.png'
import type { GetSongsSong } from '@/services/SongService'
import { useCoversStore } from '@/stores/useCoversStore'
const coversStore = useCoversStore()

const emit = defineEmits(['toggleMainControlVisibility'])

const props = defineProps<{
  currentSong: GetSongsSong | null
}>()

const getSongCover = (song: GetSongsSong) => {
  if (song.cover_id) {
    return coversStore.getCoverUrlById(song.cover_id)
  } else {
    return defaultCover
  }
}

const toggleMainControlVisibility = () => {
  emit('toggleMainControlVisibility')
}
</script>

<style scoped>
* {
}

.container {
  color: aliceblue;
  background-color: #412e45;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  font-size: 3vh;
}

.cover-and-info {
  display: flex;
  justify-content: space-between;
  height: 100%; /* Высота родительского элемента должна быть определена */
}

.album-cover {
  width: 50%;
  height: 60%;
  margin-right: auto; /* Отодвигаем вправо */
  display: flex;
  justify-content: flex-end; /* Выравниваем изображение по правому краю своей половины */
  align-self: center; /* Центрируем блок по вертикали */
}

.album-cover img {
  border-radius: 2vh;
  max-width: 100%; /* Изображение займет всю ширину блока .album-cover */
  max-height: 100%; /* Теперь высота изображения будет ограничена высотой .album-cover */
  height: auto; /* Высота будет масштабироваться автоматически */
  object-fit: cover; /* Изображение сохранит свои пропорции */
  aspect-ratio: 1;
}

.track-info {
  width: 50%;
  margin-left: auto; /* Отодвигаем влево */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрируем содержимое по вертикали */
  padding-left: 2ex; /* Отступ слева, чтобы текст не прилипал к краю */
}

h2,
h4 {
  margin: 0; /* Убрать стандартные отступы для заголовков */
  padding: 0; /* Убрать стандартные отступы для заголовков */
}
</style>
