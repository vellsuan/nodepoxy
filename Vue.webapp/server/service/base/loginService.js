'use strict'

var Token = require("../../model/base/Token.js");

var utils = require("../../utils/utils.js");

var sendRequest = require("../../utils/httpClient.js");
var tools = require("../../utils/tools.js");
var crypto = require('crypto');

exports.isValdateLoginReToken = function*(userID, deviceID) {
	var token = Token.findOne({
		userID: userID,
		deviceID: deviceID
	}).exec();
	if(token) {
		return true;
	} else {
		return false;
	}
}


exports.wxLogin = function*(data){
    try{
        var obj = yield sendRequest(data|| {}, "/org/business/USER0101.do", "POST");
    }catch(e){
        console.log(e)
    }
    return  obj
}





/**
 * 第三方登录验证
 * @param {[type]} data          [description]
 * @yield {[type]} [description]
 */
exports.checkThirdLogin = function*(data){
	console.log(data)
	try{
        var obj = yield sendRequest(data|| {}, "/org/business/MU100003.do", "POST");
	}catch(e){
		  console.log(e)
	}
    console.log(obj)
	return obj;
}
/**
 * 第三方登录绑定
 * @param {[type]} data          [description]
 * @yield {[type]} [description]
 */
exports.bindThirdLogin = function*(data){
	//随机生成一串密码
	// data.loginPwd = [1,2,3,4,5,6,"a"].map(function(x){
	// 	return Math.floor(Math.random()*10)+x;
	// }).join("");
	var obj = yield sendRequest(data|| {}, "/org/business/MU100004.do", "POST");
	return obj;
 }
