import request from '@/utils/request'
// 新增权限
export function addMean(params) {
  return request({
    url:'/ro/sys/menu/save',
    method:'post',
    data:params
  })
}
// 编辑权限
export function updateMean(params) {
  return request({
    url:'/ro/sys/menu/update',
    method:'post',
    data:params
  })
}
// 权限列表
export function getList(params) {
  return request({
    url:'/ro/sys/menu/perms',
    method:'GET',
    params:params
  })
}
// 权限详情
export function getDetail(params) {
  return request({
    url:'/ro/sys/menu/info/' + params.id,
    method:'GET'
  })
}
// 菜单权限
export function getMeanList() {
  return request({
    url:'/ro/sys/menu/list/role',
    method:'GET'
  })
}
