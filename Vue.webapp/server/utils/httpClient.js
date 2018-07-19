'use strict'

var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var qs = require('querystring');
var logger =require("./logger.js")("httpClient");
var config = require('../config/config.js');
var mock  = "../../mock/";

var sendRequest = function(data,model,methods){
    var requestData = null;
    if(config.ServiceDemo && model.indexOf("http")==-1){
        requestData =  demoRequest(data,model);
    }else{
        requestData =  serverRequest(data,model,methods);
    }
    return requestData;
}


function getDemoRequesrUrl(model){
    var  url = "";
    if(model.indexOf("/org/business/") == -1){
        url = mock+model+".json";
    }else{
        //"/org/business/abc.do";
        var str =model.split("/")[3]||[];
        str  = str.substr(0,str.indexOf(".do"));
        url = str&&mock+str+".json"||"";
    }
    return url
}

function demoRequest(data,model){
    logger.info("demo接口地址[ "+model+" ]请求数据 ===>"+JSON.stringify(data));
    var demoUrl =getDemoRequesrUrl(model);
    return new Promise(function(resolve, reject){
        try{
            var jsondata  = require(demoUrl);
            logger.info("demo接口地址[ "+model+" ]返回数据 ===>"+JSON.stringify(jsondata));
            resolve(jsondata)
        }catch(err){
            logger.info("demo接口地址[ "+model+" ]请求异常  ===>"+JSON.stringify(err));
            reject(err);
        }
    });
}


function getServerRequesrUrl(model){
    var url = "";
    if(model.indexOf("http")==-1){
        if(config.MockUser){
            url = config.USER_SERVER_URI_DEMO+model;
        }else{
            if(model.indexOf("/org/business/") == -1){
                url = config.httpServerURL+"/org/business/"+model+".do";
            }else{
                url = config.httpServerURL+model;
            }
        }
    }else {
        url = model;
    }
    return url||"";
}


function serverRequest(data,model,methods){
    var model = getServerRequesrUrl(model)
	var options = {
		url: model,
		method:methods ||"POST",
		json:true,
		headers: {
	        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	        "merchantNo": "000006",
	        "signType": "MD5",
	        'developToken':'000006',
	        'tokenPassword': '1qaz2wsx'
	    }
	}

    data["channelNo"] =  "1000001";
    data["branch"] ="1005";
    data["channel"] =  "2";
	if(options.method==="POST"){
		options.form=data;
	}else{
		var content = qs.stringify(data);
		options.url+="?"+content;
	}
    logger.info("接口地址[ "+model+" ]请求数据 ===>"+JSON.stringify(options));
    return new Promise(function(resolve, reject){
        request(options).then(function(dataHandler){
            	var data = "";
        		try{
        			data = dataHandler&&dataHandler["body"]||dataHandler[1]||null;
        		}catch(e){
        			data = dataHandler;
                    logger.info("接口地址[ "+model+" ]返回数据解析异常 ===>"+JSON.stringify(data));
        		}
        		if(data){
                    logger.info("接口地址[ "+model+" ]返回数据 ===>"+JSON.stringify(data));
        			resolve(data);
        		}else{
        			logger.info("接口地址[ "+model+" ]未返回 ===>"+JSON.stringify(data));
        			reject(data);
        		}
        }).catch(function(err){
                logger.info("接口地址[ "+model+" ]请求异常  ===>"+JSON.stringify(err));
        		reject(err);
        });
    })
};





module.exports = sendRequest;