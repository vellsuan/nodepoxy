'use strict'

var Base = require('./baseAction.js');
var tools = require("../../utils/tools.js");
var userService = require("../../service/home/userService.js");
var tokenService = require("../../service/base/tokenService.js");
var log = require("../../utils/logger.js")("loginAction");
var loginService = require("../../service/base/loginService.js");
var loginWare = require("../../middleware/loginWare.js");
var config = require("../../wechat/config.js");
var sysconfig = require("../../config/config.js");

/**
 * 登录页面
 * @param next
 */
exports.login = function *(next) {
	yield this.html('login/login', {
		"title": "登录",
		"image":image,
		'list':list,
		"IMG_URL":config.IMG_URL
	});
}

/**
 * 注册页面
 * @param next
 */
exports.register = function *(next) {
	var list = yield loginService.registerBanner();
	yield this.html('login/register', {
		"title": "登录",
		'list':list,
		"IMG_URL":config.IMG_URL
	});
}


/**
 * 注册业务
 * @param next
 */
exports.goRegister = function *(next) {
	var loginPwd =  this.request.body.loginPwd;
	var phone = this.request.body.phone ;
	
	if(!loginPwd||!phone){
		var json ={"code":"222222","message":"用户名或密码不能为空！","result":{}};
  		Base.getResponseRes(this,json);
		return 
	}
	var rsBody = yield userService.goRegister(this.request.body);
    var userInfo = rsBody.result&&rsBody.result.userInfo||"";
	if(userInfo){
		var json ={"code":"000000","message":"业务处理成功","result":userInfo};
		userInfo["password"] = loginPwd;
		yield gotoLogin(this,userInfo);
  		Base.getResponseRes(this,json);
    }else{
    	var json ={"code":"222222","message":rsBody&&rsBody.message||"系统异常，请稍后再试！","result":{}};
  		Base.getResponseRes(this,json);
    }
}

/**
 * 图文验证码
 * @param next
 */
exports.randomcode = function *(next) {
    var  img = Base.getImgbase64(this.session);
	var json ={"code":"000000","message":"业务处理成功","result":{"image":img}};
    Base.getResponseRes(this,json);
}

/**
 * 登录
 * @param next
 */
exports.goLogin = function *(next){
	var username = this.request.body.phone || this.request.body.username;
	var password = this.request.body.loginPwd || this.request.body.password;
	var channel = this.request.body.channel || '';
	var imageCode = this.request.body.imageCode;
	log.info("本地用户名密码 ===>"+username+":"+password);
	if(username && password) {
//      if(imageCode != Base.getSessionData(this.session,"sessionConstant_randomcode")){
//          json ={"code":"222222","message":"验证码失效!","result":{}};
//          Base.getResponseRes(this,json);
//          return;
//      }
        var userInfo = {phone : username,password:password,channel:channel}
        yield gotoLogin(this,userInfo);
	} else {
        var json ={"code":"222222","message":"用户名或密码不能为空!","result":{}};
        Base.getResponseRes(this,json);
	}
}

/**
 *退出
 * @param next
 */
exports.logout = function *(next){
    Base.clearLoginData(this);
    this.redirect("/login");
}

/**
 * 忘记密码
 * @param next
 */
exports.goPassword = function *(next){
	var params = this.request.body;
	
	if(!params.loginPwd||!params.phone){
		var json ={"code":"222222","message":"用户名或密码不能为空！","result":{}};
  		Base.getResponseRes(this,json);
		return 
	}
	var rsBody = yield userService.goPassword(this.request.body);
	var json ={"code":rsBody&&rsBody.code,"message":rsBody&&rsBody.message || "系统异常，请稍后再试！","result":{}};
	Base.getResponseRes(this,json);
}

/**
 * 第三方登录
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.thirdLogin = function *(next){
    var _t = this;
    var obj = this.request.query;
    var thirdType = "1";//1-qq 2-pcqq 3-微信 4-支付宝
    console.log("---------------------------------------------");
    console.log(this.request.query);
    if(this.request.query.source=="alipay_app_auth"){
        thirdType="4";//支付宝
    }else if(obj.state=="all"){
        thirdType="2";//PCQQ
    }
    var uid = yield loginWare.getThirdID(obj,thirdType);
    if(!uid){//授权失败跳转登录页面
        this.redirect("/login");
        return;
    }
    var rst = yield loginService.checkThirdLogin({"thirdType":thirdType,"uid":uid});
    var result = rst.result;
    if(result && result.userInfo){//如果平台已经绑定了该账户直接跳转首页
        //缓存存放用户信息
        result.userInfo.showBind = 1;
        Base.saveSessionData(this.session,"sessionConstant_userInfo",result.userInfo);
        var data = yield tokenService.checkAndIssueToken(_t.request,result.userInfo);
        setHeader(_t.response,data);
        //本地库更新用户信息
        yield userService.userUpdate(result.userInfo);
        yield showIndex(this,false);
    }else{//如果没有绑定该账户需要绑定第三方用户信息
        var user = {
            showBind:2
        };
        if(thirdType=="1"){//QQ识别码
            user.qquid = uid;
        }else if(thirdType=="2"){//PCQQ识别码
            user.pcqquid = uid;
        }else if(thirdType=="3"){//微信识别码
            user.unionid = uid;
        }else if(thirdType=="4"){//支付宝识别码
            user.alipayuid= uid;
        }
        Base.saveSessionData(this.session,"sessionConstant_userInfo",user);
        yield showIndex(this,true);
    }
}


exports.Verror = function*(next) {
	var parms = this.request.query||{};
	console.log(parms)
	yield this.html('error', parms);
}


/**
 * 第三方用户绑定
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.thirdBind = function *(next){
    var _t = this;
    var data = this.request.body;
    var obj = yield loginService.bindThirdLogin(data);
    var result = obj.result;
    if(result && result.userId){
        result.showBind=1;
        //缓存存放用户信息
        Base.saveSessionData(this.session,"sessionConstant_userInfo",result);
        //本地库存放用户信息
        yield userService.addUser(result);
    }
    var json = {"code":obj.code||"000000","message":obj.message||"业务处理成功","result":result};
    var data = yield tokenService.checkAndIssueToken(_t.request,result);
    setHeader(_t.response,data);
    Base.getResponseRes(this,json);
}


/**
 *登录业务
 * @param _t
 * @param userinfo
 */

