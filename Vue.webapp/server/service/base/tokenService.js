'use strict'

var Token = require("../../model/base/Token.js");
var utils = require("../../utils/utils.js");
var log = require("../../utils/logger.js")("tokenService");
var tools = require("../../utils/tools.js");

exports.verifyToken = function *(headers) {
    if(!headers){
        return null;
    }
    var token = utils.extractTokenFromHeader(headers);
    if (!token){
        return null;
    }
   var tokenInfo = yield Token.findOne({currentToken: token}).lean().exec();
   return tokenInfo;
}

exports.expireToken = function *(token) {
    if (!token) return "";
    var isdata = yield Token.remove({currentToken: token}).exec();
    console.log(isdata)
    var  json = "";
	if (data.result.n == 1 && data.result.ok == 1) {
        json = {statusCode: 0, message: "Logout successful"}
	}else if (data.result.n == 0 && data.result.ok == 1) {
        json =({statusCode: -1,message: "Token has been removed"});
    }
	return json;
}

exports.extendToken = function *(headers) {
    var token = utils.extractTokenFromHeader(headers);
    if (!token) return "";
    var newExpires = tools.generateNewExpire();
    var data = yield Token.findOneAndUpdate({currentToken: token}, {$set: {tokenExpires: newExpires}}).exec();
    if(!data){
    		return "";
    }
    return data;
}

exports.issueToken = function *(user, token) {
    var tk = new Token();
    tk.currentToken = token;
    tk.tokenExpires = tools.generateNewExpire();
    tk.userID = user.linkID;
    tk.ipAddress = req.hostname;
    tk.ipsProxy = req.ips.toString();
    tk.userAgent = req.get('User-Agent');
    //tk.createTime = tools.generateNewLocal();
    var isdata  = yield tk.save();
    console.log(isdata)
    if(!isdata){
    		return "";
    }
    return  {"token": token,"tokenExpires": tk.tokenExpires,"userId": tk.userID,"user":user};

}

exports.checkAndIssueToken = function *(req,user) {
    var deviceID = req.body.deviceID;
    var deviceType = req.body.deviceType;
    var clientVersion = req.body.clientVersion;
    var data =  yield Token.findOne({userID: user.userId, deviceID: deviceID}).exec();
    if (data) {
        log.info("登录时验证或生成token ====>"+JSON.stringify(Token.toJSON(data)));
        var newExpires = tools.generateNewExpire();
        yield Token.update({currentToken: data.currentToken}, {$set: {tokenExpires: newExpires}});
        return {"token": data.currentToken,"tokenExpires": newExpires,"userId": data.userID};
    }
    else {
         var  token = yield utils.generateRandomToken();
         if(!token){
         	return "";
         }
         var tk = new Token();
            tk.currentToken = token;
            tk.tokenExpires = tools.generateNewExpire();
            tk.userID = user.userId;
            tk.deviceID = deviceID;//req.body.deviceID;
            tk.deviceType = deviceType;
            tk.clientVersion = clientVersion;
            tk.ipAddress = req.hostname;
            tk.ipsProxy = req.ips.toString();
            tk.userAgent = req.get('User-Agent');
            //tk.createTime = tools.generateNewLocal();
            var isSave = yield tk.save();

			if(!isSave){
				return "";
			}
        return {"token": token,"tokenExpires": tk.tokenExpires,"userId": tk.userID};
    }
}
