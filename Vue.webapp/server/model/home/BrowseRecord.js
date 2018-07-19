'use strict'
var mongoose = require('../../utils/db.js');
var Schema = mongoose.Schema;
//记录浏览记录
var BrowseRecordSchema = new Schema({
	pid:{type: String},//商品ID
	type:{type:String},//浏览类型
	uip:{type: String},//用户浏览ip地址
	bnum:{type: String},//浏览次数
	rurl:{type: String}//浏览地址
});


module.exports = mongoose.model('BrowseRecord', BrowseRecordSchema);