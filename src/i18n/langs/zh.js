// 引入elementUI中文包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const zh = {
  // 退出
  exit: '退出',
  in:'进入',
  // 首页
  tIndex: '首页',
  // 后台名字
  backstageName: '汽车服务后台管理系统',
  // 会员管理
  tMemberManagement: '会员管理',
  // 职员管理
  tStaffManagement: '职员管理',
  // 服务管理
  tServiceManagement: '服务管理',
  // 服务列表
  tServiceList: '服务列表',
  // 编辑
  tEdit: '编辑',
  //详情
  tDetail: '详情',
  // 服务订单管理
  tServiceApplication: '服务订单管理',
  // 服务区域
  tServiceArea: '服务区域',
  // 管理员列表
  tManagerList: '管理员列表',
  // 代理店管理
  tShopManagement: '代理店管理',
  // 日程管理
  tScheduleManagement: '日程管理',
  // 结果管理
  tResultManagement: '洗车结果管理',
  // 结算管理
  tSettlementManagement: '结算管理',
  // 结算列表
  tSettlementList: '结算列表',
  // 内容管理
  tContentManagement: '内容管理',
  // 评价列表
  tCommentList: '评价列表',
  // 车型列表
  tCarList: '车型列表',
  // 客服中心
  tServiceCenter: '客服中心',
  // 消息通知
  tMessage: '消息通知',
  // 常见疑问
  tCommonQuestion: '常见疑问',
  // 疑难解答
  tDifficultQuestion: '疑难解答',
  // 服务条款管理
  tSetting: '服务条款管理',
  // 服务使用条款
  tUse: '服务使用条款',
  // 个人信息管理条款
  tInformation: '个人信息管理条款',
  // 位置信息使用条款
  tPosition: '位置信息使用条款',
  // 配置列表
  tConfigList:'配置列表',
  // 会员管理页面部分
  member: {
    service: '服务',
  },
  // 职员管理页面部分
  staff: {
    addStaff: '添加职员',
    sureDeleteStaff:'是否删除'
  },
  // 服务区域列表
  serviceArea:{
    addArea:'添加区域',
    first:'一级区域',
    second:'二级区域',
    area:'服务区域',
    sureDeleteArea:'确定删除该区域吗?'
  },
  // 服务列表页面部分
  serviceList: {
    name: '服务名称',
    frequentness: '每月次数',
    id: '服务id',
    img: '服务',
    price: '价格',
    category: '车型',
    addSecondCategory:'添加二级区域'
  },
  // 服务订单管理部分
  serviceApplication: {
    detail:'订单详情',
    create_time:'创建时间',
    car_name:'车辆型号',
    car_number:'车牌号',
    car_color:'车辆颜色',
    car_brand:'车辆品牌',
    car_time:'车辆年份',
    car_type:'车型类别',
    address:'地址',
    address_detail:'详细地址',
    address_code:'邮政编码',
    areaName:'一级区域名称',
    childrenName:'二级区域名称',
    remark:'客户备注',
    dayOfWeek:'洗车时间(每周)',
    amount:'价格',
    staff:'职员',
    service:'服务名称',
    active:'状态',
    userAccount:'用户名',
    userPhone:'联系方式',
    store:'代理店名称',
    unConfirm:'未确认',
    confirm:'已确认',
    refuse:'已拒绝'
  },
  // 管理员列表
  managerList: {
    addManagerList: '添加管理员',
    auth: '权限等级',
    superManager: '超级管理员',
    shopManager: '代理店管理员',
    sureDeleteManager:'确定删除管理员吗?'
  },
  // 代理店管理
  shopManagement: {
    area: '选择区域',
    addShop: '添加代理店',
    editShop:'修改代理店',
    scoped: '服务范围',
    contact: '联系方式',
    business: '营业时间',
    selectScoped: '选择服务范围',
    selectBusiness:'选择营业事件',
    sureDeleteShop:'确定删除店铺吗?',
    detail:'店铺详情',
    inputShopDesc:'请输入代理店介绍',
    inputName: '请输入代理店名称',
    inputAddress:'请输入地址',
  },
  // 日程管理
  shecheduleManagement: {
    detail:'日程详情',
    day_of_week:'洗车时间(每周)',
    service_name:'服务名称',
    car_name:'车辆型号',
    car_number:'车牌号',
    car_type:'车辆类别',
    address:'地址',
    userAccount:'用户名',
    userPhone:'用户电话',
    staffName:'职员名',
    staffAccount:'职员账户名',
    staffPhone:'职员电话',
    service_time:'洗车日期',
    status:'状态',
    status0:'未洗车',
    status1:'未找到车辆',
    status2:'洗车结束',
    status3:'已延迟',
    status4:'已取消',
    suerCancel:'确认取消吗?',
    order:'订单号',
    is_inner_clean:'是否已申请内部洗车',
    store:'代理店',
    car_color:'车辆颜色',
    car_brand:'车辆品牌',
    car_time:'车辆年份',
    remark:'客户备注',
    address_detail:'详细地址',
    address_code:'邮政编码',
    result_image:'洗车结果图',
    result_content:'洗车结果描述',
    result_evaluation:'洗车评价',
    result_update:'日程状态更新时间'
  },
  // 常见疑问
  FAQ: {
    ask: '新建疑问',
    create_time: '创建时间',
    category: '分类',
    title: '标题',
    answer: '回答',
    sureDeleteFAQ:'是否确认删除？'
  },
  // 疑难解答
  QA: {
    title:'标题',
    content:'问题内容',
    answer:'答复',
    sureDeleteQA:'是否确认删除？'
  },
  // 消息通知
  message: {
    create_time: '创建时间',
    type: '消息类型',
    title: '标题',
    content: '消息内容',
    status:'状态',
    statusText0:'未读',
    statusText1:'已读',
    typeText0: '全体',
    typeText1: '所有客户',
    typeText2: '所有职员',
    typeText3: '单个用户',
  },
  // 服务条款
  serviceTerms: {
    type: '类型',
    content: '内容',
  },
  // 评价列表
  commentList: {
    address: '地址',
    car_type: '车型',
    content: '评价',
    service: '服务类型',
    name: '姓名',
    star: '好评',
    sureDeleteComment:'确定删除评价吗?'
  },
  // 车型列表
  carList:{
    add_car:'添加车型',
    car_type:'车型'
  },
  // 配置列表
  configList:{
    name:'配置名',
    value:'配置值'
  },
  // 复用部分
  loginSuccess:'登录成功',
  signOutSuccess:'退出成功',
  changeSuccess:'修改成功',
  search: '请输入关键字',
  choiceAuth: '请选择管理员权限',
  choiceShop: '请选择代理店',
  phone: '手机号',
  username: '姓名',
  shop: '代理店',
  shopID: '代理店id',
  shopName: '代理店名称',
  address: '地址',
  introduce: '介绍',
  time: '下单时间',
  category: '服务种类',
  search_title: '筛选查询',
  inputUserID: '请输入用户ID',
  inputPhoneNum: '请输入手机号',
  inputUsername: '请输入用户名',
  inputContact:'请输入联系方式',
  inputImage: '请选择图片',
  inputCategory: '请输入服务种类',
  inputTime: '请选择下单时间',
  operation: '操作',
  search_zh: '搜索',
  account: '账号名',
  inputAccount: '请输入帐号名',
  newPassword: '新密码',
  password: '密码',
  inputPassword: '请输入密码',
  back: '返回',
  startTime: '启始时间',
  endTime: '结束时间',
  tips:'提示',
  cancelDelete:'已取消删除',
  finishForm:'请完善表单内容',
  maxOnePic:'最多只允许添加一张图片',
  min6:'长度不少于6个字符',
  min3:'长度不少于3个字符',
  sort:'排序',
  btnTip: {
    submit: '确认',
    check: '查看',
    edit: '编辑',
    delete: '删除',
    add: '添加',
    close: '关闭',
    cancel:'取消',
    resetPW: '重置密码'
  }
}
export default zh