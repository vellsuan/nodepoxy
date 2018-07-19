var utils = require("../utils/utils.js");
var wechatConfig = require("../config/wechat_config.js");
var co = require("co");
var path = require("path");
var Promise = require('bluebird');
var wecahtService =  require("../service/base/wecahtService.js");
var wecht_access_token_file = path.join(__dirname,"wecht_access_token_file.txt");
var wecht_ticket_file = path.join(__dirname,"wecht_ticket_file.txt");
var prefix ="https://api.weixin.qq.com";

var config = {
    wechat:{
	    //测试
        appID:wechatConfig.appID||"wxd5bb187027ae5605",
        AppSecret:wechatConfig.AppSecret||"68091a7af77b83256c207d1d22ce56e8",
        Token:wechatConfig.Token||"1q2w3e4r5t6y",

        getAccessToken:function () {
            return  new Promise(function(resolve,reject){
        			co(wecahtService.getWechatAccessToken(function (data) {
                   resolve(JSON.stringify(data));
           		}));
        		});
            //return utils.readFileAsync(wecht_access_token_file);
        },
        saveAccessToken:function (data) {
        		return  new Promise(function(resolve,reject){
        			var issave = co(wecahtService.saveWechatAccessToken(data))
        			resolve(data);
        		});
        		
//          data = JSON.stringify(data);
            //return utils.writeFileAsync(wecht_access_token_file,data);
        },
        getTicket: function() {
			//return utils.readFileAsync(wecht_ticket_file);
			return  new Promise(function(resolve,reject){
        			co(wecahtService.getWechatTicket(function (data) {
                   resolve(JSON.stringify(data));
           		}));
        		});
			
		},
		saveTicket: function(data) {
			//data = JSON.stringify(data);
			//return utils.writeFileAsync(wecht_ticket_file, data);
			return  new Promise(function(resolve,reject){
        			var issave = co(wecahtService.saveWechatTicket(data))
        			resolve(data);
        		});
		}
    },
    api:{
        redirect_uri: "http://"+wechatConfig.domain+"/index/preIndex",
        authorize : "https://open.weixin.qq.com/connect/oauth2/authorize?response_type=code&scope=snsapi_userinfo",
        accessToken:prefix+"/cgi-bin/token?grant_type=client_credential",
        ticket:prefix+"/cgi-bin/ticket/getticket?type=jsapi",
        webAccessToken:prefix+"/sns/oauth2/access_token?grant_type=authorization_code",
        webUserinfo:prefix+"/sns/userinfo?lang=zh_CN",
        api_set_industry:prefix+"/cgi-bin/template/api_set_industry"
    }
}


module.exports = config;

