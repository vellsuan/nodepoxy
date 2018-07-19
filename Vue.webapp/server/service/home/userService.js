'use strict'

var User = require("../../model/base/User.js");
var tools = require("../../utils/tools.js");
var sendRequest = require("../../utils/httpClient.js");

/**
 * 用户中心
 */

/**
 * 根据用户名、手机号或邮箱获取本地用户信息
 * @param username
 * @param password
 * @returns {*}
 */
exports.getUserInfo = function*(username, password) {
	var userinfo = yield User.findOne({
		"$or": [{
			"phone": username
		}, {
			"email": username
		}, {
			"userName": username
		}]
	}).exec();
	return userinfo;
}

/**
 *服务器登录
 * @param username
 * @param password
 * @returns {*}
 */
exports.getServerUser = function*(username, password,channel) {
//	var codeData = yield sendRequest({
//		"browserCode": "web2.0"
//	} || {}, "/org/business/CA000001.do", "POST");
	var body = yield sendRequest({
		"phone": username,
		"loginPwd": password,
		"channel":channel
	} || {}, "CU100002", "POST");
	return body
}
/**
 *订单详情
 * @param id
 */
exports.orderDetail = function*(id) {
	var fedBack = yield sendRequest({
		"id": id
	} || {}, "/org/business/OR100004.do", "POST");
	return fedBack;
}
/**
 *注册
 * @param body
 * @returns {*}
 */
exports.goRegister = function*(body) {
	var resBody = yield sendRequest(body || {}, "/org/business/CU100001.do", "POST");
	return resBody
}
/**
 * 密码重置
 * @param body
 * @returns {*}
 */
exports.goPassword = function*(body) {
	var resBody = yield sendRequest(body || {}, "CU100008", "POST");
	return resBody
}
/**
 * 更新用户信息
 * @param userinfo
 */
exports.userUpdate = function*(userinfo) {
	yield User.update({
		userId: userinfo.userId
	}, {
		$set: userinfo
	});
}

/**
 *更新本地用户信息
 * @param _t
 * @param Base
 * @param userinfo
 */

exports.userSessORUpdate = function*(_t, Base, userInfo) {
	Base.updateSessionData(_t.session, "sessionConstant_userInfo", userInfo);
	yield User.update({
		userId: userInfo.userId
	}, {
		$set: userInfo
	});
}

/**
 * 添加用户信息
 * @param userinfo
 */
exports.addUser = function*(userinfo) {
	var data = yield User.findOne({
		"phone": userinfo.userId
	}).exec();
	if(data) {
		return;
	}
	var user = new User();
	user.userId = userinfo.userId || "";
	user.phone = userinfo.phone || "";
	user.email = userinfo.email || "";
	user.loginPwd = userinfo.loginPwd || "";
	user.payPwd = userinfo.payPwd || "";
	user.unionid = userinfo.unionid || "";
	user.weibouid = userinfo.weibouid || "";
	user.pcqquid = userinfo.pcqquid || "";
	user.qquid = userinfo.qquid || "";
	user.alipayuid = userinfo.alipayuid || "";
	user.uuid = userinfo.uuid || "";
	user.registerTime = userinfo.registerTime || "";
	user.status = userinfo.status || "";
	user.channel = userinfo.channel || "";
	user.registerTimeStr = userinfo.registerTimeStr || "";
	user.userInfoId = userinfo.userInfoId || "";
	user.userName = userinfo.userName,
		user.nickName = userinfo.nickName || "";
	user.userImg = userinfo.userImg || "";
	user.sex = userinfo.sex || "";
	user.birthday = userinfo.birthday || "";
	user.address = userinfo.address || "";
	user.district = userinfo.district || "";
	user.districtCode = userinfo.districtCode || "";
	user.loginNum = userinfo.loginNum || "";
	user.credits = userinfo.credits || "";
	user.loginTime = userinfo.loginTime || "";
	user.loginIp = userinfo.loginIp || "";
	user.loginTimeStr = userinfo.loginTimeStr || "";
	user.tel = userinfo.tel || "";
	user.idType = userinfo.idType || "";
	user.idCard = userinfo.idCard || "";
	if(user.loginPwd) {
		user.loginPwd = tools.generateHash(userinfo.loginPwd);
	}
	yield user.save();
}

/**
 * 类型转换
 * @param userinfo
 * @returns {{}}
 */
exports.getUserBean = function(userinfo) {
	var user = {};
	user.userId = userinfo.userId || "";
	user.phone = userinfo.phone || "";
	user.email = userinfo.email || "";
	user.loginPwd = userinfo.loginPwd || "";
	user.payPwd = userinfo.payPwd || "";
	user.unionid = userinfo.unionid || "";
	user.weibouid = userinfo.weibouid || "";
	user.pcqquid = userinfo.pcqquid || "";
	user.qquid = userinfo.qquid || "";
	user.alipayuid = userinfo.alipayuid || "";
	user.uuid = userinfo.uuid || "";
	user.registerTime = userinfo.registerTime || "";
	user.status = userinfo.status || "";
	user.channel = userinfo.channel || "";
	user.registerTimeStr = userinfo.registerTimeStr || "";
	user.userInfoId = userinfo.userInfoId || "";
	user.userName = userinfo.userName,
		user.nickName = userinfo.nickName || "";
	user.userImg = userinfo.userImg || "";
	user.sex = userinfo.sex || "";
	user.birthday = userinfo.birthday || "";
	user.address = userinfo.address || "";
	user.district = userinfo.district || "";
	user.districtCode = userinfo.districtCode || "";
	user.loginNum = userinfo.loginNum || "";
	user.credits = userinfo.credits || "";
	user.loginTime = userinfo.loginTime || "";
	user.loginIp = userinfo.loginIp || "";
	user.loginTimeStr = userinfo.loginTimeStr || "";
	user.tel = userinfo.tel || "";
	user.idType = userinfo.idType || "";
	user.idCard = userinfo.idCard || "";
	return user || {};
}
/**
 * 查询node 本地用户数据
 * @returns {*}
 */
exports.findAllUsers = function*() {
	var data = yield User.find({}).exec();
	return data;
}

/**
 * 创建token
 * @param phone
 * @param zone
 */
exports.addorCreateUserByPhone = function*(phone, zone) {
	var res = this.response;
	var req = this.reqest;
	if(phone && zone) {
		var data = User.findOne({
			phone: phone
		}).exec();
		if(data) {
			tokenCtl.checkAndIssueToken(req, res, data, function(err, isok) {
				if(err) return res.status(error.ServerInternalError.message).send(err.message);
				if(isok) return;
			});
		} else {
			var user = new User();
			user.name = phone;
			user.password = global.config.DefaultPassword;
			user.linkID = user._id.toString();
			user.phone = phone;
			user.zone = zone;
			user.oauth = [];
			user.save(function(err) {
				if(err) return res.status(error.ServerInternalError.status).send(err.message);
				tokenCtl.checkAndIssueToken(req, res, user, function(err, isok) {
					if(err) return res.status(error.ServerInternalError.message).send(err.message);
					if(isok) return;
				});
			});
		}
	} else {
		res.status(error.ServerInternalError.status).send(error.ServerInternalError.message);
	}
}

/**
 * 绑定手机号
 * @param data
 * @returns {*}
 */
exports.bindPhone = function*(data){
  var obj = yield sendRequest(data || {}, "USER0102", "POST");
	return obj;
}
