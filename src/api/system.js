import request from '@/utils/request'
// 管理员列表
let adminList = function (params) {
  return request({
    url: '/ro/sys/user/list',
    method: 'get',
    params: params
  })
}
// // 角色列表
// let roleList = function (params){
//     return request({
//         url:'/ro/role/list',
//         method:'get',
//         params:params
//     })
// }
// 部门管理
let departmentList = function (params) {
  return request({
    url: '/ro/sys/dept/list',
    method: 'get',
    params: params
  })
}

//账号列表
let accountList = function (data) {
  return request({
    url: '/ro/org/user/findeUserdListByUsertVo',
    method: 'post',
    data: data
  })
}
// 新增账号
let addAccount = function (data) {
  return request({
    url: 'org/user/createUser',
    method: 'post',
    data: data
  })
}
// 编辑账号
let updateAccount = function (data) {
  return request({
    url: 'org/dept/updateUser',
    method: 'post',
    data: data
  })
}
// 删除账号
let deleteAccount = function (data) {
  return request({
    url: 'org/dept/deleteUser',
    method: 'post',
    data: data
  })
}
// 获取所有机构
let deptArr = function (params) {
  return request({
    url: 'org/dept/findeDeptListByDeptId',
    mthods: 'get',
    params: params
  })
}



// 角色列表
let roleList = function (params) {
  return request({
    url: 'ro/sys/role/list',
    method: 'get',
    params: params
  })
}

// 角色的数据权限
let roleDept = function (params) {
  return request({
    url: 'ro/sys/dept/list',
    method: 'get',
    params: params
  })
}
// 角色的功能权限
let roleMenuList = function (params) {
  return request({
    url: 'ro/sys/menu/perms',
    method: 'get',
    params: params
  })
}
// 角色详情
let getRoleInfo = function (params) {
  return request({
    url: 'ro/sys/role/info/' + params.id,
    method: 'get'
  })
}
// 新增角色
let addRole = function (data) {
  return request({
    url: 'ro/sys/role/save',
    method: 'post',
    data: data
  })
}
// 删除角色
let deleteRole = function (data) {
  return request({
    url: 'ro/role/delete',
    method: 'get',
    params: data
  })
}
// 更新角色
let updateRole = function (data) {
  return request({
    url: 'ro/sys/role/update',
    method: 'post',
    data: data
  })
}
// 权限列表
let authorityList = function (params) {
  return request({
    url: 'ro/sys/menu/user',
    method: 'get',
    params: params
  })
}
// 新增权限
let addAuthority = function (data) {
  return request({
    url: '',
    method: 'post',
    data: data
  })
}
// 修改权限
let updateAuthority = function (data) {
  return request({
    url: 'ro/sys/menu/delete',
    method: 'post',
    data: data
  })
}
// 删除权限
let deleteAuthority = function (params) {
  return request({
    url: 'ro/sys/menu/delete',
    method: 'get',
    params: params
  })
}

// 文件列表
let fileList = function (params) {
  return request({
    url: 'rb/file/fileList',
    method: 'get',
    params: params
  })
}
// 删除文件
let deleteFile = function (params) {
  return request({
    url: 'rb/file/delete',
    method: 'get',
    params: params
  })
}

// 文件上传
let uploadFile = function (params) {
  return request({
    url: '/rm/cms/feil/uploadMonofile ',
    method: 'get',
    params: params
  })
}

export {
  adminList,
  departmentList,
  accountList,
  addAccount,
  updateAccount,
  deleteAccount,
  deptArr,
  roleList,
  roleDept,
  roleMenuList,
  getRoleInfo,
  addRole,
  updateRole,
  deleteRole,
  authorityList,
  addAuthority,
  updateAuthority,
  deleteAuthority,
  fileList,
  deleteFile,
  uploadFile,

}
