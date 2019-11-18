import request from '@/utils/request'
// 列表
let roleList = function (params) {
  return request({
    url: 'ro/role/list',
    method: 'get',
    params: params
  })
}
// 新增
// deptId: ""
// deptIdList: []
// deptName: ""
// menuIdList: []
// roleName: "测试"
let addRole = function (data) {
  return request({
    url: 'ro/role/save',
    method: 'post',
    data: data
  })
}
// 删除
let deleteRole = function (data) {
  return request({
    url: '/ro/role/delete',
    method: 'post',
    data: data
  })
}
// 更新
let updateRole = function (data) {
  return request({
    url: '',
    method: 'post',
    data: data
  })
}
export {
  roleList,
  addRole,
  deleteRole,
  updateRole
}
