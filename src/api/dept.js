import request from '@/utils/request'
//账号列表
let getAccountList = function (params) {
  return request({
    url: 'ro/org/user/findeUserdListByUsertVo',
    method: 'get',
    params: params
  })
}
// 新增账号
let addAccount = function (data) {
  return request({
    url: 'ro/org/user/createUser',
    method: 'post',
    data: data
  })
}
//编辑账号
let updateAccount = function (data) {
  return request({
    url: 'ro/org/user/updateUser',
    method: 'post',
    data: data
  })
}
// 删除账号
let deleteAccount = function (params) {
  return request({
    url: 'ro/org/user/deleteUser',
    method: 'get',
    params: params
  })
}
// 获取当前机构的下属机构
let deptArrChildren = function (params) {
  return request({
    url: 'ro/org/dept/findeDeptListByDeptId',
    mthods: 'get',
    params: params
  })
}

// 获取角色列表
let getRole = function (params) {
  return request({
    url: 'ro/sys/role/findRolelist',
    mthods: 'get',
    params: params
  })

}
export {
  getAccountList,
  addAccount,
  updateAccount,
  deleteAccount,
  getRole,
  deptArrChildren

}
