import request from '@/utils/request'

//商品列表
export function listProduct(params){
  return request({
    url: '/product/listProduct',
    method: 'get',
    params
  })
}

//添加商品
export function addProduct(data){
  return request({
    url: '/product/addProduct',
    method: 'post',
    data
  })
}

//更新商品
export function updateProduct(data){
  return request({
    url: '/product/updateProduct',
    method: 'post',
    data
  })
}

// 删除商品
export function deleteProduct(id){
  return request({
    url: `/product/delete/${id}`,
    method: 'post'
  })
}
