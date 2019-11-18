import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/rm/order/list',
    method:'get',
    params:params
  })
}

export function closeOrder(params) {
  return request({
    url:'/rm/order/update/close',
    method:'post',
    params:params
  })
}

export function deleteOrder(params) {
  return request({
    url:'/rm/order/delete',
    method:'post',
    params:params
  })
}

export function deliveryOrder(data) {
  return request({
    url:'/rm/order/update/delivery',
    method:'post',
    data:data
  });
}

export function getOrderDetail(id) {
  return request({
    url:'/rm/order/'+id,
    method:'get'
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/rm/order/update/receiverInfo',
    method:'post',
    data:data
  });
}

export function updateMoneyInfo(data) {
  return request({
    url:'/rm/order/update/moneyInfo',
    method:'post',
    data:data
  });
}

export function updateOrderNote(params) {
  return request({
    url:'/rm/order/update/note',
    method:'post',
    params:params
  })
}

export function allocationList(params){
  //proxy = 3
  return request({
    url:'/ro/sso/user/list/proxy',
    method:'get',
    params:params
  })
}

export function allocationConfirm(params){
  //ids订单id 集合   userId配送员id  userName配送员名称
  return request({
    url:'/rm/omsOrderDeliveryman/admin/add',
    method:'POST',
    params:params
  })
}