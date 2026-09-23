import request from '@/utils/request'

export const TrademarkIncomingAPI = {
  getList(params) {
    return request({
      url: '/trademark/search',
      method: 'get',
      params,
    })
  },
  getApplyTypeOptions(name) {
    return request({
      url: '/apply-type/options',
      method: 'get',
      params: name ? { name } : {},
    })
  },
  oneClickMatch(data = {}) {
    return request({
      url: '/trademark-match/one-click-match',
      method: 'post',
      data,
    })
  },
  /** GET /api/trademark/search/export?ids=1,2 */
  exportList(ids) {
    const idParam = Array.isArray(ids) ? ids.join(',') : String(ids)
    return request({
      url: '/trademark/search/export',
      method: 'get',
      params: { ids: idParam },
      responseType: 'blob',
      timeout: 120000,
    })
  },
  /** POST /api/trademark-receipt/upload，字段：file（zip）、excel（xlsx/xls） */
  uploadReceipt(formData) {
    return request({
      url: '/trademark-receipt/upload',
      method: 'post',
      data: formData,
      timeout: 120000,
    })
  },
  /** POST /api/trademark-doc/upload，字段：file（zip）、excel（xlsx/xls） */
  uploadDoc(formData) {
    return request({
      url: '/trademark-doc/upload',
      method: 'post',
      data: formData,
      timeout: 180000,
    })
  },
  /** POST /api/trademark-receipt/move-no-need，body: { project_no: string[], ids: (number|string)[] } */
  moveNoNeed(data) {
    return request({
      url: '/trademark-receipt/move-no-need',
      method: 'post',
      data,
    })
  },
  /** POST /api/trademark/restore-processes 恢复未导入 */
  restoreProcesses(data = {}) {
    return request({
      url: '/trademark/restore-processes',
      method: 'post',
      data,
    })
  },
  /** POST /api/trademark/import-processes 导入系统 */
  importProcesses(data = {}) {
    return request({
      url: '/trademark/import-processes',
      method: 'post',
      data,
    })
  },
  /** GET /api/user/options 人员选项（支持模糊查询） */
  getUserOptions(name) {
    return request({
      url: '/user/options',
      method: 'get',
      params: name ? { name } : {},
    })
  },
}
