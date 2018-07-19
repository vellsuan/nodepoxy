'use strict'
var koa = require('koa');
var path = require('path');
var logger = require('koa-logger');
var serve = require('koa-static');
var router = require('koa-router')();
var onerror = require('koa-onerror');
var gzip = require('koa-gzip');
var bodyParser = require('koa-bodyparser');
var cors = require('koa-cors'); 

var session = require('koa-generic-session');
var mongoose = require('./utils/db.js');
var MongooseStore = require('koa-session-mongoose');


var log =require("./utils/logger.js")("server");
var app = koa();
app.keys = ['MTDC secret wechat'];

app.env = process.env.NODE_ENV || 'development';
var port = normalizePort(process.env.PORT || '10110');
require("./middleware/error.js")(app);
require("./middleware/render.js")(app);
require("./controller/base/page_router.js")(router);
require("./controller/base/router.js")(router);

app
	.use(gzip())
//	.use(serve(path.join(__dirname, '../dist')))
    .use(bodyParser())
    .use(session({
        store: new MongooseStore({
            collection: 'bestin.ccfa@shop.webapp',
            expires: 1000*60 * 60 * 24
        })
    }))
    .use(cors())
	.use(router.routes())
	.use(router.allowedMethods())
    .use(logger());

app.listen(port, function() {
	log.info('Listening on port : ' + port + " with the node_env " + app.env);
});

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
module.exports = app;
