'use strict'
var log = require("../../utils/logger.js")("userAction");
var Base = require('./../base/baseAction.js');
var utils = require("../../utils/utils.js");
var tool = require("../../utils/tools.js");

//个人中心页面渲染
exports.usercenter = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	yield queryUserInfo(this,userInfo.userId);//更新缓存用户信息
	var params = {
		"userId": userInfo.userId
	}
	var obj = yield Base.userService.vipInfo(params);
	var vipInfo = obj && obj.result || {};
	yield this.html('usercenter/usercenter', {
		"title": "个人中心",
		"uc_active": "mui-active",
		"vipInfo": vipInfo
	});
}
//APP 通过接口获取会员信息
exports.appUserInfo = function*(next) {
	var params = this.request.body;
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	if(!params.userId) {
		params.userId = userInfo.userId
	}
	var obj = yield Base.userService.vipInfo(params);
	Base.saveSessionData(this.session,"sessionConstant_userInfo",obj.result);
	Base.getResponseRes(this, obj);
}

//我的众筹
exports.myRaise = function*(next) {
	yield this.html("usercenter/myRaise", {
		title: "我的众筹",
	})
}
// 获取用户信息
exports.getUserInfo = function*(next) {
	var obj = Base.getSessionData(this.session, "sessionConstant_userInfo") || {};
	Base.getResponseRes(this, {
		'result': obj
	});
}
// 我的众筹列表
exports.myRaiseList = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.myRaiseList(params);
	Base.getResponseRes(this, obj);
}
//发布动态
exports.publishDynamics = function*(next) {
	yield this.html("usercenter/publishDynamics", {
		title: "发布动态"
	})
}
//发布动态
exports.publishList = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.publishList(params);
	Base.getResponseRes(this, obj);
}
//众筹订单
exports.orderRaise = function*(next) {
	yield this.html("usercenter/orderRaise", {
		title: "众筹订单"
	})
}
// 众筹订单列表
exports.orderRaiseList = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.orderRaiseList(params);
	Base.getResponseRes(this, obj);
}
//我的抢购
exports.myPanicBuying = function*(next) {
	yield this.html("usercenter/myPanicBuying", {
		title: "我的抢购"
	})
}
// 我的抢购列表
exports.myPanicBuyingList = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.myPanicBuyingList(params);
	Base.getResponseRes(this, obj);
}
// 我的领投
exports.collarVote = function*(next) {
	yield this.html("usercenter/collarVote", {
		title: "我的领投"
	})
}
// 我的领投列表
exports.collarVoteList = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.collarVoteList(params);
	Base.getResponseRes(this, obj);
}
// 我的约谈
exports.myInterview = function*(next) {
	yield this.html("usercenter/myInterview", {
		title: "我的约谈"
	})
}
// 我的约谈列表
exports.myInterviewList = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.myInterviewList(params);
	Base.getResponseRes(this, obj);
}
// 我的关注
exports.myFocus = function*(next) {
	yield this.html("usercenter/myFocus", {
		title: "我的关注"
	})
}
// 我的关注列表
exports.myFocusList = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.myRaiseList(params);
	Base.getResponseRes(this, obj);
}
// 取消关注
exports.cancelAttention = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.cancelAttention(params);
	Base.getResponseRes(this, obj);
}
// 删除订单
exports.deleteOrder = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.deleteOrder(params);
	Base.getResponseRes(this, obj);
}
// 取消订单
exports.cancelOrder = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.cancelOrder(params);
	Base.getResponseRes(this, obj);
}
//分享
exports.getShopkeeperInfo = function*(next) {
	var rst = Base.getSessionData(this.session, "sessionConstant_shopkeeperInfo") || {};
	var result = rst || {};
	Base.getResponseRes(this, {
		result: result
	});
}

// 围观页面渲染
exports.onLooker = function*(next) {
	yield this.html('usercenter/onLooker', {
		"title": "围观",
	});
}

