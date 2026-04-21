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
}
