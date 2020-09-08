import server from './server'
import store from '../store'

/**
 * @description: 登录
 * @return {Promise} promise
 * */
export const login = (data) => {
  return server({
    url: '/admin/login',
    method: 'POST',
    data
  })
}
/**
 * @description: 获取管理员列表
 * @return {Promise} promise
 * */
export const getManagementList = (params) => {
  return server({
    url: '/admin/user',
    method: 'GET',
    params
  })
}
/**
 * @description: 添加管理员
 * @return {Promise} promise
 * */
export const addManagement = (data) => {
  return server({
    url: '/admin/user',
    method: 'POST',
    data
  })
}
/**
 * @description:编辑管理员
 * @return {Promise} promise
 * */
export const editManagement = ({ id, ...data }) => {
  return server({
    url: `/admin/user/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 删除管理员
 * @return {Promise} promise
 * */
export const deleteManagement = (id) => {
  return server({
    url: `/admin/user/${id}`,
    method: 'DELETE'
  })
}
/**
 * @description: 获取管理员详情
 * @return {Promise} promise
 * */
export const getManagementDetail = (id) => {
  return server({
    url: `/admin/user/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 获取blog列表
 * @return {Promise} promise
 * */
export const getBlog = () => {
  return server({
    url: '/blog/getForm',
    method: 'GET'
  })
}
/**
 * @description: 修改blog数据
 * @return {Promise} promise
 * */
export const editBlog = (data) => {
  return server({
    url: '/blog/editForm',
    method: 'POST',
    data
  })
}
/**
 * @description: 添加blog数据
 * @return {Promise} promise
 * */
export const addBlog = (data) => {
  return server({
    url: '/blog/addForm',
    method: 'POST',
    data
  })
}
/**
 * @description: 删除blog数据
 * @return {Promise} promise
 * */
export const deleteBlog = (id) => {
  return server({
    url: `/blog/delForm/${id}`,
    method: 'DELETE'
  })
}