//新闻列表
exports.newsList = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.pronewsList(params);
	var newList = obj && obj.result && obj.result.page && obj.result.page.datas || [];
	for(var i=0;i<newList.length;i++){//通过id查询浏览器记录
		var brosweObj = yield Base.browseRecordService.getBrowseRecord({"pid":newList[i].articleId,"type":params.type});
		newList[i]["bnum"]=brosweObj["bnum"]||0;
	}
	Base.getResponseRes(this, obj);
}

// 参与首页
exports.participate = function*(next) {
	//顶部banner
	var banner = yield Base.userService.queryTopBanner({
		"status": '2',
		"placeSign": "PARTNERSHIPBANNER"
	});
	var data = {
		"status":"1",
	}

	var bannerList = banner && banner.result && banner.result.entity && banner.result.entity.adverList || [];
	var roadObj = yield Base.userService.projectRoadshowList(data); //路演列表

	var roadList = roadObj && roadObj.result && roadObj.result.list || [];
	let [roadCont] = [utils.decodeURIComponent(roadList, "content") || ''];
//	for(var i=0;i<roadList.length;i++){//通过路演id查询浏览器记录
//		var brosweObj = yield Base.browseRecordService.getBrowseRecord({"pid":roadList[i].showId});
//		roadList[i]["bnum"]=brosweObj["bnum"]||0;
//	}
	yield this.html('usercenter/participate', {
		"title": "参与",
		"roadList": roadList,
		"roadCont": roadCont,
		"banner": bannerList,
		"bLeng": bannerList.length,
	});
}

// 路演列表
exports.roadShowList = function*(next) {
	var params = this.request.body;
	var data = {"status":"1"}
	var obj = yield Base.userService.projectRoadshowList(data);
	var roadList = obj && obj.result && obj.result.list || [];
	for(var i=0;i<roadList.length;i++){//通过路演id查询浏览器记录
		var brosweObj = yield Base.browseRecordService.getBrowseRecord({"pid":roadList[i].showId,'type':"roadShow"});
		roadList[i]["bnum"]=brosweObj["bnum"]||0;
	}
	Base.getResponseRes(this, obj);
}

//社群
exports.community = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = {
		"userId": userInfo && userInfo.userId || "4",
		"isGroup": "1"
	};
	var obj1 = yield Base.userService.community(params);
	params.isGroup = "2";
	var obj2 = yield Base.userService.community(params);
	var list1 = obj1 && obj1.result && obj1.result.list || []; // 管理的群
	var list2 = obj2 && obj2.result && obj2.result.list || []; // 加入的群
	yield this.html('usercenter/community', {
		"title": "社群",
		"list1": list1,
		"list2": list2,
		"list1L": list1.length,
		"list2L": list2.length
	});
}

//认证首页
exports.authenIndex = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = {
		"userId": userInfo.userId
	}
	var objCon = yield Base.ccfaService.queryContriPoint(params); //贡献值
	var obj = yield Base.userService.vipInfo(params);
	var vipInfo = obj && obj.result || {};
	yield this.html('usercenter/authenIndex', {
		"title": "个人认证",
		"vipInfo": vipInfo,
		"flag": objCon.code === "777777" ? "" : "1",
	});
}
//查询用户贡献值
exports.queryContriPoint = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.queryContriPoint(params);
	Base.getResponseRes(this, obj);
}

//实名认证
exports.realAuthen = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = {
		"userId": userInfo.userId,
	}
	var vipInfoObj = yield Base.userService.vipInfo(params);
	var vipInfo = vipInfoObj && vipInfoObj.result || {};
	var flag = '1';
	if(vipInfo && vipInfo.user && vipInfo.user.userImg.substr(0, 7) == "http://") {
		flag = '2';
	}
	var time = vipInfo && vipInfo.userInformation && vipInfo.userInformation.foundTime && (tool.formatTime(vipInfo.userInformation.foundTime, 4)) || '';
	var obj = yield Base.userService.industry();
	var list = obj && obj.result && obj.result.list || [];
	yield this.html('usercenter/realAuthen', {
		"title": "实名认证",
		"list": list,
		"vipInfo": vipInfo,
		"time": time,
		"flag": flag,
	});
}

