<template>
  <div class="category-list">
    <CustomButton
      v-for="category in categories"
      :key="category.type"
      :button-icon="category.icon"
      :button-text="category.text"
      :button-type="category.type"
      :size-change-percent="2"
      background-color="#FAFAFA"
      background-color-active="#FAFAFA"
      background-color-hover="#FFFFFF"
      button-padding="10px"
      class="category-item"
      contentPosition="left"
      inner-indent="1vh"
      text-size="1.6vh"
      @click="emitCategory(category.type)"
    />
  </div>
</template>

<script lang="ts" setup>
import CustomButton from '@/components/custom/CustomButton.vue'

import categoryAlbums from '@/assets/icons/categories/category-albums.svg'
import categoryArtists from '@/assets/icons/categories/category-artists.svg'
import categoryGenres from '@/assets/icons/categories/category-genres.svg'
import categorySongs from '@/assets/icons/categories/category-songs.svg'

const categories = [
  // {text: "Текущее", type: "categoryNow", icon: categoryNow},
  // {text: "Недавние", type: "categoryLast", icon: categoryLast},
  { text: 'Альбомы', type: 'categoryAlbums', icon: categoryAlbums },
  { text: 'Исполнители', type: 'categoryArtists', icon: categoryArtists },
  { text: 'Жанры', type: 'categoryGenres', icon: categoryGenres },
  // {text: "Плейлисты", type: "categoryPlaylists", icon: categoryPlaylists},
  { text: 'Треки', type: 'categorySongs', icon: categorySongs }
  // {text: "Файлы", type: "categoryDirectories", icon: categoryDirectories},
]

const emit = defineEmits(['change-category'])

function emitCategory(categoryName: string) {
  emit('change-category', categoryName)
}
</script>

<style scoped>
* {
}

.category-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1vh;
  padding-right: 1vh;
  width: 100%;
  height: 100%;
  background-color: #ebebeb;
}

.category-item {
  height: 5vh;
  width: 100%;
  margin-top: 1vh;
  margin-left: 1vh;
  margin-right: 1vh;
}
</style>
