/*
* @Author: lww
* @Date:   2017-02-21 16:32:18
* @Last Modified by:   conn
* @Last Modified time: 2017-03-03 10:03:21
*/

'use strict';
var tools = require("../utils/tools.js");
var sendRequest = require("../utils/httpClient.js");
var crypto = require('crypto');
/**
 * [*getThirdToken description]
 * @param {[type]} obj 第三方接口上送参数          [description]
 * @param {[type]} loginType 第三方接口类型    [description]
 *	1-qq 2-pcqq 3-微信 4-支付宝
 * @yield {[type]} [description]
 * 返回第三方平台的信息
 */

exports.getThirdID = function*(obj,loginType){
	var result;
	switch(loginType){
		case "1"://QQ
			break;
		case "2"://PCQQ
            result = yield qqLogin(obj);
			break;
		case "3"://微信
			break;
		case "4"://支付宝
			result = yield aliLogin(obj);
			break;
		default:
			break;
	}
 	return result
 }
 //支付宝第三方登录
 var aliLogin = function*(obj){
 	var param = {
 		app_id:obj.app_id,
 		method:"alipay.open.auth.token.app",
 		charset:"utf-8",
 		sign_type:"RSA",//RSA256
 		format:"JSON",
 		timestamp:tools.formatDate(Date.now()),
 		version:"1.0",
 		biz_content:JSON.stringify({grant_type:"authorization_code",code:obj.app_auth_code})
 	};
 	param.sign = getSign(param)||"";
 	// var data = tools.extend(obj,param);
 	var data = param;
 	var userInfo = yield sendRequest(data || {},"https://openapi.alipay.com/gateway.do","GET");
 	return  userInfo&&userInfo.alipay_open_auth_token_app_response&&userInfo.alipay_open_auth_token_app_response.user_id||"";
 }
 /**
  * QQ第三方登录
  * @param {[type]} obj           [description]
  * @yield {[type]} [description]
  */
 var qqLogin = function*(obj){
    var data = {
        grant_type:"authorization_code",
        client_id:obj.app_id,
        client_secret:"",//appkey
        code:obj["code"],//返回的code
        redirect:"http://reserve.libreresorts.com/login/thirdLogin"
    };
    //获取token
    var tokenInfo = yield sendRequest(data||{},"https://graph.qq.com/oauth2.0/token","GET");
    var token = tokenInfo&& tokenInfo.access_token||"";
    var userInfo = yield sendRequest({access_token:token}||{},"https://graph.qq.com/oauth2.0/me","GET");
    return userInfo && userInfo.openid||"";

 }
 //对支付宝签名的参数进行排序
var getSignParams = function(params){
 	var sPara = [];
    if(!params) return null;
    for(var key in params) {
        if((!params[key]) || key == "sign") {
            continue;
        };
        sPara.push([key, params[key]]);
    }
    sPara = sPara.sort();
    var prestr = '';
    for(var i2 = 0; i2 < sPara.length; i2++) {
        var obj = sPara[i2];
        if(i2 == sPara.length - 1) {
            prestr = prestr + obj[0] + '=' + obj[1] + '';
        } else {
            prestr = prestr + obj[0] + '=' + obj[1] + '&';
        }
    }
    return prestr.replace(/^\s|\s$/g, '');
};
//获取支付宝签名参数
var getSign = function(params){
	try {
        var privateKey = config.ALI_PRI_KEY;//商户私钥
        var prestr = getSignParams(params);
        var sign = crypto.createSign('RSA-SHA1');
		privateKey = insert_str(privateKey,"\n",64);

		privateKey ='-----BEGIN RSA PRIVATE KEY-----\n' +privateKey+'-----END RSA PRIVATE KEY-----\n';
		console.log(prestr);
	    console.log(privateKey);
	    sign.update(prestr,"utf8");
	    sign = sign.sign(privateKey,"base64");
	    console.log(sign);
	    return sign;
    } catch(err) {
        console.log('veriSign err', err)
    }
};
//针对支付宝私钥添加换行处理
var insert_str = function(str, insert_str, sn) {
    var newstr = "";
    for (var i = 0; i < str.length; i += sn) {
        var tmp = str.substring(i, i + sn);
        newstr += tmp + insert_str;
    }
    return newstr;
}