//店主认证
exports.shopAuthen = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = {
		"userId": userInfo.userId
	}
	var vipInfoObj = yield Base.userService.vipInfo(params);
	var vipInfo = vipInfoObj && vipInfoObj.result || {};
	var flag = '1';
	if((vipInfo && vipInfo.user && vipInfo.user.userImg||'').substr(0, 7) == "http://") {
		flag = '2';
	}
	var flag1 = '1';
	if((vipInfo && vipInfo.userInformation && vipInfo.userInformation.shopLogo ||'').substr(0, 7) == "http://") {
		flag1 = '2';
	}
	yield this.html('usercenter/shopAuthen', {
		"title": "店主认证",
		"vipInfo": vipInfo,
		"flag1": flag1,
		"flag": flag,
	});
}

//发起人认证-个人
exports.initiaiorAuthenper = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = {
		"userId": userInfo.userId
	}
	var vipInfoObj = yield Base.userService.vipInfo(params);
	var vipInfo = vipInfoObj && vipInfoObj.result || {};
	yield this.html('usercenter/initiaiorAuthenper', {
		"title": "发起人认证-个人",
		"vipInfo": vipInfo
	});
}

//发起人认证-机构
exports.initiatorAuthen = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = {
		"userId": userInfo.userId
	}
	var vipInfoObj = yield Base.userService.vipInfo(params);
	var vipInfo = vipInfoObj && vipInfoObj.result || {};
	var imgArry = [];
	if(vipInfo.userInformation.industryPic1){
		imgArry = (vipInfo&&vipInfo.userInformation&&vipInfo.userInformation.industryPic1 || '').split(',');
	}

	yield this.html('usercenter/initiatorAuthen', {
		"title": "发起人认证-机构",
		"vipInfo": vipInfo,
		"imgArry":imgArry
	});
}

//领投人认证 && 合格投资人
exports.leaderAuthen = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = {
		"userId": userInfo.userId,
	}
	var vipInfoObj = yield Base.userService.vipInfo(params);
	var vipInfo = vipInfoObj && vipInfoObj.result || {};
	var data = this.request.query;
	var title = "领投人认证";
	if(data.type) {
		title = "合格投资人认证";
	}

	var obj = yield Base.userService.industry();
	var list = obj && obj.result && obj.result.list || [];
	yield this.html('usercenter/leaderAuthen', {
		"title": title,
		"list": list,
		"vipInfo": vipInfo,
		"projectId": data.projectId,
		"hgtzr": data.type
	});
}

//领投人认证-提交 && 发起人认证-提交
exports.authenAll = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = this.request.body;
	var datas = {
		"userId": userInfo.userId,
	}
	var vipInfoObj = yield Base.userService.vipInfo(datas);
	var vipInfo = vipInfoObj && vipInfoObj.result || {};

	params.userId = userInfo && userInfo.userId;
	params.managerName =  vipInfo&&vipInfo.userInformation&&vipInfo.userInformation.contactName || '';
	params.phone =  vipInfo&&vipInfo.userInformation&&vipInfo.userInformation.contactPhone || '';
	params.industryCode=vipInfo&&vipInfo.userInformation&&vipInfo.userInformation.attentionIndustry || '';
	var obj = yield Base.userService.authenAll(params);
	if(obj.code=="000000"){
		yield queryUserInfo(this,userInfo.userId);
	}
	Base.getResponseRes(this, obj);
}

//账户明细
exports.accountDetails = function*(next) {
	var params = this.request.query;
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	params.eleAcct = userInfo && userInfo.account.accountNo;
	params.yhid = userInfo && userInfo.userId;
	yield this.html('usercenter/accountDetails', {
		"title": "账户明细",
	});
}

//账户明细分页滚动加载
exports.accountScroll = function*(next) {
	var params = this.request.body;
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	params.eleAcct = userInfo && userInfo.account.accountNo;
	var obj = yield Base.userService.accountDetails(params); // 账户明细
	Base.getResponseRes(this, obj);
}

