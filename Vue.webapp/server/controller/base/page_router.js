'use strict'

var loginAction = require("./loginAction.js"); //登录
var auth = require("../../middleware/auth.js");
var indexAction = require("../home/indexAction.js");
var config = require('../../config/config.js');
var fix = config.ServerPath.PagePath||"";

/**
 * 页面渲染
 * @param  {[type]} router [description]
 * @return {[type]}        [description]
 */
module.exports = function(router){
   //loginAction
    router.get(fix+'/login', loginAction.login);
    router.get(fix+'/error', loginAction.Verror);
    router.get(fix+'/login/register', loginAction.register);
    router.get(fix+"/login/logout",loginAction.logout);
  router.get(fix + "/login/thirdLogin", loginAction.thirdLogin);
  router.get(fix + "/index", auth.is2Wex, indexAction.index);

  router.post(fix + "/bindPhone", indexAction.bindPhone);


}





