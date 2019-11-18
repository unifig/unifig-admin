import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/rm/couponHistory/list',
    method:'get',
    params:params
  })
}
export function coupongiveOut(data) {
  return request({
    url:'/rm/coupon/giveOut',
    method:'POST',
    data:data
  })
}
