<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { initIdFromUrl } from '@/utils/idStore'
import {
  CircleCheck,
  Document,
  FolderOpened,
  Goods,
  Message,
} from '@element-plus/icons-vue'

const route = useRoute()

// 组件层三重保险：再兜底固化一次
onMounted(() => {
  initIdFromUrl()
})
</script>

<template>
  <el-container class="app-shell">
    <el-aside
      width="200px"
      style="
        border-right: 1px solid #eee;
        display: flex;
        flex-direction: column;
        background-color: #e7eefc;
      "
    >
      <div
        class="aside-title"
        style="color: rgb(36, 51, 108); display: flex; align-items: center"
      >
        <img
          src="./assets/logo1.png"
          alt="logo"
          style="height: 2.5em; margin-right: 8px"
        />
        睿道资产管理
      </div>
      <div class="aside-scroll" style="border-right: 1px solid #dcdfe6">
        <el-scrollbar style="height: 100%">
          <el-menu
            :default-active="route.path"
            class="el-menu-vertical-demo"
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
              <!-- <el-sub-menu index="patent-mgmt"> -->
                <!-- <template #title>
                  <el-icon><Document /></el-icon>
                  <span>专利来文管理</span>
                </template> -->
              
                <!-- <el-menu-item index="/patent/no-action">
                  <el-icon><CircleCheck /></el-icon>
                  <span>专利无需处理</span>
                </el-menu-item> -->
              <!-- </el-sub-menu> -->

              <!-- <el-sub-menu index="trademark-mgmt"> -->
                <!-- <template #title>
                  <el-icon><Goods /></el-icon>
                  <span>商标管理</span>
                </template> -->
               
                <!-- <el-menu-item index="/trademark/no-action">
                  <el-icon><CircleCheck /></el-icon>
                  <span>商标无需处理</span>
                </el-menu-item> -->
              <!-- </el-sub-menu> -->
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>

    <el-container class="app-body">
      <el-header
        style="
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          background-color: #e7eefc;
        "
      >
        来文工作台
      </el-header>
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
  background-color: #e7eefc;
}

.app-body {
  height: 100%;
  min-width: 0;
  background-color: #e7eefc;
}

.app-main {
  background-color: #e7eefc;
  padding: 16px;
}

.aside-title {
  padding: 16px;
  font-weight: 600;
  background-color: #e7eefc;
}



:deep(.el-menu) {
  border-right: none;
  background-color: #e7eefc;
  scrollbar-width: none;
}
</style>
