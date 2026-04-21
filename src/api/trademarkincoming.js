import request from '@/utils/request'

export const TrademarkIncomingAPI = {
  getList(params) {
    return request({
      url: '/trademark/search',
      method: 'get',
      params,
    })
  },
  oneClickMatch() {
    return request({
      url: '/trademark-match/one-click-match',
      method: 'post',
    })
  },
}
