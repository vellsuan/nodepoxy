'use strict'
var log = require("../utils/logger.js")("params");
var Base = require('./../controller/base/baseAction.js');

module.exports = function(app) {
	app.use(function*(next) {
		var serverPath = this.request.url||"";
		if(serverPath.indexOf("/shop/")!=-1||serverPath.indexOf("/ccfa/")!=1){
			console.log(serverPath);
			var query_params = this.request.query||{};
			var body_params = this.request.body||{};
			var isWechat = query_params["isWechat"]||body_params["isWechat"]||"wechat";
			log.info("终端类型 ====>"+isWechat);
			Base.saveSessionData(this.session,"isWechat",isWechat);
		}
		yield * next;
	});
}