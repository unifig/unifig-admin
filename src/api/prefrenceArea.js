import request from '@/utils/request'
export function fetchList() {
  return request({
    url:'/rm/prefrenceArea/listAll',
    method:'get',
  })
}
