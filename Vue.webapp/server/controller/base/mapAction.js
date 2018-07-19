'use strict'
var log = require("../../utils/logger.js")("mapAction");
var Base = require('./baseAction.js');


/**
 * 根据坐标获取一个范围的门店
 * @param {Object} data
 */
exports.searchAction = function *(){
    var rsdata = this.request.body;
    var location = rsdata["location"]||"";
    var rstjosn = {"code":"000000","message":"定位异常！"};
    if(!location){
        var ip = Base.getClientIp(this.request);
        var point =  yield Base.mapService.locationIP({"ip":ip});
        if(!point||!point.x){
            rstjosn.message = "获取坐标异常！";
            Base.getResponseRes(this,rstjosn);
            return ;
        }
        location = (point.x + "," + point.y)||"";
    }else{
        var data = {};
        data["coords"] = location;
        data["from"] =  "1";
        data["to"] = "6";
        var  point = yield  Base.mapService.getXYToXY(data);
        if(!point){
            rstjosn.message = "坐标转化失败！";
            Base.getResponseRes(this,rstjosn);
            return;
        }
        location = (point.x + "," + point.y)||"";
    }

    var searbyList =  yield Base.mapService.searchSearby({"location": location});
    if(!searbyList){
        rstjosn.message = "获取门店附近门店异常！";
        Base.getResponseRes(this,rstjosn);
        return ;
    }

    console.log("定位前sessionData门店数据："+JSON.stringify(Base.getSessionData(this.session,"sessionConstant_shopInfo")));
    var shopInfo = Base.getSessionData(this.session,"sessionConstant_shopInfo") || searbyList&&searbyList[0]||{};
	if(shopInfo&&shopInfo.location){
		var data = {};
        data["coords"] = shopInfo.location[0]+","+shopInfo.location[1];
        data["from"] =  "4";
        data["to"] = "5";
        var  point = yield  Base.mapService.getXYToXY(data);
        if(!point){
            rstjosn.message = "坐标转化失败！";
            Base.getResponseRes(this,rstjosn);
            return;
        }
        shopInfo.longitude  = point.x;
        shopInfo.latitude = point.y;
	}
    log.info("当前门店信息 ===>"+JSON.stringify(shopInfo));
    Base.saveSessionData(this.session,"sessionConstant_shopInfoList",searbyList);
    Base.saveSessionData(this.session,"sessionConstant_shopInfo",shopInfo);
    Base.getResponseRes(this,{result:shopInfo});
}


/**
 *坐标转化
 * @param coords：需要转化的坐标串  from 当前类型  to 转换出的类型
 */
exports.getXYToXY = function *() {
    var parms = this.request.body;
    var data = {};
    data["coords"] = parms.coords || "";
    data["from"] = parms.form || "1";
    data["to"] = parms.to ||"6";
    var  point = yield  Base.mapService.getXYToXY(data);
    // var locationXY = (point.x + "," + point.y)||"";
    if(!point){
        var rstjosn = {"code":"222222","message":"坐标转化！"};
        Base.getResponseRes(this,rstjosn);
        return;
    }
    Base.getResponseRes(this,{result:point});
}


/**
 * 获取门店列表
 * @param data
 */
exports.getShopList = function *() {
   var shopInfo = Base.getSessionData(this.session,"sessionConstant_shopInfo");
   if(!shopList.length){
       var rstjosn = {"code":"222222","message":"门店列表获取失败!"};
       Base.getResponseRes(this,rstjosn);
       return
   }
   Base.getResponseRes(this,{result:shopInfo});
}


/**
 * 检索匹配用户地址
 * @param next
 */
exports.getUserAddress = function *(next) {
    var parms = this.request.body||{};
    var userAddress = yield Base.mapService.getUserAddress(parms);
    var list = userAddress.result || [];
    Base.getResponseRes(this,{result:list});
}

/**
 * 根据坐标检索匹配用户详细地址
 * @param next
 */
exports.getAddressDetail = function *(next) {
    var parms = this.request.body||{};
    var detailAddress = yield Base.mapService.getAddressDetail(parms);
    Base.getResponseRes(this,{result:detailAddress});
}


/**
 *计算距离
 * @param next
 */
exports.routeMatrix = function *(next) {
	var parms = this.request.body||{};
    var rsdata = yield Base.mapService.routeMatrix(parms);
    Base.getResponseRes(this,rsdata);
}
