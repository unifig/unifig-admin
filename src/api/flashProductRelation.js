import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/rm/flashProductRelation/list',
    method:'get',
    params:params
  })
}
export function createFlashProductRelation(data) {
  return request({
    url:'/rm/flashProductRelation/create',
    method:'post',
    data:data
  })
}
export function deleteFlashProductRelation(id) {
  return request({
    url:'/rm/flashProductRelation/delete/'+id,
    method:'post'
  })
}
export function updateFlashProductRelation(id,data) {
  return request({
    url:'/rm/flashProductRelation/update/'+id,
    method:'post',
    data:data
  })
}
