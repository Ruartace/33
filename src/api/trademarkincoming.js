import request from '@/utils/request'

export const TrademarkIncomingAPI = {
  getList(params) {
    return request({
      url: '/api/trademark/search',
      method: 'get',
      params,
    })
  },
  oneClickMatch() {
    return request({
      url: '/api/trademark-match/one-click-match',
      method: 'post',
    })
  },
}
