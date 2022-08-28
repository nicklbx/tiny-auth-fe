import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/web/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/web/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/web/logout',
    method: 'post'
  })
}
