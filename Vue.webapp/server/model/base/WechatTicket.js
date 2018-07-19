'use strict'
var mongoose = require('../../utils/db.js');
var Schema = mongoose.Schema;

var WechatTicketSchema = new Schema({
	id:{type: String},
	errcode:{type: String},
	errmsg:{type: String},
	ticket:{type: String},
	expires_in:{type: String},
});


module.exports = mongoose.model('WechatTicket', WechatTicketSchema);