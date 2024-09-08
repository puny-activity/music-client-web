<template>
  <div class="container">
    <button style="width: 100px; height: 100px" @click="toggleMainControlVisibility"></button>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['toggleMainControlVisibility'])

const toggleMainControlVisibility = () => {
  emit('toggleMainControlVisibility')
}
</script>

<style scoped>
* {
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #342537;
}
</style>
