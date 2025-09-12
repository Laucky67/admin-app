//此文件对axios进行二次封装，service为一个axios实例，导出一个请求函数request
import axios from "axios";
import { ElMessage } from "element-plus";
import config from "@/config";
import { mock } from "mockjs";

const service = axios.create({
  baseURL: config.baseapi,
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code === 200) {
    return data;
  } else {
    const ERROR = "网络错误。。。";
    ElMessage.error(msg || ERROR);
    return Promise.reject(msg || ERROR);
  }
});

const request = (options) => {
  options.method = options.method || "get";

  //工程化，所有数据通过data传输
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }

  const isMock = config.mock

  //用户可在请求中指定是否使用mock
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }


  if(config.env ==="prod"){
    //线上模式不允许使用mock
    service.defaults.baseURL = config.baseapi
  }else{
    //其它模式根据isMock的值来判定是否使用mock
    service.defaults.baseURL = isMock? config.mockapi : config.baseapi
  }

  //返回axios实例，上文其实在根据config修改axios实例的配置
  return service(options);
}

export default request;
