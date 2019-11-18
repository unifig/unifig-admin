// -----------------------------------客户资料-----------------------------------//
// 客户资料 ---列表查询
import request from '@/utils/request'
export function customerDataList(params) {
  return request({
    url:'rh/customer/findeCustomerListByCustomerVo',
    method:'get',
    params:params
  })
}
// 客户资料 ---导入
export function customerDatalead(data) {
  return request({
    url:'rh/customer/importCustomer',
    method:'POST',
    data:data
  })
}
// 客户资料 ---续保确定
export function customerDataBtn(data) {
  return request({
    url:'rh/customer/renewalOfInsuranceCustomer',
    method:'POST',
    data:data
  })
}
// 客户资料 ---当前结构下树结构
export function customerDataorganization(params) {
  return request({
    url:'ro/org/dept/findeDeptListByDeptId',
    method:'get',
    params:params
  })
}
// 客户资料 ---用户等级
export function customergrend(params) {
  return request({
    url:'/rh/customerLevel/findCustomerLevelListByCustomerLevelVo?pageNum=1&pageSize=99999',
    method:'get',
    params:params
  })
}
//----------------------会员模板创建----------------------------//
//会员模板创建 -- 列表查询
export function memberGradeList(params) {
  return request({
    url:'rh/customerLevel/findCustomerLevelListByCustomerLevelVo',
    method:'get',
    params:params
  })
}
//会员模板创建 -- 增
export function memberGradeAdd(data) {
  return request({
    url:'rh/customerLevel/createCustomerLevel',
    method:'POST',
    data:data
  })
}
//会员模板创建 -- 改
export function memberGradeEdit(params) {
  return request({
    url:'/rh/customerLevel/updateCustomerLevel',
    method:'POST',
    data:params
  })
}
//会员模板创建 -- 查
export function memberGradeCheck(data) {
  return request({
    url:'/rh/customerLevel/findCustomerLevelById',
    method:'get',
    params:data
  })
}
//会员模板创建 -- 删
export function memberGradeDelete(data) {
  return request({
    url:'/rh/customerLevel/updateCustomerLevel',
    method:'post',
    data:data
  })
}
//----------------------保险风险数据----------------------------//
//获取表头
export function insuranceRiskHeader(params) {
  return request({
    url:'/rh/riskDataHeader/findRiskDataHeaderByUser',
    method:'get',
    params:params
  })
}
//获取列表
export function insuranceRiskList(params) {
  return request({
    url:'/rh/riskData/findRiskDataListByRiskDataVo',
    method:'get',
    params:params
  })
}
//更新表头
export function insuranceRiskUpdateHeader(params) {
  return request({
    url:'/rh/riskDataHeader/updateRiskDataHeader',
    method:'post',
    data:params
  })
}

//----------------------事故还原----------------------------//

// 列表
export function accidentestorelist(params) {
  return request({
    url:'/rh/accidentRestore/findAccidentRestoreListByAccidentRestoreVo',
    method:'get',
    params:params
  })
}
// 新增
export function accidentestoreadd(params) {
  return request({
    url:'/rh/accidentRestore/createAccidentRestore',
    method:'POST',
    data:params
  })
}
//更新
export function accidentestoreupdate(data){
  return request({
    url:'/rh/accidentRestore/updateAccidentRestore',
    method:'POST',
    data:data
  })
}
//----------------------------------------- 用户列表------------------------------------//
//列表
export function userManageList(data) {
  return request({
    url:'/rh/umsMemberVehicleEngine/findeUmsMemberVehicleEngineListByUmsMemberVehicleEngineVo',
    method:'POST',
    data:data
  })
}
//详情
export function userManagedetails(params) {
  return request({
    url:'/rh/umsMemberVehicleEngine/findeUmsMemberVehicleEngineById',
    method:'get',
    params:params
  })
}
