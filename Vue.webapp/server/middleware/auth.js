var tokenService = require("./../service/base/tokenService.js");
var Base = require('./../controller/base/baseAction.js');
var loginAction = require('./../controller/base/loginAction.js');
var Wechat = require("../wechat/Wechat.js");
var log = require("../utils/logger.js")("auth.js");


exports.isAuthenticated = function *(next) {
    var isToken = yield tokenService.verifyToken(this.cookies);
    if(config.ServiceUserDemo){
        userdata = require("../../mock/CU100015.json");
        console.log("../../mock/CU100015.json  ======>"+JSON.stringify(userdata));
        var userinfo = userdata.result||{};
        Base.saveSessionData(this.session,"sessionConstant_userInfo",userinfo);
        isToken = true
    }
    var userinfo = Base.getUserInfo(this);
    if(!userinfo||!userinfo.user||!userinfo.user.userId){
        Base.clearLoginData(this);
        console.log(this.request);
        if(this.request.method == "GET"){
        		var pahtName  = this.request.path;
       		this.redirect("/system.html?pahtName="+pahtName);
        }else{
        		Base.getResponseRes(this.request,{"message":"认证失败！"})
        }
        return;
    }
    yield next;
}

exports.is2Wex = function *(next) {
    var that = this;
    var parms = that.request.query;
    var userdata = {};
    if(config.ServiceUserDemo){
        userdata = require("../../mock/CU100015.json");
        console.log("../../mock/CU100015.json  ======>"+JSON.stringify(userdata));
    }else{
    		if(parms&&parms.code){
    			var wechat = Wechat.getWechat();
                var wxdata =  yield wechat.getWebUserInfo(parms.code);
                  if(!wxdata.openid){
				    		yield next;
				    		return ;
				  }
                userdata = yield loginAction.loginWx(that.request,wxdata);
                Base.clearLoginData(this);
    		}else{
    			userdata.result = Base.getUserInfo(this);
    		}
    }
    var userinfo = userdata.result||{};
    that.cookies.set('authorization', userinfo.token||"a4539a6eafd2dd44902830deaf5d68159f67b799",{ signed: true });
    Base.saveSessionData(that.session,"sessionConstant_userInfo",userinfo);
    yield next;
}







