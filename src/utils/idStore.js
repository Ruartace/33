/**
 * 外部网站跳转进来文网站时，URL 上带 ?userId=xxx。
 * 本模块负责把 userId 固化到 localStorage，并配合 router 守卫
 * 把 userId 自动透传到每一次路由导航的 URL query 上，三线冗余永不丢。
 *
 * —— 三线冗余 ——
 * 1. URL query  ?userId=xxx  ←  router.beforeEach 自动补，永不丢失
 * 2. localStorage            ←  initIdFromUrl() 固化，浏览器级持久化
 * 3. 模块内存 cache          ←  getId() 先读，零开销
 *
 * —— 调用链 ——
 * main.js              initIdFromUrl()             入口第一时间固化
 * router.beforeEach     initIdFromUrl()             固化 URL 中可能存在的 userId
 *                      → propagateIdToQuery()       没 userId 但 storage 有就自动补到 query
 * App.vue onMounted    initIdFromUrl()             组件层再兜一次
 * 业务接口              getId(fallback?)           只读
 */

const STORAGE_KEY = 'EXT_USER_ID'
const URL_PARAM   = 'userId'

// 内存缓存，避免每次请求都走 localStorage
let cache = null

/**
 * 从当前 URL 中提取 userId：有就固化到 localStorage + 内存缓存，无则保持现状。
 * 默认**不清 URL**（让 router 守卫去管透传）。
 * @param {object} [opts.removeFromUrl=false]  如果你确实不想 URL 上暴露 userId，传 { removeFromUrl: true }
 */
export function initIdFromUrl(opts = {}) {
  const { removeFromUrl = false } = opts
  try {
    const url = new URL(window.location.href)
    const idFromUrl = url.searchParams.get(URL_PARAM)
    if (idFromUrl) {
      cache = String(idFromUrl)
      try { localStorage.setItem(STORAGE_KEY, cache) } catch (e) { /* ignore */ }

      if (removeFromUrl) {
        url.searchParams.delete(URL_PARAM)
        window.history.replaceState({}, '', url.toString())
      }
    }
  } catch (e) {
    console.warn('[idStore] initIdFromUrl failed:', e)
  }
}

/**
 * 把 userId 透传到目标路由的 query 上（router.beforeEach 专用）。
 *   - to.query 已经有 userId  → 直接 return null，不触发 replace
 *   - storage / cache 有 userId → 返回 { ...to.query, userId }，守卫会用 replace 导航到这个 URL
 *   - 都没有 → return null，放行
 * @param {object} toQuery  当前正要导航到的 route.query
 * @returns {object | null}
 */
export function propagateIdToQuery(toQuery) {
  // 目标 URL 已经带 userId，啥也不用做
  if (toQuery && toQuery[URL_PARAM]) return null

  const existingId = getId()
  if (!existingId) return null   // storage 也没有，没法补

  return { ...(toQuery || {}), [URL_PARAM]: existingId }
}

/**
 * 全站统一读 userId 的地方。
 * 优先级：内存 cache → localStorage → fallback（URL query 的值，极短窗口期兜底）。
 * @param {string} [fallback]  调用方可选传入的兜底值
 * @returns {string}
 */
export function getId(fallback) {
  if (cache) return cache
  try {
    cache = localStorage.getItem(STORAGE_KEY)
  } catch (e) {
    /* ignore */
  }
  if (cache) return cache
  if (fallback) {
    cache = String(fallback)
    try { localStorage.setItem(STORAGE_KEY, cache) } catch (e) { /* ignore */ }
  }
  return cache || ''
}

/** 清缓存（登出 / 切换用户时调） */
export function clearId() {
  cache = null
  try { localStorage.removeItem(STORAGE_KEY) } catch (e) { /* ignore */ }
}

/** 当前是否已有 userId */
export function hasId() {
  return !!getId()
}
