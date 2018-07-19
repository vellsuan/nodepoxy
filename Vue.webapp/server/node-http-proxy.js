var http = require('http'),
    url = require("url"),
    httpProxy = require('http-proxy');
var config = require('./config/config.js');

// 新建一个代理 Proxy Server 对象
var proxy = httpProxy.createProxyServer({});
// 捕获异常
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end("系统异常");
});

// 另外新建一个 HTTP 9105 端口的服务器，也就是常规 Node 创建 HTTP 服务器的方法。
// 在每次请求中，调用 proxy.web(req, res config) 方法进行请求分发Create your custom server and just call `proxy.web()` to proxy

var server = http.createServer(function(req, res) {
    var host = req.url;
  console.log(host);
    if(host.indexOf("/mdtc/")!=-1){
        proxy.web(req, res, { target: 'http://127.0.0.1:10110' });
    }else{
      proxy.web(req, res, {target: 'http://127.0.0.1:8081'});
    }
});

console.log("listening on port 9228");
server.listen(9228);

setTimeout(function(){
	require("./server.js");
},100);
