'use strict'
var log = require("../utils/logger.js")("Wechat");
var Promise = require('bluebird');
var path = require("path");
var utils = require("../utils/utils.js");
var config = require("./config.js");
var request = Promise.promisify(require("request"));

var co = require("co");
var wecahtService =  require("../service/base/wecahtService.js");

function Wechat(){
    var appID = config.wechat.appID;
    var AppSecret = config.wechat.AppSecret;
    this.getAccessToken = config.wechat.getAccessToken;
    this.saveAccessToken = config.wechat.saveAccessToken;
    this.getTicket = config.wechat.getTicket;
    this.saveTicket = config.wechat.saveTicket;
    this.fetchAccessToken();
}

Wechat.prototype.fetchAccessToken = function(){
    var _t = this;
    if(this.access_token && this.expires_in){
        if(this.isValidAccessToken(this)){
            return Promise.resolve(this);
        }
    }
    this.getAccessToken().then(function(data){
        try{
            data = data&&JSON.parse(data);
        }catch(e){
            return _t.updateAccessToken();
        }
        if(_t.isValidAccessToken(data)){
            return Promise.resolve(data);
        }else{
            return _t.updateAccessToken();
        }
    }).then(function (data) {
        _t.access_token = data.access_token;
        _t.expires_in =data.expires_in;
        _t.saveAccessToken(data);
        return Promise.resolve(data)
    });
}

/**
 *更新access_token
 *@returns {boolean}
 */
Wechat.prototype.updateAccessToken = function () {
    var appID = config.wechat.appID;
    var AppSecret = config.wechat.AppSecret;
    var url = config.api.accessToken + "&appid="+ appID +"&secret="+ AppSecret;
    log.info("获取access_token请求参数 ====>"+url);
    var _t = this;
    return new Promise(function(resolve,reject){
        request({url:url,json:true}).then(function(response){
            var data =  response["body"];
            log.info("获取access_token成功 ====>"+JSON.stringify(data));
            var now = new Date().getTime();
            var expires_in = now + (Number(data.expires_in)-20)*1000;
            data.expires_in = expires_in;
            _t.updateTicket(data.access_token).then(function (tdata) {
                _t.saveTicket(tdata);
            });
            resolve(data)
        })
    });
}

/**
 * 验证access_token
 * @param data
 * @returns {boolean}
 */
Wechat.prototype.isValidAccessToken = function (data) {
    if(!data||!data.access_token||!data.expires_in){
        return false;
    }
    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = new Date().getTime();
    if(now < expires_in){
        return  true;
    }else{
        return  false;
    }
}

/**
 * 获取 Ticket 权限
 * @param accessToken
 */
Wechat.prototype.updateTicket = function (accessToken) {
    var url = config.api.ticket + "&access_token="+accessToken;
    log.info("获取 Ticket 请求参数 ====>"+url);
    return new Promise(function(resolve,reject){
        request({url:url,json:true}).then(function(response){
            var data =  response["body"];
            log.info("获取 Ticket 成功 ====>"+JSON.stringify(data));
            resolve(data)
        })
    });
}


Wechat.prototype.reply = function(){
    var content = this.body;
    var message = this.wxMessage;
    var xml = utils.dataToXML(content,message);
    this.status = 200;
    this.type = "application/xml";
    this.body = xml;
}


Wechat.prototype.getWebAccessToken = function(code){
    var _t = this;
    var appID = config.wechat.appID;
    var AppSecret = config.wechat.AppSecret;
    var url = config.api.webAccessToken + "&appid="+ appID +"&secret="+ AppSecret+"&code="+code;
    log.info("获取web_access_token请求参数 ====>"+url);
    return new Promise(function(resolve,reject){
        request({url:url,json:true}).then(function(response){
            var data =  response["body"];
            log.info("通过code获取web_access_token成功 ====>"+JSON.stringify(data));
            resolve(data)
        });
    });
}

Wechat.prototype.getWebUserInfo= function(code){
    var _t = this;
    var AppSecret = config.wechat.AppSecret;
    return new Promise(function(resolve,reject){
        _t.getWebAccessToken(code).then(function(data){
            var accessToken = data.access_token;
            var openid = data.openid;
            var url = config.api.webUserinfo + "&access_token="+ accessToken +"&openid="+openid;
            log.info("获取微信用户信息请求参数 ====>"+url);
            request({url:url,json:true}).then(function(response){
                var data =  response["body"];
                log.info("通过微信用户信息成功 ====>"+JSON.stringify(data));
                resolve(data)
            }).catch(function(err){
                log.info("通过微信用户信息异常 ====>"+JSON.stringify(err));
                reject(err);
            });
        });
    });
}

Wechat.prototype.loginWchat= function(userinfo){
    return new Promise(function(resolve,reject){
        var url = "http://tuxizhao.ittun.com/wx/wxLogin";
        var data = {"nickName":userinfo.nickname||"",
            "sex":userinfo.sex,"unionid":userinfo.openid,"userImg":userinfo.headimgurl,"channel":"1"};
        var opt = {url:url,json:true,method:"POST"};
        opt.form = data;
        log.info("微信用户登录请求数据 ====>"+JSON.stringify(opt));
        request(opt).then(function(response){
            var data =  response["body"];
            log.info("微信用户登录成功 ====>"+JSON.stringify(data));
            resolve(data)
        }).catch(function(err){
            log.info("微信用户登录异常 ====>"+JSON.stringify(err));
            reject(err);
        });
    });
}


exports.getWechat =function(){
//  if(!this.wechat){
//      this.wechat = new Wechat();
//  }
    return new Wechat();
};

