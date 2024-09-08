<template>
  <div class="container"></div>
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
  background-color: #00bd7e;
}
</style>
