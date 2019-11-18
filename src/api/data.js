import request from '@/utils/request'

// 专项页面
let getVipData = function (params) {
  return request({
    url: 'bi/sms/vippage/line',
    methods: 'get',
    params: params
  })
}
// 活动统计页面
let getPromotionData = function (params) {
  return request({
    url: 'bi/sms/promotion/line',
    methods: 'get',
    params: params
  })
}
// 导航栏统计 

let getNaviData = function (params) {
  return request({
    url: 'bi/sms/navigation/line',
    methods: 'get',
    params: params
  })
}
// bannner统计
let getBannerData = function (params) {
  return request({
    url: 'bi/cms/banner/line',
    methods: 'get',
    params: params
  })
}
//文章阅读
let getArticleData = function (params) {
  return request({
    url: 'bi/cms/article/line',
    methods: 'get',
    params: params
  })
}

export {
  getVipData,
  getPromotionData,
  getNaviData,
  getBannerData,
  getArticleData
}
