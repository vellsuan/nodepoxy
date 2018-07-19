'use strict'
var mongoose = require('../../utils/db.js');
var Schema = mongoose.Schema;
var config = require('../../config/config.js');

var TokenSchema = new Schema({
    currentToken: {type: String},
    tokenExpires: {type: Date},

    userID: {type: String},
    deviceID: {type: String},
    deviceType: {type: String},
    clientVersion: {type: String},

    ipAddress: {type: String},
    ipsProxy: {type: String},
    userAgent: {type: String},
    
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
});




TokenSchema.index({currentToken: 1}, {unique: true});
TokenSchema.index({userID: 1});
TokenSchema.index({userID: 1, deviceID: 1});
TokenSchema.path("tokenExpires").expires(global.config.TokenSettings.TokenSaveDays);

TokenSchema.statics.toJSON = function(token){
    var tk = {};
    tk.currentToken= token.currentToken;
    tk.tokenExpires=token.tokenExpires;

    tk.userID=token.userID;
    tk.deviceID=token.deviceID;
    tk.deviceType=token.deviceType;
    tk.clientVersion=token.clientVersion;

    tk.ipAddress=token.ipAddress;
    tk.ipsProxy=token.ipsProxy;
    tk.userAgent=token.userAgent;

    tk.create_at=token.create_at;
    tk.update_at=token.update_at;

}

module.exports = mongoose.model('Token', TokenSchema);