//盈豆明细分页滚动加载
exports.yingdouScroll = function*(next) {
	var params = this.request.body;
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	params.userId = userInfo && userInfo.userId;
	var obj = yield Base.userService.yingDou(params); // 盈豆明细
	Base.getResponseRes(this, obj);
}

//优惠券列表（全部包含未使用·已使用·已过期）
exports.discountList = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = this.request.query;
	params.currentPageNum = "1";
	params.pageCount = "10";
	params.sypt = "000";
	params.userId = userInfo && userInfo.userId;
	params.syzt = "0";
	var obj1 = yield Base.userService.discount(params);
	params.syzt = "1";
	var obj2 = yield Base.userService.discount(params);
	params.syzt = "2";
	var obj3 = yield Base.userService.discount(params);
	let [wsyNum, yhyNum, ysxNum] = [obj1.result.entity.wsyNum, obj1.result.entity.yhyNum, obj1.result.entity.ysxNum]
	var entityObj = {
		"wsyNum": wsyNum,
		"yhyNum": yhyNum,
		"ysxNum": ysxNum,
		"list1": obj1 && obj1.result && obj1.result.list && obj1.result.list.datas || [],
		"list2": obj1 && obj2.result && obj2.result.list && obj2.result.list.datas || [],
		"list3": obj1 && obj3.result && obj3.result.list && obj3.result.list.datas || [],
	}

	yield this.html('usercenter/discountList', {
		"title": "优惠券",
		"data": entityObj,
	});
}

// 优惠券动态加载
exports.discountSet = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = this.request.query;
	params.sypt = "000";
	params.userId = userInfo && userInfo.userId;
	var obj = yield Base.userService.discount(params);
	Base.getResponseRes(this, obj);
}
//路演详情
exports.roadShow = function*(next) {
	var params = this.request.query;
	//顶部banner
	var banner = yield Base.userService.queryTopBanner({
		"status": '2',
		"placeSign": "PARTNERSHIPBANNER"
	});
	var bannerList = banner && banner.result && banner.result.entity && banner.result.entity.adverList || [];

	var obj = yield Base.userService.rodaDetail(params);
	let [data, cont] = [obj.result.entity, utils.decodeURIComponent(obj && obj.result && obj.result.entity && obj.result.entity.content || '')];

	var startTime = tool.formatTime(data.startTime, 11);
	var endTime = tool.formatTime(data.endTime, 11);
	data.content = cont;
	data.endTime = endTime;
	data.startTime = startTime;
	yield Base.browseRecordService.saveBrowseRecord({
		pid:params.showId||"",
		uip:Base.getClientIp()||"",//浏览用户ip地址
		rurl:this.req.url||"",
		type:"roadShow",
	});
	yield this.html('usercenter/roadShow', {
		"title": "路演",
		"banner": bannerList,
		"data": data,
		"showid": params.showId
	});
}

//路演我要报名
exports.signUp = function*(next) {
	var params = this.request.body;
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	params.userId = userInfo && userInfo.userId;
	var obj = yield Base.userService.signUp(params);
	Base.getResponseRes(this, obj);
}

// 机构认证-提交
exports.mechAuthen = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = this.request.body;
	params.userId = userInfo.userId;
	params.status = "1";
	var obj = yield Base.userService.mechAuthen(params);
	Base.getResponseRes(this, obj);
}

// 个人认证-提交
exports.ownAuthen = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = this.request.body;
	params.userId = userInfo.userId;
	var obj = yield Base.userService.ownAuthen(params);
	Base.getResponseRes(this, obj);
}

// 店主认证
exports.shoperAuthen = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = this.request.body;
	params.userId = userInfo && userInfo.userId;
	var obj = yield Base.userService.shoperAuthen(params);
	Base.getResponseRes(this, obj);
}

