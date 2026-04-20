<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => route.meta.title || String(route.name ?? route.path))
</script>

<template>
  <div class="page-placeholder">
    <h2 class="title">{{ title }}</h2>
    <p class="hint">页面开发中</p>
  </div>
</template>

<style scoped>
.page-placeholder {
  padding: 8px 4px;
}
.title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: rgb(36, 51, 108);
}
.hint {
  margin: 0;
  color: #909399;
  font-size: 14px;
}
</style>
