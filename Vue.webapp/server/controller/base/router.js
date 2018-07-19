'use strict'
var loginAction = require("./loginAction.js");
var userAction = require("../home/userAction.js");

var wxAction = require("./wecahtAction.js");
var mapAction = require("./mapAction.js");
var staticAction = require("./staticAction.js");
var auth = require("../../middleware/auth.js");
var wx = require("../../wechat/wx.js");

var config = require('../../config/config.js');
var fix = config.ServerPath.ApiPath||"";
/**
 * 接口调用
 * @param  {[type]} router [description]
 * @return {[type]}        [description]
 */
module.exports = function(router) {
	//wecahtAction 验证
	router.all(fix+'/wx', wxAction.wxHandler("", wx.reply));

	//设置行业
    router.all(fix+'/wx/setIndustry', wxAction.setIndustry());

	//微信授权auth2.0授权
	router.get(fix+'/wx/wxAauth2', wxAction.wxAauth2());

	//js_sdk微信授权
	router.post(fix+'/wx/wxAauthSDK', wxAction.wxAauthSDK());

	//微信支付
	router.post(fix+'/wx/wxPay',auth.isAuthenticated, wxAction.wxPay());

	//微信登录
	router.post(fix+'/login/wxLogin', loginAction.wxLogin);

	//百度地图 查询附近门店
	router.post(fix+'/map/searchSearby', mapAction.searchAction);

	//坐标转化
	router.post(fix+'/map/getXYToXY', mapAction.getXYToXY);

	//本地信息检索
	router.post(fix+'/map/getUserAddress', mapAction.getUserAddress);

	//检索匹配用户详细信息
	router.post(fix+'/map/getAddressDetail', mapAction.getAddressDetail);

	//计算距离
	router.post(fix+'/map/routeMatrix', mapAction.routeMatrix);


	router.post('/apiCcfaConfig/getServStatic', staticAction.getServStatic);
	router.post('/apiCcfaConfig/getAppServStatic', staticAction.getAppServStatic);

	//注册
	router.post(fix+'/login/goRegister', loginAction.goRegister);

	//登录
	router.post(fix+'/login/goLogin', loginAction.goLogin);
	//密码重置
	router.post(fix+'/login/goPassword', loginAction.goPassword);

	router.post(fix+"/uc/getUserInfo",userAction.getUserInfo);


}
