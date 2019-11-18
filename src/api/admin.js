import request from '@/utils/request'
export function adminList( params) {
  return request({
    url:'/ro/sys/user/list',
    method:'get',
    params:params
  })

}
export function roleList( params){
    return request({
        url:'/ro/role/list',
        method:'get',
        params:params
      })
}
export function allRoles( params) {
  return request({
    url:'/ro/sys/role/select',
    method:'get',
    params:params
  })
}
export function getInfo( params) {
  return request({
    url:'/ro/sys/user/info/' + params,
    method:'get',
    // params:params
  })
}
export function updateAdmin( params) {
  return request({
    url:'/ro/sys/user/update' ,
    method:'post',
    params:params
  })
}
