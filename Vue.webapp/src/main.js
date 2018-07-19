// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'lib-flexible'
import VueVideoPlayer from 'vue-video-player'
import {ToastPlugin} from 'vux'
import api from './api/api'
//import {config, initvalid, isMobile} from './util/validator'
import {vmdata} from './util/bus'
import Wx from 'weixin-js-sdk'

/*import Directve from './util/directive'*/
/*Vue.directive('focus', Directve
)*/

//Validator.addLocale(zh);
//配置中文
/*Validator.updateDictionary(dictionary);*/
//验证内容规则
//Vue.use(VeeValidate,config);
//验证配置
Vue.use(ToastPlugin);

//toast初始化
//initvalid.initfor(isMobile,Validator);
//验证迭代器
let vm = new Vue(vmdata);
//挂载bus
Vue.prototype.bus = vm;
//vm bus可作为组件传参，和一些公共组件的容器
//interceptor 拦截
Vue.prototype.wx = Wx;
Vue.prototype.dilog = function (value) {

  vm.$vux.toast.show({
    text: value || "业务处理成功",
    type: 'text',
    width: "5rem",
    position: 'middle'
  });
};
var interceptor = {
  set: function (recObj, key, value) {
    // console.log(key, 'is changed to', value); //name is changed to lisi
    vm.dilog(value);
    return this
  }
};
//创建代理以进行侦听
var proxyEngineer = new Proxy(api, interceptor);

const FastClick = require('fastclick');

FastClick.attach(document.body);

Vue.prototype.api = proxyEngineer;
//弹窗公共

Vue.config.productionTip = false;

Vue.use(VueVideoPlayer);
// Vue.use(AjaxPlugin) // 使用vux的ajax
/* eslint-disable no-new */
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
};
//邮箱

//路由守卫
router.beforeEach((to, from, next) => {
  //监控守卫判断弹窗

  if (to.path !== '/detailsReport') {
    store.commit('saveshouHideval', false)
  }
  next();
});

 new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});



