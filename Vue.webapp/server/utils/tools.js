'use strict'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var chance = require("chance");
var crypto = require("crypto");
var passwordhash = require("password-hash");
var Type = require('type-of-is');
var _ = require('lodash');

moment.locale('zh-cn'); // 使用中文

var secretOptions = {
    algorithm: 'sha256',
    saltLength: 10,
    iterations: 1
}

// 格式化时间
exports.formatDate = function (date, friendly) {
    date = moment(date);
    if (friendly) {
        return date.fromNow();
    }
    else {
        return date.format('YYYY-MM-DD HH:mm:ss');
    }
};

exports.formatBeforeZeroDate = function () {
    return moment().subtract(1, 'days').format("YYYY-MM-DD 00:00:00");
}

exports.formatBeforeEndDate = function () {
    return moment().subtract(1, 'days').format("YYYY-MM-DD 23:59:59");
}

exports.validateId = function (str) {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

exports.generateHash = function (str) {
    return passwordhash.generate(str, secretOptions);
}

exports.verifyHash = function (str, secret) {
    return passwordhash.verify(str, secret);
}

exports.bhash = function (str, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(str, salt, null, callback);
    });
};

exports.bcompare = function (str, hash, callback) {
    bcrypt.compare(str, hash, callback);
};

exports.NewGuid = function () {
    return new chance().guid();
}

//生成验证码
exports.generateVerificationCode = function (num) {
    var codeSource = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    //'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    //'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var codeText = '';
    for (var i = 0; i < num; i++) {
        var random = Number((Math.random() * 35).toFixed(0));
        codeText += codeSource[random];
    }
    return codeText;
}

exports.generateRandomToken = function (callback) {
    crypto.randomBytes(256, function (err, buffer) {
        if (err) return callback(err, null);
        var token = crypto
            .createHash('sha1')
            .update(buffer)
            .digest('hex');

        callback(null, token);
    });
};

exports.extractTokenFromHeader = function (headers) {
    if (headers == null) throw new Error('Header is null');
    if (headers.authorization == null) throw new Error('Authorization header is null');

    var authorization = headers.authorization;
    var authArr = authorization.split(' ');
    if (authArr.length != 2) throw new Error('Authorization header value is not of length 2');

    // retrieve token
    var token = authArr[1];

    //if (token.length != 10) throw new Error('Token length is not the expected one');

    return token;
};

exports.generateNewExpire = function () {
    return moment().add(global.config.TokenSettings.TokenSavePeriod, 'day').utc().format('YYYY-MM-DD HH:mm:ss');
}

exports.generateNewLocal = function () {
    return moment().utc().format('YYYY-MM-DD HH:mm:ss')
}

exports.generatePhoneVerificationCode = function (secret) {
    var hash = crypto.createHash('sha1');
    hash.update(secret, 'utf8');
    var buff = hash.digest();
    var number = buff.readUInt32LE(0);
    var verificationCode = '000000' + number.toString();
    return verificationCode.substring(verificationCode.length - 6, verificationCode.length);
}

exports.selfVerifyCodeAndToken = function (token, code) {

    var hmac, phone, ref, signature, timestamp, zone;

    ref = token.split(':'), zone = ref[0], phone = ref[1], timestamp = ref[2], signature = ref[3];
    if (new Date() > new Date(timestamp * 1000)) {
        return false;
    }
    hmac = crypto.createHmac('sha1', code);
    hmac.update(zone + ":" + phone + ":" + timestamp);
    return signature === hmac.digest('hex');
}

exports.dateToTimestamp = function (date) {
    return (date.getTime() - date.getMilliseconds()) / 1000;
}

exports.timestampToDate = function (timestamp) {
    var date;
    date = new Date(timestamp * 1000);
    if (Number.isNaN(date.getFullYear())) {
        throw 'timestamp cant to date';
    }
    return date;
}

exports.compareAcceptSubArray = function (firstArr, secondArr) {
    var tpArr = [];
    if (Type.is(firstArr, String)) {
        tpArr.push(firstArr);
    }
    else if (Type.is(firstArr, Array)) {
        tpArr = firstArr;
    }
    else {
        return false;
    }

    var tpObjArr = [];

    if (Type.is(secondArr, Object) && _.keys(secondArr).length > 0) {
        for (var i in secondArr) {
            if (secondArr[i] == true)
                tpObjArr.push(i);
        }
    }
    else {
        return true;
    }

    var tpResult = _.intersection(tpArr, tpObjArr);
    if (tpResult.length > 0) {
        return true;
    } else {
        return false;
    }
}

exports.formatMessageTypeArray = function (tpArr) {
    var resultArr = [];
    if (Type.is(tpArr, String)) {
        resultArr.push(tpArr)
    }
    else if (Type.is(tpArr, Array)) {
        resultArr = tpArr;
    }
    return resultArr;
}

exports.formatToDay = function () {
    return day = moment().format("YYYYMMDD");
}

exports.formatYMD = function (date,format) {
	date = moment(date);
    return date.format(format);
}


exports.defaultTheAccept = function (notify) {
    if (!notify.accept) {
        return _.defaults({
            accept: {
                praise: true,
                follow: true,
                comment: true
            }
        }, notify);
    }
    else {
        return notify;
    }
}