var gotoLogin  = function *(_t,userData){
	var username = userData.phone;
	var password = userData.password;
	var userinfo = yield userService.getUserInfo(username,password);
        log.info("从本地库中获取用户信息 ===>"+(userinfo == null?"":userinfo.toString()));
        if(!userinfo) {
            //服务器验证
            userData.update = "save";
           yield getServerLogin(_t,userData);
        } else {
            var isMatch = tools.verifyHash(password, userinfo.loginPwd);
            if(false) {
                //本地验证成功
                var jsonData = userService.getUserBean(userinfo);
                var	data = yield tokenService.checkAndIssueToken(_t.request,jsonData);
                if(!data){
                    var json ={"code":"222222","message":"系统异常！","result":{}};
                    Base.getResponseRes(_t,json);
                }else{
                	    jsonData.token = data.token||"";
                    var json ={"result":jsonData};
                    Base.saveSessionData(_t.session,"sessionConstant_userInfo",jsonData);
                    setHeader(_t.response,data);
                    Base.getResponseRes(_t,json);
                }
            }else{
                //当本地密码不正确时需要去服务器上验证
                userData.update = "update";
               yield  getServerLogin(_t,userData);
            }
        }
}
/**
 *服务器验证用户
 * @param _t
 */
var getServerLogin = function *(_t,userinfo) {
    var username = userinfo.phone;
    var password = userinfo.password;
    var channel = userinfo.channel　|| '1004';
    var body = yield userService.getServerUser(username,password,channel);
    log.info("从服务器中获取用户信息并验证 ===>"+JSON.stringify(body));
    
    var userINFO = body.result||{};
    var userdata = userINFO.user||{};
    if(!tools.isEmptyObject(userdata)){
        var	data = yield tokenService.checkAndIssueToken(_t.request,userdata);
        if(!data){
            var json ={"code":"222222","message":"系统异常！","result":{}};
            Base.getResponseRes(_t,json);
        }else{
        		userdata.token = data.token||""
        		userINFO.user = userdata;
            Base.saveSessionData(_t.session,"sessionConstant_userInfo",userINFO);
            setHeader(_t.response,data);
            Base.getResponseRes(_t,{"result":userINFO});
            userdata.loginPwd = password;
            if(userinfo.update ==="update"){
                yield userService.userUpdate(userdata);
            }else if(userinfo.update ==="save"){
                yield userService.addUser(userdata);
            }
        }
    }else{
        var json ={"code":"222222","message":body.message,"result":{}};
        Base.getResponseRes(_t,json);
    }
}

function setHeader(that,data){
    var ctx = that.ctx;
    ctx.cookies.set('authorization', data.token);
}

//显示首页
var showIndex = function*(_t,flag){
    _t.redirect("/index");
}







/**
 * 微信公众号登录
 * @param next
 */
exports.wxLogin = function *(next){
    var parms = this.request.body;
    var userdata =  yield loginWx(this.request,parms);
    var userinfo = userdata.result||{};
    setHeader(this,userinfo);
    Base.saveSessionData(this.session,"sessionConstant_userInfo",userinfo);
    Base.getResponseRes(this,userdata);
}

/**
 * 微信公众号登录
 * @param next
 */
var loginWx = function *(request,userinfo){
	var rsdata = {};
    var data = {"nickName":userinfo.nickname||"",
        "sex":userinfo.sex,"unionid":userinfo.openid,"userImg":userinfo.headimgurl||"http://weixin.brunocaffe.cn/images/headPortrait.png","channel":"1001"};
    var userinFo =  yield Base.loginService.wxLogin(data);
    var userdata = {};
    if(userinFo.code == "000000" &&userinFo.result){
        userinFo = userinFo.result;
        userdata.user = userinFo.entity
        var	data = yield Base.tokenService.checkAndIssueToken(request,userdata);
        if(data){
        	
            userdata.token = data.token||"";
            userdata.user.loginPwd = "1q2w3e4r5t";
            //yield Base.userService.userUpdate(userdata.user);
            userdata.user.loginPwd ="";
            rsdata = {"code":"000000","message":"业务处理成功！","result":userdata};
        }else{
            rsdata = {"code":"222222","message":"系统异常！","result":{}};
        }
    }else{
        rsdata = {"code":"222222","message":userinFo.message,"result":{}};
    }
    return rsdata
}
exports.loginWx = loginWx;


