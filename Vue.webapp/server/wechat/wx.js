'use strict'

var log = require("../utils/logger.js")("wx.js");

var Promise = require('bluebird');

var request = Promise.promisify(require("request"));

var Wechat = require("./Wechat.js");

var prefix ="https://api.weixin.qq.com/cgi-bin/";

var api = {
    "userinfo":prefix+"user/info"
}

exports.reply = function*(next){
    var message = this.wxMessage;
    var wego = new Wego();
    if(message.MsgType === "event"){
        if(message.Event === "subscribe"){
            if(message.EventKey){
                log.info('扫二维码进来： '+message.EventKey+'  '+message.ticket);
            }
            this.body = "欢迎来到brunocaffe微空间!";
            wego.loginUserInfo(this,message);
        }else if(message.Event === "unsubscribe"){
            log.info('取消关注成功');
            this.body = '取消关注成功';
        }
    }else{
        if(message.Content ==="walp"||message.Content === ""){
            this.body = '';
            return;
        }
        this.body = '对不起你的回复 '+message.Content+' 太难了 我不知道';
    }
    yield next;
}


function Wego(){
    if(!this.wechat){
        this.wechat = Wechat.getWechat();
    }
}

Wego.prototype.loginUserInfo = function(that,message){
    var _t = this;
    var userinfo = Base.getSessionData(that.session,"sessionConstant_userInfo");
    if(!userinfo){
        this.wechat.getAccessToken().then(function(data){
            var openid = message.FromUserName||"";
            var access_token = JSON.parse(data).access_token;
            var  url = api.userinfo + "?access_token="+access_token+"&openid="+openid+"&lang=zh_CN";
            return new Promise(function(resolve,reject){
                request({url:url,json:true}).then(function(response){
                    var data =  response["body"];
                    log.info("关注后获取用户信息 =====>"+JSON.stringify(data));
                    _t.wechat.loginWchat(data).then(function (userdata) {
                        Base.saveSessionData(that.session,"sessionConstant_userInfo",userdata);
                        log.info("登录成功后返回用户信息 =====>"+JSON.stringify(userdata));
                    });
                });
            });
        });
    }
}






