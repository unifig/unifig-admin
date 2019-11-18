import request from '@/utils/request'
export function getMechanismArr() {
  return request({
    url:'/ro/org/dept/findeDeptListByDeptId?user=true&resultType=true',
    method:'get'
  })
}