//  直播列表
exports.liveList = function*(next) {
	var params = this.request.body;
	params.articleCategory = "2";
	params.articleRange = "";
	var obj = yield Base.userService.pronewsList(params); //直播列表
	Base.getResponseRes(this, obj);
}

/**
 * 查询用户信息
 * @param next
 */
var queryUserInfo = function*(that, userId) {
	var userData = yield Base.userService.queryUserInfoByUserId({
		"userId": userId
	});
	if(userData.code == "000000") {
		Base.saveSessionData(that.session, "sessionConstant_userInfo", userData.result);
	}
	return userData;
}

/**
 * 绑定手机号
 * @param next
 */
exports.bindPhone = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.bindPhone(params);
	if(obj.code != "000000") {
		obj.code = "222222"
	} else if(obj.code == "000000") {
		var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo") || {};
		obj = yield queryUserInfo(this, userInfo.user.userId);
	}
	Base.getResponseRes(this, obj);
}

/**
 * 获取验证码
 * @param next
 */
exports.queryCode = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.queryCode(params);
	Base.getResponseRes(this, obj);
}

//购买贡献值
exports.purchase = function*(next) {
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user||{};
	var params = {
		"userId": userInfo.userId
	}
	var obj = yield Base.userService.vipInfo(params);
	//贡献值比例
	var scaleObj = yield Base.userService.queryScalePoint({paramKey:"CONTRIBUTEVALUE"})
	var vipInfo = obj && obj.result || {};
	yield this.html('usercenter/purchase', {
		"title": "购买贡献值",
		"vipInfo": vipInfo,
		"scaleObj":scaleObj&&scaleObj.result
	});
}

//根据用户id查询用户信息
exports.queryUserInfoByUserId = function*(next) {
	var params = this.request.body;
	var obj = yield Base.userService.queryUserInfoByUserId(params);
	if(obj.code == "000000") {
		Base.saveSessionData(this.session, "sessionConstant_userInfo", obj.result);
	}
	Base.getResponseRes(this, obj);
}

//购买贡献值
exports.buyDevote = function*(next) {
	var params = this.request.body;
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var params = {
		"userId": userInfo.userId
	}
	var obj = yield Base.userService.queryUserInfoByUserId(params);
	Base.getResponseRes(this, obj);
}
//购买贡献值
exports.coffeeAccountPay = function*(next){
	var params = this.request.body;
	var obj = yield Base.userService.coffeeAccountPay(params);
	Base.getResponseRes(this,obj);
}
//查询贡献值和金额的比例
exports.queryScalePoint = function*(next){
	var params = this.request.body;
	var obj = yield Base.userService.queryScalePoint(params);
	Base.getResponseRes(this,obj);
}


//群成员列表
exports.communityMember = function*(next) {
	var params = this.request.query;
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var obj = yield Base.userService.communityMember(params);
	var list = obj&&obj.result&&obj.result.page&&obj.result.page.datas || [];
	var vipInfoObj = yield Base.userService.vipInfo({"userId": userInfo.userId});
	var vipInfo = vipInfoObj && vipInfoObj.result || {};
	for(var i=0;i<list.length;i++){
		if(list[i].user.userImg.substr(0, 7) == "http://") {
			list[i]['flag'] = 1;
		}
	}
	yield this.html('usercenter/communityMember', {
		"title": "群成员",
		"list":list,
		"vipInfo":vipInfo
	});
}

//群成员列表分页
exports.communityMemberScroll = function*(next) {
	var params = this.request.body;
	var userInfo = Base.getSessionData(this.session, "sessionConstant_userInfo").user;
	var obj = yield Base.userService.communityMember(params);
	var list = obj&&obj.result&&obj.result.page&&obj.result.page.datas || [];
	var vipInfoObj = yield Base.userService.vipInfo({"userId": userInfo.userId});
	var vipInfo = vipInfoObj && vipInfoObj.result || {};
	for(var i=0;i<list.length;i++){
		if(list[i].user.userImg.substr(0, 7) == "http://") {
			list[i]['flag'] = 1;
		}
	}
	Base.getResponseRes(this,obj);
}
