'use strict'

var fs = require("fs")
var Promise = require('bluebird');
var xml2js = require('xml2js');
var crypto = require('crypto');
var sha1 = require('sha1');

var replyTpl = require('./../wechat/tpl.js');


/**
 * 读取文件
 * @param {Object} fpath
 * @param {Object} encoding
 */
exports.readFileAsync = function(fpath,encoding){
	return new Promise(function(resolve,reject){
        fs.readFile(fpath,encoding||"utf-8",function(err,content){
            if(err) {
                reject(err);
            }else {
                resolve(content)
            }
        })
    });
}

/**
 * 保存文件
 * @param {Object} fpath
 * @param {Object} content
 */
exports.writeFileAsync = function(fpath,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(fpath,content,function(err,content){
            if(err) {
                reject(err);
            }else {
                resolve(content)
            }
        })
    });
}
/**解析xml
 * 
 * @param {Object} xml
 */
exports.parseXMLAsync = function (xml) {
    return new Promise(function (resolve,reject) {
        xml2js.parseString(xml,{trim:true},function(err,content){
            if(err){
                reject(err);
            }else{
                resolve(content)
            }
        });
    });
}

/**
 * 序列化json数据
 * @param {Object} result
 */
function formatMessage(result){
    var  message = {};
    if(typeof result === 'object'){
        var keys = Object.keys(result);
        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            var item = result[key];
            if(!(item instanceof Array) || item.length === 0){
                continue;
            }
            if(item.length === 1){
                var val = item[0];
                if(typeof val === 'object'){
                    message[key] = formatMessage(val);
                }else{
                    message[key] = (val||'').trim();
                }
            }else{
                message[key] = [];
                for(var j = 0, k = item.length; j < k; j++){
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }

    return message;
}
exports.formatMessage = formatMessage;


exports.dataToXML = function(content,message){
    var info = {};
    var type = "text";


    var fromUserName = message.FromUserName;
    var toUserName = message.ToUserName;
    if(Array.isArray(content)){
        type = "news"
    }else{
        type = content.type||type;
    }
    info.content = content;
    info.createTime = new Date().getTime();
    info.msgType = type;
    info.toUserName = fromUserName;
    info.fromUserName  = toUserName;
    
    return replyTpl.compile(info);
}

/**
 * 生成token
 * @param {Object} data
 */
exports.generateRandomToken = function (data) {
	return new Promise(function (resolve,reject) {
		crypto.randomBytes(256, function (err, buffer) {
            if (err) {
                    reject(err);
            }else {
                var token = crypto.createHash('sha1').update(buffer).digest('hex');
                resolve(token);
            }
	    });
	});
}


/**
 * 取header 中的token
 * @param headers
 * @returns {*}
 */
exports.extractTokenFromHeader = function(cookies){
	if (cookies == null) {
	    return null
    }
    if (cookies.get("authorization") == null){
        return null
    }
    var authorization = cookies.get("authorization");
    var authArr = authorization.split(' ');
    if (authArr.length != 1) throw new Error('Authorization header value is not of length 2');

    var token = authArr[0];
    return token;
}


/**
 *生成随机字符串
 * @returns {string}
 */
exports.createNonceStr = function () {
    return Math.random().toString(36).substr(2, 15);
}


/**
 *生成时间戳
 * @returns {string}
 */
exports.createTimestamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
}

/**
 * 解码
 * @param {Object} data 需要解码的数组或者字段
 * @param {Object} name 取数组中要解码的字段名称
 */
exports.decodeURIComponent = function (data,name) {
    let [a,b] = [[],''];
    if(typeof(data) == "string"){
    	    return decodeURIComponent(data);
    }else{
	    	for(var i = 0; i<data.length; i++){
	    		a.push(decodeURIComponent(data[i][name]));
	    	}
	    	return a;
    }
}

	

