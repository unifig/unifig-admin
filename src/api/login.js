import request from '@/utils/request'

export function login(username, password, passwordType) {
  return request({
    url:'/ro/admin/login',
    method: 'post',
    data: {
      username,
      password,
      passwordType
    }
  })
}

export function getInfo() {
  return request({
    url:'/ro/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url:'/ro/admin/logout',
    method: 'post'
  })
}
