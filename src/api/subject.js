import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url:'/rm/subject/listAll',
    method:'get',
  })
}

export function fetchList(params) {
  return request({
    url:'/rm/subject/list',
    method:'get',
    params:params
  })
}
