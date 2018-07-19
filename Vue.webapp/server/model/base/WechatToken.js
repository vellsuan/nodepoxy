'use strict'
var mongoose = require('../../utils/db.js');
var Schema = mongoose.Schema;


var WechatTokenSchema = new Schema({
	id:{type: String},
	access_token:{type: String},
	expires_in:{type: String},
})


module.exports = mongoose.model('WechatToken', WechatTokenSchema);