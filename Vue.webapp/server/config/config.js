
var config = {
   	ServiceDemo:false,  //true demo数据，false  服务器数据
   	ServiceUserDemo: true, //是否使用本地用户数据
  httpServerURL: "http://1.119.140.102:8117", //服务器地址
  /*httpServerURL: "http://192.168.72.121:8002", //服务器地址*/
    USER_SERVER_URI_DEMO : "http://117.78.40.253:8981/mockjsdata/13/",

    MockUser:false,
    MongoSettings: {
      // mongodb: "mongodb://192.168.75.211:27017/mmmm_webapp",
      mongodb: "mongodb://127.0.0.1:27017/",
        options: {}
    },
    TokenSettings: {
        TokenSaveDays: '90d',
        TokenSavePeriod: 90
    },

    ServerPath:{
    		StaticPath:"",
    		PagePath:"/mdtc",
    		ApiPath:"/mdtc",
        ServerImgURL:"http://117.78.35.162:8877/",  //图片地址
        ShopPagePath:"/shop",//电商页面路由
        ChatServerURL:"http://117.78.35.162:8190/",//聊天服务器
        DoMain:""//App域名
    }
};

global.config = config;
module.exports = config;
