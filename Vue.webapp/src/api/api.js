import axios from 'axios'
import config from './config'

const base = ' /org/business/';

// 下面写接口地址就好,接入几个写几个
/* export const requestLogin = params => {
  return axios.post(`${base}/CM300002.do`, params, config).then(res => res.data)
} */
//request  拦截器
// axios.interceptors.request.use(function (config) {
//   if(config.method === 'post') {
//     config.data = qs.stringify(Object.assign(config.data,{
//       branch:"1005",
//         channel:'2'}))
//   }
//   return config;
//
// }, function (error) {
//
//   return Promise.reject(error)
// })
class API {
  constructor(){
    this.massages = "业务处理成功!";
    //当前接口错误提示
    this.code='000000'||'999999'
  }

  post(params, callback, dailog, errcallback = function () {

    console.log('')
  }) {
    params.data.branch = "1005";
    params.data.channel = "2";

    config.data = params.data||{};

    var url = `${base}${params.url}.do`;
    var dailog = dailog;

    if (params.url.indexOf("/mdtc/") !== -1) {
      url = params.url
    }

    return axios.post(url, config.data, config, dailog).then(res => {
      let rst = res.data;

      if (rst.code === '000000' || rst.code === '999999') {
        callback&&callback(rst.result||{});
        if (dailog) {
          this.massages = rst.message;
        }
      }else{
        errcallback && errcallback();
        this.massages=rst.message;
        //监听massages的变化
      }
      //这里如果返回this返回的是代理对象的this
      return res
    }).catch(e => {
      
      console.log(e)
    })
  }
  get (params, callback) {
    config.data = params.data||{};
    return axios.get(`${base}${params.url}.do`, { params: {branch:"1005",channel:'2',...config.data} }, config).then(res => {
      let rst = res.data;
      if (rst.code === '000000' || rst.code === '999999') {
        callback&&callback(rst.result||{})
      }else{
        this.massages=rst.message;
        //监听massages的变化
      }
    }).catch(e => {
      console.log(e)
    })
  }

  //健康医疗
  healthhost() {
    let host = window.location.origin + '/';
    let nwehost = 'http://service.fuhua-life.com' + '/';
    let caseval = host.slice(0, 10);
    console.log(caseval);
    switch (caseval) {
      case 'http://192':
        host = nwehost;
        return host;
        break;
      case 'http://127':
        host = nwehost;
        return host;
        break;
      default:
        return host
    }
  }
}
const api = new API();

export default api
