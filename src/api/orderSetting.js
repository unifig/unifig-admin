import request from '@/utils/request'
export function getOrderSetting(id) {
  return request({
    url:'/rm/orderSetting/'+id,
    method:'get',
  })
}

export function updateOrderSetting(id,data) {
  return request({
    url:'/rm/orderSetting/update/'+id,
    method:'post',
    data:data
  })
}
