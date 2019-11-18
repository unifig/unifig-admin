import request from '@/utils/request'
export function policy(data) {
  return request({
    url:'/rm/cms/feil/uploadMonofile',
    method:'post',
    data: data
  })
}
