import request from '@/utils/request'

// 商品分类
export function categorylist(params) {
  return request({
    url: '/admin/category/categorylist',
    method: 'get',
    params
  })
}

export function delcategory(params) {
  return request({
    url: '/admin/category/delcategory',
    method: 'get',
    params
  })
}

export function addcategory(data) {
  return request({
    url: '/admin/category/addcategory',
    method: 'post',
    data: data
  })
}

export function editcategory(data) {
  return request({
    url: '/admin/category/editcategory',
    method: 'post',
    data: data
  })
}

// 商品列表
export function productlist(params) {
  return request({
    url: '/admin/product/productlist',
    method: 'get',
    params
  })
}

export function delproduct(params) {
  return request({
    url: '/admin/product/delproduct',
    method: 'get',
    params
  })
}

export function addproduct(data) {
  return request({
    url: '/admin/product/addproduct',
    method: 'post',
    data: data
  })
}

export function editproduct(data) {
  return request({
    url: '/admin/product/editproduct',
    method: 'post',
    data: data
  })
}
