import request from '@/utils/request'
// 获取机构信息
let getDept = function (params) {
  return request({
    url: 'ro/org/dept/selectDeptById',
    method: 'get',
    params: params
  })
};
// 新增机构
let createDept = function (data) {
  return request({
    url: 'ro/org/dept/createDept',
    method: 'post',
    data: data
  })
}
// 获取下级机构
let getChildrenDept = function (data) {
  return request({
    url: 'ro/org/dept/findeDeptListByDeptVo',
    method: 'post',
    data: data
  })
};
// 获取机构/下级机构树形结构
let getDeptArr = function (params) {
  return request({
    url: 'ro/org/dept/findeDeptListByDeptId',
    method: 'get',
    params: params
  })
}
// 机构重置密码
let resetDeptPass = function (params) {
  return request({
    url: 'ro/org/dept/upadteDeptAdminPassword',
    method: 'get',
    params: params
  })
}
// 停用/启用机构
let switchDept = function (params) {
  return request({
    url: 'ro/org/dept/upadteDeptStatus',
    method: 'get',
    params: params
  })
}
// 机构操作历史记录
let getDeptLogs = function (params) {
  return request({
    url: 'ro/org/deptRecord/findeDeptRecordListByDeptVo',
    method: 'get',
    params: params
  })
}
// 获取入库单列表
let getInList = function (data) {
  return request({
    url: 'rh/stockOrder/findeInputStockOrderListByStockOrderVo',
    method: 'post',
    data: data
  })
};
// 入库单信息
let getInDetail = function (params) {
  return request({
    url: 'rh/stockOrder/findeStockOrderById',
    method: 'get',
    params: params
  })
};
// 确认收货
let surePutIn = function (data) {
  return request({
    url: 'rh/stockOrder/takeDeliveryUpdateOutStockOrder',
    method: 'post',
    data: data
  })
};
// 确认退货/新增出货
let surePutBack = function (data) {
  return request({
    url: 'rh/stockOrder/createOutStockOrder',
    method: 'post',
    data: data
  })
};
// 采购入库
let addPutIn = function (data) {
  return request({
    url: 'rh/stockOrder/purchaseInputStockOrder',
    method: 'post',
    data: data
  })
};
// 入库编辑
let updatePutIn = function (params) {
  return request({
    url: 'rh/stockOrder/findepurchaseInputStockOrderById',
    method: 'get',
    params: params
  })
}
// 获取出库列表
let getOutList = function (data) {
  return request({
    url: 'rh/stockOrder/findeOutputStockOrderListByStockOrderVo',
    method: 'post',
    data: data
  })
};

// 出库单详情
let getOutDetail = function (params) {
  return request({
    url: 'rh/stockOrder/findeStockOrderById',
    method: 'get',
    params: params
  })
};
// 获取箱子下的车机列表 
let getSelectedVehicle = function (params) {
  return request({
    url: 'rh/vehicleEngine/findBoxNumberGroupingVehicleEngineList',
    method: 'get',
    params: params
  })
};
// 批次号下配件列表
let getSelectedPart = function (params) {
  return request({
    url: 'rh/parts/findBatchNumberGroupingPartsList',
    method: 'get',
    params: params
  })
};
// 获取库存管理列表
let getStockList = function (data) {
  return request({
    url: 'rh/vehicleEngine/findStockVehicleEngineByVehicleEngineVo',
    method: 'post',
    data: data
  })
};
// 标记故障
let updateStatus = function (data) {
  return request({
    url: 'rh/vehicleEngine/updateVehicleStatusByVehicleEngineVo',
    method: 'post',
    data: data
  })
};

// 获取故障机列表
let getFaultList = function (data) {
  return request({
    url: 'rh/vehicleEngine/findFaultVehicleEngineByVehicleEngineVo',
    method: 'post',
    data: data
  })
};
// 故障机退回
let getFaultBack = function (params) {
  return request({
    url: 'rh/vehicleEngine/returnGoodsVehicleEngineById',
    method: 'get',
    params: params
  })
};
// 故障退回机构
let getFaultBackDept = function (params) {
  return request({
    url: 'rh//vehicleEngine/findReturnGoodsDeptNameById',
    method: 'get',
    params: params
  })
}
// 获取车机售后列表
let getServiceList = function (data) {
  return request({
    url: 'rh/vehicleEngine/findAfterSaleVehicleEngineByVehicleEngineVo',
    method: 'post',
    data: data
  })
};
// 车机售后详情
let getServiceInfo = function (data) {
  return request({
    url: 'rh/vehicleEngine/findVehicleEngineById',
    method: 'post',
    data: data
  })
};
// 解绑车机
let unBind = function (params) {
  return request({
    url: 'rh/vehicleEngine/untyingVehicleEngineById',
    method: 'get',
    params: params
  })
};
// 已存盘列表
let getSaveList = function (data) {
  return request({
    url: 'rh/takeInventory/findeTakeInventoryByTakeInventoryVo',
    method: 'post',
    data: data,
  })
};
// 获取未存盘的列表
let getUnSaveList = function () {
  return request({
    url: 'rh/vehicleEngine/findVehicleEngineList',
    method: 'get',
  })
};
// 新增存盘
let addSave = function (data) {
  return request({
    url: 'rh/takeInventory/createTakeInventory',
    method: 'post',
    data: data
  })
};
// 根据询盘id 显示存盘记录
let getSaveLogs = function (params) {
  return request({
    url: 'rh/takeInventoryItem/findTakeInventoryItemList',
    method: 'get',
    params: params
  })
};
// 获取车机绑定列表
let getBindList = function (data) {
  return request({
    url: 'rh/vehicleEngine/findBindingVehicleEngineByVehicleEngineVo',
    method: 'post',
    data: data
  })
};
// 修改车机绑定手机号
let bindUpdatePhone = function (data) {
  return request({
    url: 'rh/vehicleEngine/updateVehicleUserPhoneByVehicleEngineVo',
    method: 'post',
    data: data
  })
};
// 添加绑定
let addBind = function (params) {
  return request({
    url: 'rh/vehicleEngine/bindingVehicleEngineById',
    method: 'get',
    params: params
  })
}
// 获取车机状态列表
let getStatusList = function (data) {
  return request({
    url: 'rh/vehicleEngine/findVehicleStatusVehicleEngineByVehicleEngineVo',
    method: 'post',
    data: data
  })
}
// 车机状态详情接口
let getStatusInfo = function (params) {
  return request({
    url: 'rh/vehicleEngine/findVehicleEngineById',
    method: 'get',
    params: params
  })
}
export {
  getDept,
  createDept,
  resetDeptPass,
  getDeptArr,
  switchDept,
  getDeptLogs,
  getChildrenDept,
  getOutList,
  getInList,
  getInDetail,
  addPutIn,
  updatePutIn,
  surePutIn,
  surePutBack,
  getSelectedVehicle,
  getSelectedPart,
  getOutDetail,
  getStockList,
  updateStatus,
  getFaultList,
  getFaultBack,
  getFaultBackDept,
  getServiceList,
  getServiceInfo,
  unBind,
  getSaveList,
  getUnSaveList,
  addSave,
  getSaveLogs,
  getBindList,
  bindUpdatePhone,
  getStatusList,
  getStatusInfo,
  addBind
}
