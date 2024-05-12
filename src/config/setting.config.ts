/**
 * @description 导出通用配置
 */
export default {
  // 标题，此项修改后需要重启项目！！！ (包括初次加载雪花屏的标题 页面的标题 浏览器的标题)
  title: 'Vue Admin Plus',
  // 标题分隔符
  copyright: 'chuzhixin 1204505056@qq.com',
  // 缓存路由的最大数量
  keepAliveMaxNum: 20,
  // 路由模式，是否为hash模式
  isHashRouterMode: true,
  // 不经过token校验的路由，白名单路由建议配置到与login页面同级，如果需要放行带传参的页面，请使用query传参，配置时只配置path即可
  routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],
  // 加载时显示文字
  loadingText: '正在加载中...',
  // token名称
  tokenName: 'token',
  // token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: 'admin-plus-token',
  // token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  // token失效回退到登录页时是否记录本次的路由（是否记录当前tab页）
  recordRoute: true,
  // 语言类型zh、en
  i18n: 'zh',
  // 消息框消失时间
  messageDuration: 3000,
  // 是否开启登录拦截
  loginInterception: false,
  // 是否开启登录RSA加密
  loginRSA: false,
  // intelligence(前端导出路由)和 all(后端导出路由)两种方式
  // 是否支持游客模式，支持情况下，访问白名单，可查看所有asyncRoutes
};
