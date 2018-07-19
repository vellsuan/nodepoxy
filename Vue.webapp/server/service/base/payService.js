'use strict'

var sendRequest = require("../../utils/httpClient.js");

/**
 * 微信支付
 * @param data
 * @returns {*}
 */
exports.weixinPay= function *(data){
    var obj = yield sendRequest(data || {}, "DE100003", "POST");
    return obj;
}

/**
 * 微信充值
 * @param data
 * @returns {*}
 */
exports.weixinFull= function *(data){
    var obj = yield sendRequest(data || {}, "DE100008", "POST");
    return obj;
}

