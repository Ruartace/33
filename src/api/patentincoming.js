import request from '@/utils/request'

export const PatentIncomingAPI = {
  getList(params) {
    return request({
      url: '/ruidao/realtime-search',
      method: 'get',
      params,
    })
  },
  exportExcel(ids) {
    return request({
      url: '/ruidao/realtime-search/export',
      method: 'get',
      responseType: 'blob',
      params: { ids },
    })
  },
  parseZip(data) {
    return request({
      url: '/patent-certificate/parse-zip',
      method: 'post',
      data,
    })
  },
  parseZipRuidDao(data) {
    return request({
      url: '/patent-certificate/parse-zip-rui-dao',
      method: 'post',
      data,
    })
  },
  parseListXml(data) {
    return request({
      url: '/patent-certificate/parse-list-xml',
      method: 'post',
      data,
    })
  },
  oneClickMatch(params) {
    return request({
      url: '/project-match/one-click-match',
      method: 'post',
      data: params,
    })
  },
  restoreProcesses(params) {
    return request({
      url: '/ruidao/restore-processes',
      method: 'post',
      data: params,
    })
  },
  moveNoNeed(params) {
    return request({
      url: '/ruidao/move-no-need',
      method: 'post',
      data: params,
    })
  },
}
