import request from '@/utils/request'
export function memberList( params) {
  return request({
    url:'/ro/sso/user/list',
    method:'get',
    params:params
  })
}


export function memberSetProxy( params) {
  //userId   proxy0普通用户 1店铺管理者 2代销 3配送人员
  return request({
    url:'/ro/sso/user/set/proxy',
    method:'get',
    params:params
  })
}