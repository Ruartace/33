import { createRouter, createWebHistory } from 'vue-router'
import PlaceholderView from '../views/PlaceholderView.vue'
import Patentincoming from '../views/Patentincoming/index.vue'
import Trademarkincoming from '../views/Trademarkincoming/index.vue'
import { initIdFromUrl, propagateIdToQuery } from '@/utils/idStore'

const routes = [
  { path: '/', redirect: '/patent/electronic' },
  {
    path: '/patent/electronic',
    name: 'patent-electronic',
    component: Patentincoming,
    meta: { title: '专利电子来文' },
  },
  {
    path: '/patent/no-action',
    name: 'patent-no-action',
    component: PlaceholderView,
    meta: { title: '专利无需处理' },
  },
  {
    path: '/trademark/electronic',
    name: 'trademark-electronic',
    component: Trademarkincoming,
    meta: { title: '商标电子来文' },
  },
  {
    path: '/trademark/no-action',
    name: 'trademark-no-action',
    component: PlaceholderView,
    meta: { title: '商标无需处理' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * userId 三线冗余闭环：
 *
 *  1) 固化  initIdFromUrl()         把 URL 上的 ?userId=xxx 写入 localStorage + 内存 cache
 *  2) 透传  propagateIdToQuery()    确保**每一次导航**的 URL 都带 userId（localStorage 有就自动补）
 *  3) 放行  next()                  如果目标 URL 已经有 userId，或者 storage 也没有，直接走
 *
 * 效果：
 *   ✓ 外部跳转 ?userId=36 进来 → init 固化 → 守卫补到 URL → URL 永远带 userId
 *   ✓ el-menu 硬路径 /patent/electronic → 守卫自动变成 /patent/electronic?userId=36
 *   ✓ 切换 trademark → 自动变成 /trademark/electronic?userId=36
 *   ✓ 刷新 → URL 还是带 userId → init 再固化（幂等）→ 守卫检测到已有，放行
 *   ✓ 手动清 localStorage → URL 还有 userId → init 再固化回来
 */
router.beforeEach((to, _from, next) => {
  initIdFromUrl()

  // 目标 URL 没有 userId，但 storage/cache 有 → 自动 replace 带过去
  const patchedQuery = propagateIdToQuery(to.query)
  if (patchedQuery) {
    next({ path: to.path, query: patchedQuery, replace: true })
  } else {
    next()
  }
})

export default router
