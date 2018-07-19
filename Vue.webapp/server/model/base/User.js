var mongoose = require('../../utils/db.js');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userId: {type: String},
    phone: {type: String},
    email: {type: String},
    loginPwd: {type: String},
    payPwd: {type: String},
    unionid: {type: String},
    weibouid: {type: String},
    pcqquid: {type: String},
    qquid: {type: String},
    alipayuid: {type: String},
    uuid: {type: String},
    registerTime: {type: Date, default: Date.now},
    status: {type: String},
    channel: {type: String},
    registerTimeStr: {type: String},
    userInfoId: {type: String},
    userName: {type: String},
    nickName: {type: String},
    userImg: {type: String},
    sex: {type: String},
    birthday: {type: String},
    address: {type: String},
    district: {type: String},
    districtCode: {type: String},
    loginNum: {type: String},
    credits: {type: String},
    loginTime: {type: String},
    loginIp: {type: String},
    loginTimeStr: {type: Date, default: Date.now},
    tel: {type: String},
    idType:{type: String},
    idCard:{type: String}
});

UserSchema.index({userId: 1, phone: 1});
module.exports = mongoose.model('User', UserSchema);
