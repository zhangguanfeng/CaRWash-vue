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
 * @description: 修改管理员密码
 * @param {String} password 新密码*
 * @param {number} id* 
 * @return {Promise} promise
 * */
export const changeManagerPW = ({id,...data}) => {
  return server({
    url: `/admin/user/${id}`,
    method: 'PATCH',
    data
  })
}
/**
 * @description: 添加代理店
 * @return {Promise} promise
 * */
export const addStore = (data) => {
  return server({
    url: '/admin/store',
    method: 'POST',
    data
  })
}
/**
 * @description: 获取代理店列表
 * @return {Promise} promise
 * */
export const getStore = (params) => {
  return server({
    url: '/admin/store',
    method: 'GET',
    params
  })
}
/**
 * @description: 获取代理店详情
 * @return {Promise} promise
 * */
export const getStoreDetail = (id) => {
  return server({
    url: `/admin/store/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 编辑代理店
 * @return {Promise} promise
 * */
export const editStore = ({ id, ...data }) => {
  return server({
    url: `/admin/store/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 删除代理店
 * @return {Promise} promise
 * */
export const deleteStore = (id) => {
  return server({
    url: `/admin/store/${id}`,
    method: 'DELETE'
  })
}
/**
 * @description: 添加职员
 * @return {Promise} promise
 * */
export const addStaff = (data) => {
  return server({
    url: '/admin/staff',
    method: 'POST',
    data
  })
}
/**
 * @description: 编辑职员
 * @return {Promise} promise
 * */
export const editStaff = ({ id, ...data }) => {
  return server({
    url: `/admin/staff/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 获取职员列表
 * @return {Promise} promise
 * */
export const getStaff = (params) => {
  return server({
    url: '/admin/staff',
    method: 'GET',
    params
  })
}
/**
 * @description: 获取职员详情
 * @return {Promise} promise
 * */
export const getStaffDetail = (id) => {
  return server({
    url: `/admin/staff/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 删除职员
 * @return {Promise} promise
 * */
export const deleteStaff = (id) => {
  return server({
    url: `/admin/staff/${id}`,
    method: 'DELETE'
  })
}
/**
 * @description: 修改职员密码
 * @param {String} password 新密码*
 * @param {number} id* 
 * @return {Promise} promise
 * */
export const changeStaffPW = ({id,...data}) => {
  return server({
    url: `/admin/staff/${id}`,
    method: 'PATCH',
    data
  })
}
/**
 * @description: 查询代理店所负责的区域
 * @param {number} store_id 店铺id* 
 * @return {Promise} promise
 * */
export const searchStoreArea = (params) => {
  return server({
    url: `/admin/store_area`,
    method: 'GET',
    params
  })
}
/**
 * @description: 获取服务区域
 * @return {Promise} promise
 * */
export const getServiceArea = () => {
  return server({
    url: '/admin/area',
    method: 'GET'
  })
}
/**
 * @description: 添加服务区域
 * @param {string} name  服务名称* 
 * @param {number} parent  所属一级区域id（如果是添加一级区域，则该字段不传）
 * @return {Promise} promise
 * */
export const addServiceArea = (data) => {
  return server({
    url: '/admin/area',
    method: 'POST',
    data
  })
}
/**
 * @description: 编辑服务区域
 * @param {number} id  * 
 * @param {string} name  修改后的名称* 
 * @return {Promise} promise
 * */
export const editServiceArea = ({id,...data}) => {
  return server({
    url: `/admin/area/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 删除服务区域
 * @return {Promise} promise
 * */
export const deleteServiceArea = (id) => {
  return server({
    url: `/admin/area/${id}`,
    method: 'DELETE'
  })
}
/**
 * @description: 获取服务列表
 * @return {Promise} promise
 * */
export const getService = () => {
  return server({
    url: '/admin/service',
    method: 'GET'
  })
}
/**
 * @description: 获取服务详情
 * @return {Promise} promise
 * */
export const getServiceDetail = (id) => {
  return server({
    url: `/admin/service/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 编辑服务
 * @return {Promise} promise
 * */
export const editService = ({ id, ...data }) => {
  return server({
    url: `/admin/service/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 获取价格
 * @return {Promise} promise
 * */
export const getPrice = (params) => {
  return server({
    url: '/admin/price',
    method: 'GET',
    params
  })
}
/**
 * @description: 修改价格
 * @return {Promise} promise
 * */
export const editPrice = ({ id, ...data }) => {
  return server({
    url: `/admin/price/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 添加常见疑问
 * @return {Promise} promise
 * */
export const addFAQ = (data) => {
  return server({
    url: '/admin/faq',
    method: 'POST',
    data
  })
}
/**
 * @description: 编辑常见疑问
 * @return {Promise} promise
 * */
export const editFAQ = ({ id, ...data }) => {
  return server({
    url: `/admin/faq/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 获取常见疑问列表
 * @return {Promise} promise
 * */
export const getFAQ = (params) => {
  return server({
    url: '/admin/faq',
    method: 'GET',
    params
  })
}
/**
 * @description: 获取常见疑问详情
 * @return {Promise} promise
 * */
export const getFAQDetail = (id) => {
  return server({
    url: `/admin/faq/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 删除常见疑问
 * @return {Promise} promise
 * */
export const deleteFAQ = (id) => {
  return server({
    url: `/admin/faq/${id}`,
    method: 'DELETE'
  })
}
/**
 * @description: 获取疑问答复列表
 * @return {Promise} promise
 * */
export const getQA = (params) => {
  return server({
    url: '/admin/qa',
    method: 'GET',
    params
  })
}
/**
 * @description: 获取疑问答复详情
 * @return {Promise} promise
 * */
export const getQADetail = (id) => {
  return server({
    url: `/admin/qa/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 编辑回答
 * @return {Promise} promise
 * */
export const editQA = ({ id, ...data }) => {
  return server({
    url: `/admin/qa/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 删除疑问
 * @return {Promise} promise
 * */
export const deleteQA = (id) => {
  return server({
    url: `/admin/qa/${id}`,
    method: 'DELETE'
  })
}
/**
 * @description: 获取服务条款列表
 * @return {Promise} promise
 * */
export const getServiceTerm = () => {
  return server({
    url: '/admin/service_term',
    method: 'GET'
  })
}
/**
 * @description: 获取服务条款详情
 * @return {Promise} promise
 * */
export const getServiceTermDetail = (id) => {
  return server({
    url: `/admin/service_term/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 编辑服务条款
 * @return {Promise} promise
 * */
export const editServiceTerm = ({ id, ...data }) => {
  return server({
    url: `/admin/service_term/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 添加评价
 * @return {Promise} promise
 * */
export const addEvalution = (data) => {
  return server({
    url: '/admin/evaluation',
    method: 'POST',
    data
  })
}
/**
 * @description: 获取评价列表
 * @return {Promise} promise
 * */
export const getEvalution = (params) => {
  return server({
    url: '/admin/evaluation',
    method: 'GET',
    params
  })
}
/**
 * @description: 获取评价详情
 * @return {Promise} promise
 * */
export const getEvalutionDetail = (id) => {
  return server({
    url: `/admin/evaluation/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 编辑评价
 * @return {Promise} promise
 * */
export const editEvalution = ({ id, ...data }) => {
  return server({
    url: `/admin/evaluation/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 删除评价
 * @return {Promise} promise
 * */
export const deleteEvalution = (id) => {
  return server({
    url: `/admin/evaluation/${id}`,
    method: 'DELETE'
  })
}
/**
 * @description: 车型列表
 * @return {Promise} promise
 * */
export const getCarList = () => {
  return server({
    url: `/admin/car_type`,
    method: 'GET'
  })
}
/**
 * @description: 添加车型
 * @param {string} name 车型名称* 
 * @return {Promise} promise
 * */
export const addCar = (data) => {
  return server({
    url: `/admin/car_type`,
    method: 'POST',
    data
  })
}
/**
 * @description: 编辑车型
 * @param {string} name 车型名称* 
 * @param {number} id * 
 * @return {Promise} promise
 * */
export const editCar = ({id,...data}) => {
  return server({
    url: `/admin/car_type/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 配置列表
 * @return {Promise} promise
 * */
export const getConfigList = () => {
  return server({
    url: `/admin/config`,
    method: 'GET',
  })
}
/**
 * @description: 修改配置
 * @param {number} id * 
 * @param {string} value 配置值* 
 * @return {Promise} promise
 * */
export const editConfig = ({id,...data}) => {
  return server({
    url: `/admin/config/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 添加消息
 * @return {Promise} promise
 * */
export const addMessage = (data) => {
  return server({
    url: '/admin/message',
    method: 'POST',
    data
  })
}
/**
 * @description: 删除消息
 * @return {Promise} promise
 * */
export const deleteMessage = (id) => {
  return server({
    url: `/admin/message/${id}`,
    method: 'DELETE'
  })
}
/**
 * @description: 获取消息详情
 * @return {Promise} promise
 * */
export const getMessageDetail = (id) => {
  return server({
    url: `/admin/message/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 编辑消息
 * @return {Promise} promise
 * */
export const editMessage = ({ id, ...data }) => {
  return server({
    url: `/admin/message/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 获取消息列表
 * @return {Promise} promise
 * */
export const getMessage = (params) => {
  return server({
    url: '/admin/message',
    method: 'GET',
    params
  })
}
/**
 * @description: 服务订单列表
 * @param {number} service 服务id（服务次数的）
 * @return {Promise} promise
 * */
export const getOrderList = (params) => {
  return server({
    url: `/admin/order`,
    method: 'GET',
    params
  })
}
/**
 * @description: 服务订单详情
 * @param {number} id 订单id* 
 * @return {Promise} promise
 * */
export const getOrderDetail = (id) => {
  return server({
    url: `/admin/order/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 编辑服务订单
 * @param {number} id 订单id* 
 * @param {number} amount 价格
 * @param {number} staff 职员id
 * @param {number} active 状态 1确认 2拒绝  只有当前订单状态为0时才可以修改
 * @return {Promise} promise
 * */
export const editOrder = ({id,...data}) => {
  return server({
    url: `/admin/order/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 日程列表
 * @param {number} service 服务id（服务次数的）
 * @param {number} status 状态
 *       (0, "未洗车"),
        (1, "未找到车辆"),
        (2, "洗车结束"),
        (3, "已延迟"),
        (4, "已取消")
 * @return {Promise} promise
 * */
export const getScheduleList = (params) => {
  return server({
    url: `/admin/schedule`,
    method: 'GET',
    params
  })
}
/**
 * @description: 日程详情
 * @param {number} id 日程id* 
 * @return {Promise} promise
 * */
export const getScheduleDetail = (id) => {
  return server({
    url: `/admin/schedule/${id}`,
    method: 'GET'
  })
}
/**
 * @description: 编辑日程
 * @param {number} id 日程id* 
 * @param {number} staff 职员id
 * @param {number} status 状态 此处只能为4  当状态为0 1时可调用编辑
 *      (0, "未洗车"),
        (1, "未找到车辆"),
        (2, "洗车结束"),
        (3, "已延迟"),
        (4, "已取消")
 * @return {Promise} promise
 * */
export const editSchedule = ({id,...data}) => {
  return server({
    url: `/admin/schedule/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * @description: 上传图片
 * @return {Promise} promise
 * */
export const uploadImg = (data) => {
  return server({
    url: '/file_upload',
    method: 'POST',
    data
  })
}
/**
 * @description: 删除图片
 * @return {Promise} promise
 * */
export const unloadImg = (data) => {
  return server({
    url: '/file_delete',
    method: 'POST',
    data
  })
}



