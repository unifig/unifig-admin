import request from '@/utils/request'
// 文章列表
export function articleList(params) {
  return request({
    url:'/rm/cms/article/list',
    method:'get',
    params:params
  })
}
// 添加文章
export function addArticle(data) {
  return request({
    url:'/rm/cms/article/iou',
    method:'post',
    data:data
  })
}
// 删除文章
export function deleteArticle(params) {
    return request({
      url:'/rm/cms/article/del',
      method:'get',
      params:params
    })
  }
// 删除文章关联的商品
export function deleteContactProduct(params){
  return request({
      url:'/rm/cms/article/del/ap',
      method:'get',
      params:params
  })  
}
// 文章详情
export function getInfo(params) {
  return request({
    url:'/rm/cms/article/info',
    method:'get',
    params:params
  })
}
// 文章导航栏是否显示
export function updateArticleNavStatus(data){
    return request({
        url:'/rm/cms/article/update/navStatus',
        method:'post',
        data:data
    })
}
// 文章分类列表
export function articleCategory(params){
    return request({
        url:'rm/cms/articleCategory/list',
        method:'get',
        params:params
        
    })
}
// 文章分类导航栏是否显示
export function updateNavStatus(data){
    return request({
        url:'/rm/cms/articleCategory/update/navStatus',
        method:'post',
        data:data
    })

}

// 文章分类是否显示
export function updateShowStatus(data){
    return request({
        url:'/rm/cms/articleCategory/update/showStatus',
        method:'post',
        data:data
    })
}
// 创建文章分类
export function createArticleCate(data){
    return request({
        url:'rm/cms/articleCategory/iou',
        method:'post',
        data:data
    })
}
// 更新文章分类
export function updateArticleCate(data){
    return request({
        url:'rm/cms/articleCategory/iou',
        method:'post',
        data:data
    })
}
// 删除文章分类
export function deleteArticleCate(params){
    return request({
        url:'rm/cms/articleCategory/del',
        method:'get',
        params:params
    })
}
// 文章分类详情
export function getArticleCateInfo(params){
    return request({
        url:'/rm/cms/articleCategory/info',
        method:'get',
        params:params
    })
}
