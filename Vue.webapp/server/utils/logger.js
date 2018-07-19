'use strict';

var path = require('path');
var env = process.env.NODE_ENV || "development"
var log_path  = '../../logs/';
var log4js = require('log4js');
var logConfig = {
    //设置配置项
    "appenders":[
        {"type": "console"},
        {
            "type": "dateFile",
            "filename":path.join(__dirname, log_path),
            "pattern":"yyyyMMdd.log",
            "absolute":true,
            "alwaysIncludePattern":true
        }
    ]
}

log4js.configure(logConfig);

module.exports = function(modle){
	return log4js.getLogger(__dirname +"/"+ modle);
};


