'use strict'
var Base = require('./baseAction.js');
var config = require('../../config/config.js');
var appConfig = require('../../config/appConfig.js');

exports.getServStatic = function *(next) {
	var json = { "code": "000000", "message": "业务处理成功", "result": config.ServerPath };
	var userInfo = Base.getSessionData(this.session,"sessionConstant_userInfo");
	json.result.user = userInfo&&userInfo.user||{};
	Base.getResponseRes(this, json);
}
exports.getAppServStatic = function *(next) {
	var json = { "code": "000000", "message": "业务处理成功", "result": appConfig};
	var userInfo = Base.getSessionData(this.session,"sessionConstant_userInfo");
	json.result.user = userInfo&&userInfo.user||{};
	Base.getResponseRes(this, json);
}