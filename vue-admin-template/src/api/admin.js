import request from '@/utils/request'

export function userlist(params) {
  return request({
    url: '/admin/user/userlist',
    method: 'get',
    params
  })
}

export function delUser(params) {
  return request({
    url: '/admin/user/deluser',
    method: 'get',
    params
  })
}

export function userinfo(data) {
  return request({
    url: '/admin/user/userinfo',
    method: 'get',
    params: data
  })
}

export function updateuser(data) {
  return request({
    url: '/admin/user/updateuser',
    method: 'post',
    data: data
  })
}

export function adduser(data) {
  return request({
    url: '/admin/user/adduser',
    method: 'post',
    data: data
  })
}

// role
export function rolelist(params) {
  return request({
    url: '/admin/role/rolelist',
    method: 'get',
    params
  })
}

export function delrole(params) {
  return request({
    url: '/admin/role/delrole',
    method: 'get',
    params
  })
}

export function addrole(data) {
  return request({
    url: '/admin/role/addrole',
    method: 'post',
    data: data
  })
}

export function editrole(data) {
  return request({
    url: '/admin/role/editrole',
    method: 'post',
    data: data
  })
}

// rule
export function rulelist(params) {
  return request({
    url: '/admin/rule/rulelist',
    method: 'get',
    params
  })
}

export function delrule(params) {
  return request({
    url: '/admin/rule/delrule',
    method: 'get',
    params
  })
}

export function addrule(data) {
  return request({
    url: '/admin/rule/addrule',
    method: 'post',
    data: data
  })
}

export function editrule(data) {
  return request({
    url: '/admin/rule/editrule',
    method: 'post',
    data: data
  })
}
