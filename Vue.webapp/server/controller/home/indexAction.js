'use strict'

var Base = require('./../base/baseAction.js');

exports.index = function *(next) {
	var parms = this.request.query||{};
	var surl = parms.state&&parms.state.replace("@@","#")||"";
	var redirectURL = surl||parms.redirectURL||"/index.welcome.html";
	this.redirect(redirectURL);
}


//绑定手机号
exports.bindPhone = function* (next) {
  var params = this.request.body;
  var objData = yield Base.userService.bindPhone(params);
  if (objData.code == "000000") {
    var udata = {user: objData.result && objData.result.entity || {}};
    Base.saveSessionData(this.session, "sessionConstant_userInfo", udata);
    Base.getResponseRes(this, udata);
    return;
  }
  Base.getResponseRes(this, objData);
}





