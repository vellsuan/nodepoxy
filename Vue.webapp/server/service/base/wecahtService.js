
var sendRequest = require("../../utils/httpClient.js");
var log = require("../../utils/logger.js")("wecahtService");
var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var WechatToken = require("../../model/base/WechatToken.js");
var WechatTicket = require("../../model/base/WechatTicket.js");

var wechatConfig = require("../../wechat/config.js").wechat;

/**
 * 设置行业
 */
exports.setIndustry = function *(data,url){
    log.info("获取 Ticket 请求参数 ====>"+url);
    return new Promise(function(resolve,reject){
        request({url:url,json:true,method:"POST",form:data}).then(function(response){
            var rsdata =  response["body"];
            log.info("通过code获取web_access_token成功 ====>"+JSON.stringify(rsdata));
            resolve(rsdata)
        });
    });
}


//获取微信token信息
exports.getWechatAccessToken = function *(callback){
    var token = yield WechatToken.findOne({"id":wechatConfig.appID}).exec();
    if(!token){
        callback&&callback("");
    }
    callback&&callback( {"access_token":token.access_token,"expires_in":token.expires_in})
}



//保存微信token信息
// exports.saveWechatAccessToken = function *(data){
// 	var token = new  WechatToken();
// 	token.id = "wechat_token_id";
// 	token.access_token = data.access_token||"";
// 	token.expires_in = data.expires_in||"";
//     return yield token.save();
// }


//保存微信token信息
exports.saveWechatAccessToken = function *(data){
    var token = new  WechatToken();
    token.id = wechatConfig.appID;
    token.access_token = data.access_token||"";
    token.expires_in = data.expires_in||"";
    var otoken = yield WechatToken.findOne({"id":token.id}).exec();
    if(otoken){
        yield  WechatToken.findOneAndUpdate({id: token.id },{$set:{"access_token":token.access_token,"expires_in":token.expires_in}}).exec();
    }else{
        yield token.save();
    }
    return token;
}


//获取微信Ticket信息
exports.getWechatTicket = function *(callback){
	var ticket = yield WechatTicket.findOne({"id":wechatConfig.appID}).exec();
	if(!ticket){
        callback&&callback("");
	}
    callback&&callback( {"ticket":ticket.ticket,"expires_in":ticket.expires_in})
}

//保存微信Ticket信息
exports.saveWechatTicket = function *(data){
    var ticket = new  WechatTicket();
    ticket.id = wechatConfig.appID;
    ticket.errcode = data.errcode||"";
    ticket.errmsg = data.errmsg||"";
    ticket.ticket = data.ticket||"";
    ticket.expires_in = data.expires_in||"";
    var otoken = yield WechatTicket.findOne({"id":ticket.id}).exec();
    if(otoken){
        yield  WechatTicket.findOneAndUpdate({id: ticket.id },{$set:{"ticket":ticket.ticket,"expires_in":ticket.expires_in}}).exec();
    }else{
        yield ticket.save();
    }
    return ticket;
}


