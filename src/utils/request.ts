import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

//拦截请求
request.interceptors.request.use((config) => {
    return config;
});
//拦截响应
request.interceptors.response.use(
  (response:any) => {
    return response.data;
  },
  (error:any) => {
    //处理错误
    let message = '';
    const status = error.response.status;
    switch (status) {
      case '401':
        message = 'TOKEN过期';
        break;
      case '403':
        message = '无权访问';
        break;
      case '404':
        message = '请求地址出错';
        break;
      case '500':
        message = '服务器出错';
        break;
      default:
        message = '网络问题';
        break;
    }

    //返回错误信息
    Promise.reject(error);
  },
);


export default request;