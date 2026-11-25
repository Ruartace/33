<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { initIdFromUrl } from '@/utils/idStore'
import { FolderOpened, Message } from '@element-plus/icons-vue'

const route = useRoute()

// 组件层三重保险：再兜底固化一次
onMounted(() => {
  initIdFromUrl()
})
</script>

<template>
  <el-container class="app-shell" direction="vertical">
    <el-header class="app-header">
      <img src="./assets/logo1.png" alt="logo" class="app-logo" />
      <span class="app-brand">睿道资产管理</span>
    </el-header>

    <el-container class="app-frame">
      <el-aside width="220px" class="app-aside">
        <el-scrollbar>
          <el-menu
            :default-active="route.path"
            class="app-menu"
            :default-openeds="['laiwen-root']"
            router
          >
            <el-sub-menu index="laiwen-root">
              <template #title>
                <el-icon><FolderOpened /></el-icon>
                <span>来文管理</span>
              </template>
              <el-menu-item index="/patent/electronic">
                <el-icon><Message /></el-icon>
                <span>专利电子来文</span>
              </el-menu-item>
              <el-menu-item index="/trademark/electronic">
                <el-icon><Message /></el-icon>
                <span>商标电子来文</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.app-shell {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
}

.app-header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #e7eefc;
  border-bottom: 1px solid #e4eaf6;
}

.app-logo {
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #fff;
}

.app-brand {
  font-size: 18px;
  font-weight: 600;
  color: #24336c;
}

.app-frame {
  flex: 1;
  min-height: 0;
  min-width: 0;
  background-color: #fff;
}

.app-aside {
  height: 100%;
  overflow: hidden;
  background-color: #e7eefc;
  border-right: 1px solid #e4eaf6;
}

.app-main {
  height: 100%;
  padding: 16px 20px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  box-sizing: border-box;
}

.app-menu {
  min-height: 100%;
  border-right: none;
  background-color: #e7eefc;
}

:deep(.el-menu) {
  border-right: none;
  background-color: #e7eefc;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  color: #000;
  background-color: #e7eefc;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: #dce7fb;
}

:deep(.el-menu-item.is-active) {
  color: #4e70ff;
  background-color: #b3d4ff;
}
</style>