exports.adapterPagination = function (req) {
    var pageNum = req.query.pagenum;
    var pageCount = req.query.pagecount;
    var pgOption = {};
    if (pageNum && pageCount) {
        pgOption.skip = (pageNum - 1) * pageCount;
        pgOption.limit = pageCount;
    }

    if (req.query.offset && req.query.limit) {
        pgOption.skip = req.query.offset;
        pgOption.limit = req.query.limit;
    }

    if (req.query.skip && req.query.limit) {
        pgOption.skip = req.query.skip;
        pgOption.limit = req.query.limit;
    }

    if (pgOption.skip == null && pgOption.limit == null) {
        //pgOption.skip = global.config.DEFAULT_DATA_SETTING.skip;
        //pgOption.limit = global.config.DEFAULT_DATA_SETTING.limit;
    }
    return pgOption;
}


/**
 * 字符串替换
 * @param {Object} str
 * @param {Object} sptr
 * @param {Object} sptr1
 */
exports.ReplaceAll = function(str, sptr, sptr1) {
	while(str.indexOf(sptr) >= 0) {
		str = str.replace(sptr, sptr1);
	}
	return str;
}
/**
 * 对象继承方法
 * @return {[type]} [description]
 */
exports.extend = function(){
    var arr = arguments;
    var obj = {};
    var len = arr.length;
    if(len  === 1 ){
        obj = arr[0];
    }else{
        for(var i = 0;i<len;i++){
            obj = _.assign(obj,arr[i])
        }
    }
    return obj;
};
/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
exports.formatCurrency = function(num) {
	num = (num||"").toString().replace(/\$|\,/g, '');
	if(isNaN(num))
		num = "0";
	var sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	var cents = num % 100;
	num = Math.floor(num / 100).toString();
	if(cents < 10)
		cents = "0" + cents;
	for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		num = num.substring(0, num.length - (4 * i + 3)) + ',' +
		num.substring(num.length - (4 * i + 3));
	return(((sign) ? '' : '-') + num + '.' + cents);
};

/**
 * 获取数组下标
 * @param {Array} arr
 * @param {String} itemStr
 */
exports.indexOf = function(arr, itemStr) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] == itemStr) return i;
    }
    return -1;
};
exports.isEmptyObject = function (obj) {   
　　for (var name in obj){
　　　　return false;//返回false，不为空对象
　　}　　
　　return true;//返回true，为空对象
}

exports.formatTime = function(time, num) {
		var yy, mm, dd, hh, min, ss;
		var formatTime = '';
		if(time != '') {
			time = new Date(parseInt(time));
			yy = time.getFullYear();
			mm = (time.getMonth() + 1);
			if(mm + 1 < 10) {
				mm = "0" + mm;
			}
			dd = time.getDate();
			if(dd < 10) {
				dd = "0" + dd;
			}
			hh = time.getHours();
			if(hh < 10) {
				hh = "0" + hh;
			}
			min = time.getMinutes();
			if(min < 10) {
				min = "0" + min;
			}
			ss = time.getSeconds();
			if(ss < 10) {
				ss = "0" + ss;
			}
			switch(num) {
				case 0:
					formatTime = yy + mm + dd + hh + min + ss;
					break;
				case 1:
					formatTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + ss;
					break;
				case 2:
					formatTime = yy + "/" + mm + "/" + dd + " " + hh + ":" + min + ":" + ss;
					break;
				case 3:
					formatTime = yy + "年" + mm + "月" + dd + "日" + hh + "时" + min + "分" + ss + "秒";
					break;
				case 4:
					formatTime = yy + "-" + mm + "-" + dd;
					break;
				case 5:
					formatTime = yy + "_" + mm + "_" + dd + " " + hh + "_" + min + "_" + ss;
					break;
				case 6:
					formatTime = mm + "/" + dd;
					break;
				case 7:
					formatTime = hh + ":" + min + ":" + ss;
					break;
				case 8:
					formatTime = yy + "." + mm + "." + dd;
					break;
				case 9:
					formatTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + min;
					break;
				case 10:
					formatTime = yy + "年" + mm + "月" + dd + "日";
					break;
				case 11:
					formatTime = mm + "月" + dd + "日";
					break;
			}
		}
		return formatTime;
	};

/**
 * 将数值转换为简写数值
 * @param num 原始数值
 * @param omitTheDigits 省略位数（默认值4，以万为单位）
 * @param digit 保留小数点位数（默认值1，保留1位小数）
 * @returns {*} 如：1.5万
 */
exports.numToChCapital = function (num, omitTheDigits, digit) {
	var chArr = ["个", "十", "百", "千", "万", "十万", "百万", "千万", "亿"],
		segmentNum = 0,
		num2 = "";

	num = isNaN(parseFloat(num)) ? 0 : parseFloat(num);
	omitTheDigits = isNaN(parseInt(omitTheDigits)) ? 4 : Math.abs(parseInt(omitTheDigits)) < chArr.length ? Math.abs(parseInt(omitTheDigits)) : chArr.length - 1;
	digit = isNaN(parseInt(digit)) ? 1 : parseInt(digit) > 0 ? parseInt(digit) : -1;

	segmentNum = Math.pow(10, omitTheDigits);

	if (num < segmentNum) {
		return num;
	} else {
		num2 = num / segmentNum + "";
		return (num2.indexOf(".") >= 0 ? num2.substr(0, num2.indexOf(".") + 1 + digit) : num2) + chArr[omitTheDigits];
	}
}
exports.toFixed = function(str,num){
	return str.toFixed(num);
}
