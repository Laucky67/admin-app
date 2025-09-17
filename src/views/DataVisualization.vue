<template>
  <div class="data-visualization">
    <iframe 
      :src="staticPageUrl" 
      frameborder="0" 
      width="100%" 
      height="100%"
      style="border: none; display: block;"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const staticPageUrl = ref('')

onMounted(() => {
  // 获取静态页面的URL
  staticPageUrl.value = new URL('/src/views/static/index.html', import.meta.url).href
})
</script>

<style scoped>
.data-visualization {
  width: 100%;
  height: 100%; /* 减去导航栏高度 */
  overflow: hidden;
}
</style>
