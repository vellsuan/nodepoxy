'use strict'

var Base = require('../controller/base/baseAction.js');
var log =require("../utils/logger.js")("render");
var tools = require("../utils/tools.js");
var config = require("../config/config.js");


module.exports = function(app) {
	app.context.html = function *(viewName,data,opt){
	    if(!data){
	        data = {};
	    }
        data.tools = tools;
        
        var isWechat = Base.getSessionData(this.session,"isWechat");
        var isAppFrom = Base.getSessionData(this.session,"isAppFrom");
        data.isWechat = isWechat||config.isWechat||"wechat";
        log.info("从APP点过来的"+isAppFrom);
        data.isAppFrom = isAppFrom || config.isAppFrom || "";
        
	    var userInfo = Base.getUserInfo(this).user||{};
	    if(userInfo) data.userInfo = userInfo;
	    data.ServerPath = config.ServerPath||{};
	    yield this.render(viewName, data,opt);
	}
}

