var http = require('http');
var https = require('https');
var httpProxy = require('http-proxy');
var url = require('url');
var express=require('express');
var app = express();

var PROXY_PORT = 8000;
var proxy, server;

// Create a proxy server with custom application logic
proxy = httpProxy.createProxy({});

proxy.on('error', function (err) {
    console.log('ERROR');
    console.log(err);
});
//接口代理其实就是解决同源策略，服务器端没有这个限制，只要保证域名一致其他的资源就随意
server = http.createServer(function (req, res) {
    //var finalUrl = req.url,
    var finalUrl = 'https://www.kancloud.cn';
    var finalAgent = null;
    var parsedUrl = url.parse(finalUrl);

    if (parsedUrl.protocol === 'https:') {
        finalAgent = https.globalAgent;
    } else {
        finalAgent = http.globalAgent;
    }

    proxy.web(req, res, {
        target: finalUrl,
        agent: finalAgent,
        headers: { host: parsedUrl.hostname },
        prependPath: false,
        xfwd : true,
        hostRewrite: finalUrl.host,
        protocolRewrite: parsedUrl.protocol
    });
});
function execute(someFunction, value) {
    someFunction(value);
}


console.log('listening on port ' + PROXY_PORT);
server.listen(PROXY_PORT);