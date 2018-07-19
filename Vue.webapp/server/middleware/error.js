'use strict'
var log = require("../utils/logger.js")("error");
module.exports = function(app) {
	app.use(function*(next) {
		var url = this.request.url || "";
		var status = "";
		try {
			log.info("url______________________" + url);
			yield * next;
		} catch(e) {
			log.info("e" + e);
			status = e.status || "500";
			var  message = e.message || '服务器错误';
		}
		// 根据 status 渲染不同的页面
		if(url.indexOf(".") != -1) {
			yield * next;
		} else {
			if(status == 403) {
				this.redirect("/page404.html");
			}
			if(status == 404) {
				this.redirect("/page404.html");
			}
			if(status == 500) {
				this.redirect('/page500.html');
			}
		}
	});
}