'use strict'
var sendRequest = require("../../utils/httpClient.js");
var log =require("../../utils/logger.js")("mapService");
var baiduMapConfig = require("../../config/baidu_map_config.js")

var config = {
    urls:{
        searchSearby : "http://api.map.baidu.com/geosearch/v3/nearby",
        locationIP :"http://api.map.baidu.com/location/ip",
        xytoxy:"http://api.map.baidu.com/geoconv/v1/",
        userAddress: 'http://api.map.baidu.com/place/v2/suggestion',
        detailAddress:'http://api.map.baidu.com/geocoder/v2/',
        routeMatrix:'http://api.map.baidu.com/routematrix/v2/walking'
    },
    api:{
        ak:baiduMapConfig.ak||"rrE6DldtGwF2lwBMGDArh9m7lGbakhen"
    }
}

/**
 *
 * {"status":0,"total":4,"size":4,"contents":[{"status":1,"tags":"","telephone":"65251628","uid":1498640288,"shopowner":"刘超","province":"北京市","shop_id":33,"geotable_id":126423,"shop_sn":"B00041","district":"东城区","create_time":1447841606,"owenphone":"15801121640","city":"北京市","train":1,"location":[12960076.279914724,4827327.633423336],"address":"北京市东城区灯市口大街72号29幢10门平房","coffee":0,"title":"灯市口店","coord_type":4,"direction":"西南","type":0,"distance":1828,"weight":0},{"status":1,"tags":"","telephone":"65275120","uid":1498640289,"shopowner":"牛和利","province":"北京市","shop_id":34,"geotable_id":126423,"shop_sn":"B00072","district":"东城区","create_time":1447841606,"owenphone":"15011567857","city":"北京市","train":1,"location":[12960369.420719355,4827916.774791984],"address":"北京市东城区东四南大街17号1层05号","coffee":0,"title":"东四南大街三友店","coord_type":4,"direction":"西南","type":0,"distance":2289,"weight":0},{"status":1,"tags":"","telephone":"87926880","uid":1498640255,"shopowner":"杜乐","province":"北京市","shop_id":7,"geotable_id":126423,"shop_sn":"B00076","district":"东城区","create_time":1447841606,"owenphone":"18210828325","city":"北京市","train":0,"location":[12960838.080874864,4823711.404095232],"address":"北京市东城区崇外大街五号新景家园一区2号楼住宅1层116","coffee":0,"title":"新景家园店","coord_type":4,"direction":"西北","type":0,"distance":2655,"weight":0},{"status":1,"tags":"","telephone":"80440832","uid":1498640364,"shopowner":"夏可梅","province":"北京市","shop_id":107,"geotable_id":126423,"shop_sn":"B00099","district":"东城区","create_time":1447841608,"owenphone":"15101603484","city":"北京市","train":0,"location":[12960872.311990734,4828126.113165726],"address":"北京市东城区朝阳门内大街216号-3","coffee":0,"title":"朝内大街店","coord_type":4,"direction":"西南","type":0,"distance":2686,"weight":0}]}
 *
 * 根据坐标获取一个范围的门店
 * @param {Object} data
 * @param {Object} callback
 */
exports.searchSearby = function *(data){
    var url = config.urls.searchSearby;
    var data = data||{};
    data['page_index'] = 0;
    data['page_size'] = 50;
    data['coord_type'] = 4;
    data['radius'] = 80000;
    data['geotable_id'] = 173484;
    data['scope'] = 2;
    data['sortby'] = 'distance:1';
    data['ak'] = config.api.ak;
    var searchdata = yield sendRequest(data,url,"GET");
    var contents = searchdata&&searchdata.contents||[];
    if(!contents||!contents[0]){
        log.info("根据IP获取门店失败 ====>"+JSON.stringify(searchdata));
        return "";
    }
    return contents;
}


/**
 * {"address":"CN|北京|北京|None|OTHER|0|0","content":{"address_detail":{"province":"北京市","city":"北京市","district":"","street":"","street_number":"","city_code":131},"address":"北京市","point":{"y":"4825907.72","x":"12958160.97"}},"status":0}
 * 定位当前位置
 * @param {Object} data
 * @param {Object} callback
 */
exports.locationIP = function *(data) {
    var url = config.urls.locationIP;
    var data = data||{}
    data['ak'] = config.api.ak;
    var location = yield sendRequest(data,url,"GET");
    var point = location&&location.content&&location.content.point || "";
    if(!point){
        log.info("根据IP获取坐标失败 ====>"+JSON.stringify(location));
        return "";
    }
    return point;
}



/**
 * 坐标转换
 * @param {Object} data  "coords=114.21892734521,29.575429778924&from=1&to=5";
 * @param {Object} callback
 */
exports.getXYToXY= function *(data){
    data['ak'] = config.api.ak;
    var url = config.urls.xytoxy;
    var xydata = yield sendRequest(data,url,"GET");
    var list = xydata.result||[];
    if(!list.length){
        log.info("坐标失败转化失败 ====>"+JSON.stringify(xydata));
        return "";
    }
    var point = list[0]||{};
    return point;
}



/**
 * 检索匹配用户地址
 * @param {Object} data
 * @param {Object} callback
 */
exports.getUserAddress = function *(data){
    //data['region']='全国';
    //data['q']='博瑞大厦';
    var data = data||{};
    data['ak'] = config.api.ak;
    var url = config.urls.userAddress;
    data['output'] = "json";
    var userAddress = yield sendRequest(data,url,"GET");
    return userAddress;
}


/**
 * 根据坐标检索匹配用户详细地址
 * @param {Object} location {}  location：'39.933269,116.469387'  根据经纬度坐标获取地址,pois:0
 * @param {Object} callback
 */
exports.getAddressDetail = function *(data){
    var data = data||{};
    data['coordtype']='bd09ll';
    data['pois'] = "0";
    data['output'] = "json";
    data['ak'] = config.api.ak;
    var url = config.urls.detailAddress;
    var detailAddress = yield sendRequest(data,url,"GET");
    return detailAddress;
}

exports.routeMatrix = function *(data){
	var url = config.urls.routeMatrix;
	data['ak'] = config.api.ak;
	data['output'] = "json";
	var rsdata = yield sendRequest(data,url,"GET");
	return rsdata;
}





