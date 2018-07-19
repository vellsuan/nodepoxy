'use strict'



var captchapng = require("captchapng");
var log =require("../../utils/logger.js")("baseAction");
var tools = require("../../utils/tools.js");
var config = require("../../config/config.js");


/**
 * 保存session
 * @param {Object} session
 * @param {Object} key
 * @param {Object} data
 */
function saveSessionData(session,key,data){
	if(!key || !session || !data) return "";

    if (null == session["sessionConstant"]||!session["sessionConstant"]) {
        session["sessionConstant"] = {};
    }
    session["sessionConstant"][key] = data;
}

function clearSessionData(session,key){
    if(session["sessionConstant"] && session["sessionConstant"][key]){
        session["sessionConstant"][key] = "";
    }
}
/**
 * 更新session
 * @param  {[type]} session [description]
 * @param  {[type]} key     [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
function updateSessionData(session,key,info){
    var data = getSessionData(session,key);
    var result = tools.extend(data,info);
    saveSessionData(session,key,result);
}


/**
 * 获取session
 * @param {Object} session
 * @param {Object} key
 */
function getSessionData(session,key){
	if(!key ) return "";
	if(!session["sessionConstant"]){
        session["sessionConstant"] = {};
    }
	return session["sessionConstant"][key]||"";
}


function clearLoginData(that){
    that.cookies.set("authorization","");
    that.cookies.set("koa.sid","");
    that.cookies.set("koa.sid.sig","");
    that.session["sessionConstant"] = "";
}



function  getImgbase64(session){
    /*var code = '0123456789';
    var length = 4;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
        randomcode += code[parseInt(Math.random() * 1000) % code.length];
    }*/
    var randomcode = parseInt(Math.random()*9000+1000);
    // 输出图片
    var p = new captchapng(162,46,parseInt(randomcode)); // width,height,numeric captcha
    p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var imgbase64 = p.getBase64();
    saveSessionData(session,"sessionConstant_randomcode",randomcode);
    return imgbase64;
}

/**
 * 处理返回结果
 * @param req
 * @param code
 * @param message
 * @param data
 * @returns {string}
 */
function getResponseRes(res,data){
    var dataStr = data.result||{};
    // var imgBaseUrl = config.imgURL||"";
    var code = data.code||"000000";
    var message = data.message||"业务处理成功!";
    // var  json = {"code":code,"message":message,"imgBaseUrl":imgBaseUrl,"result":dataStr};
    var  json = {"code":code,"message":message,"result":dataStr};
    log.info("responseResult ===>"+JSON.stringify(json));
    res.body = json;
}
/**
 * 设置返回数据
 * @param {[type]} result  [description] result需要使用的数据
 * @param {[type]} data [description]  接口返回的完整结果
 */
function setResponseRes(result,data){
    return{
        code:data.code||"777777",
        message:data.message||"接口返回异常",
        result:result
    };
}


/**
 *获取客户端IP
 * @param req
 * @returns {*}
 */
function getClientIp(req) {
    return "223.223.202.229"||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

/**
 * 获用户信息
 * @param _t
 * @returns {*}
 */
function getUserInfo(_t) {
    return getSessionData(_t.session,"sessionConstant_userInfo")||{};
}

/**
 * 获取门店信息
 * @param _t
 * @returns {*}
 */
function getShopInfo(_t) {
    return getSessionData(_t.session,"sessionConstant_shopInfo")||{};
}



exports.saveSessionData = saveSessionData;
exports.getSessionData = getSessionData;
exports.getImgbase64 = getImgbase64;
exports.getResponseRes = getResponseRes;
exports.clearLoginData = clearLoginData;
exports.clearSessionData = clearSessionData;
exports.updateSessionData = updateSessionData;
exports.setResponseRes = setResponseRes;
exports.getClientIp = getClientIp;
exports.getShopInfo = getShopInfo;
exports.getUserInfo = getUserInfo;


exports.loginService = require('../../service/base/loginService.js');
exports.tokenService = require('../../service/base/tokenService.js');
exports.mapService = require("../../service/base/mapService.js");
exports.payService = require("../../service/base/payService.js");
exports.wecahtService = require("../../service/base/wecahtService.js");
exports.userService = require("../../service/home/userService.js");



