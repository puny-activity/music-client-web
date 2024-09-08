<template>
  <div class="container">
    <CategoryList class="category-list" @change-category="changeCategory" />
    <component :is="currentContent" :key="componentKey" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import CategoryList from '@/components/panels/categories/CategoryList.vue'
import GenresContent from '@/components/panels/categories/content/GenresContent.vue'
import AlbumsContent from '@/components/panels/categories/content/AlbumsContent.vue'
import ArtistsContent from '@/components/panels/categories/content/ArtistsContent.vue'
import SongsContent from '@/components/panels/categories/content/SongsContent.vue'

type ContentComponents = {
  [key: string]: ReturnType<typeof defineComponent>
}

const contents: ContentComponents = {
  categoryGenres: GenresContent,
  categoryAlbums: AlbumsContent,
  categoryArtists: ArtistsContent,
  categorySongs: SongsContent
}

const currentContent = ref<ReturnType<typeof defineComponent>>(AlbumsContent)
const componentKey = ref(0)

function changeCategory(content: string) {
  if (content in contents) {
    currentContent.value = contents[content]
    componentKey.value++
  } else {
    throw new Error(`${content} is not defined`)
  }
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
}

.category-list {
  width: 15vw;
}

.category-content {
}
</style>
