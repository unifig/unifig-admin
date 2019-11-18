import request from '@/utils/request'
export function fetchList() {
  return request({
    url:'/rm/companyAddress/list',
    method:'get'
  })
}
