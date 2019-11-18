// -----------------------------------店铺-----------------------------------//
// 店铺 ---列表查询
import request from '@/utils/request'
// 店铺列表
export function storeDataList(params) {
  return request({
    url:'/ro/oms/shop/select',
    method:'get',
    params:params
  })
}
// 新增店铺
export function submitStore(params) {
  return request({
    url:'/ro/oms/shop/save',
    method:'post',
    data:params
  })
}
// 编辑店铺
export function updataStore(params) {
  return request({
    url:'/ro/oms/shop/update',
    method:'post',
    data:params
  })
}
// 获取店铺详情
export function getStoreDetail(params) {
  return request({
    url:'/ro/oms/shop/select/' + params.id,
    method:'get'
  })
}
// 获取店铺员工列表
export function getStoreEmployees(params) {
  return request({
    url:'/ro/oms/shop/staff/select',
    method:'get',
    params: params
  })
}
//账号列表
export function accountList(params) {
  return request({
    url: '/ro/org/user/findeUserdListByUsertVo',
    method: 'get',
    params: params
  })
}
//直接关联
export function associated(params) {
  return request({
    url: '/ro/oms/shop/staff/saveList',
    method: 'post',
    data: params
  })
}
//直接更新员工状态
export function changeStatus(params) {
  return request({
    url: '/ro/oms/shop/staff/update',
    method: 'post',
    data: params
  })
}
