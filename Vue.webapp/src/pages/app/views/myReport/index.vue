<template>

  <div style="height: 100%;width: 100%">
    <div v-if="domdata"></div>
    <div v-else class="register">
      <div class="headtop"></div>
      <div :class="{'reg-topReport':true}">
        <x-header @on-click-back="backFun" v-if="hander"
                  :left-options="{showBack: true,backText: '',preventGoBack:true}">我的报告
        </x-header>
      </div>
      <div class="rep-list" v-if="arr.length">
        <div class="rep-list-report" v-for="item in arr" :key="item.recordNo">
          <my-report :childItem="item" @click.native="gotoPacth(item)"></my-report>
        </div>
      </div>
      <div v-if="templatehide" class="rep-list">
        <div class="rep-list-report">
          <keep-alive>
            <component :is="currentView">
              <!-- 非活动组件将被缓存！ -->
            </component>
          </keep-alive>
        </div>
      </div>
      <div class="healthTips" v-show="tiptxt!=''">
        <div class="tiphend">
          <div class="linePre">
            <div class="onpure">
              <span class="onpure_title" v-text="optitle"></span>
            </div>
            <p class="line"></p>
          </div>
        </div>
        <div class="tipcontent" v-text="tiptxt"></div>
        <div class="reg-topsssReport"></div>
      </div>
    </div>
  </div>

</template>

<script>
	import { XHeader } from 'vux'
	import Report from './Report'
	import MySoltList from "./Soltlist.vue";
	export default {
		components: {
			MySoltList,
			XHeader,
			'my-report': Report,
		},
		data() {
			return {
        templatehide: false,
				currentView: 'my-soltList',
        arr: [],
        appid: '',
        nonceStr: '',
        signature: '',
        timestamp: '',
        recordNo: '',
        userId: '',
        name: "",
        tiptxt: '',
        optitle: "",
        domdata: true,
        hander: true,
        pathurl: '/detailsReport',
        videoUrl: '',
        detailsDataname: '视频报告解读',
        margintop: false
			}
		},
    methods: {
      backFun() {
        window.location.href = "http://app_report_back"
      },
      getvideo(item) {
        let advices = {
          url: "RV000108",
          data: {
            recordNo: item.recordNo
          }
        };
        let _t = this;
        this.api.post(advices, reponse => {

          _t.$store.commit('saveDetails', reponse);
          if (reponse.list.length > 0) {
            //视频接口
            let list = reponse.list[0];

            _t.createTimeStr = list.createTimeStr && list.createTimeStr.slice(0, 10) || '';
            _t.workerName = list.workerName || '';
            //擅长项目
            _t.goodAt = list.workerInfo.goodAt || '';
            //视频跳转

            //视频地址
            _t.videoUrl = list.videoUrl || '';

            /*  if (_t.videoUrl != '') {
                _t.advicesskip = true;
              }*/
            // 医生职称
            _t.workerTitle = list.workerInfo.workerTitle || '';
            //医生头像
            /* this. workerImg=list.workerInfo. workerImg;*/
            //人数统计还没有字段
            // 个人介绍
            //简介
            _t.introduction = list.workerInfo.introduction || '';
            //提交报告编号
            //科室id

          }
          this.pushvideo(item)
        });
      },
      gotoPacth(item) {

        if (!this.hander) {
          this.getvideo(item)

        } else {
          this.$router.push({path: this.pathurl,
            query: {
              name: item.name,
              customerId: item.customerId,
              recordNo: item.recordNo,
              workerName: item.workerName,
              recordDate: item.recordDate
            }
          })
        }

      },
      userParam: function (userparams) {
        userparams = {
          url: '/mdtc/uc/getUserInfo',
          data: {}
        };
        return userparams;
      },
      //用户信息
      usermsg() {
        let _t = this;
        let userparams = null;
        //http://service.fuhua-life.com/index.welcome.html#/
        let path = window.location.href;

        function parseUrl(url) {
          var obj = {};
          var serchUrl = url.split('?');
          var queryArr = serchUrl[1].split("&");
          queryArr.forEach(function (item) {
            let newarr = item.split('=');
            obj[newarr[0]] = newarr[1] || '';
          });
          return obj;
        }

        let result = null;
        if (path.indexOf('?') != -1) {

          //是否有参数有的话app没得话微信
          result = parseUrl(path);
          userparams = {
            url: 'USER0104',
            data: {
              branch: 1005,
              channel: 2,
              userId: result['userId'] || ''
            }
          };
          this.margintop = true;
          if (result['inReport'] == 'inReport') {
            this.pathurl = '/myVideo';
            this.hander = true;
          } else {
            this.pathurl = '/detailsReport';
            this.hander = true;
          }
          // document.getElementById('waiindex').style.display = "none";
        }
        else {

          userparams = this.userParam(userparams);
          this.pathurl = '/detailsReport';
          this.hander = true;

        }

        _t.api.post(userparams, response => {
          //保存用户信息
          let listkey = Object.keys(response);
          for (let item of listkey) {
            if (item == 'entity') {
              response.user = response.entity;
              delete response['entity'];
            }
          }

          _t.$store.commit("saveUser", response && response.user || {});
          window.localStorage.email = response.user.email;

          //验证是否绑定用户信息


          if (response.user && response.user.phone === null || response.user.phone === ''
            || response.user.idNumber === null || response.user.idNumber === ''
            || response.user.customerId === null || response.user.customerId === ''

          ) {

             _t.domdata = true;
            this.$router.push('/register');

          } else {
            _t.domdata = false;
            //查询我的报告
            this.userId = response.user.userId || '';
            let params = {
              url: 'VR000101',
              data: {
                customerId: response.user.customerId || ''
              }

            };
            this.api.post(params, res => {
              //小贴士

              _t.tiptxt = res.tips;
              _t.optitle = '健康小贴士';
              //报告信息处理
              var blob = '';
              _t.arr = res.page && res.page.datas || [];
              for (let i = 0; i < _t.arr.length; i++) {
                blob = new Blob([_t.arr[i].name]);
                if (blob.size > 10) {
                  _t.arr[i].name = '***' + _t.arr[i].name.slice(-4)
                } else {
                  _t.arr[i].name = res && res.userName || ""
                }
              }
              //体检编号
              _t.recordNo = res.page.datas[0].recordNo;
              //姓名
              _t.name = res.page.datas[0].name;
              /* var linkdata = {
                 recordNo: this.recordNo || '',
                 userId: this.userId || '',
                 name: this.name
               };*/
              //微信配置
              /*this.wxcofing(linkdata)*/
            }).then(function (result) {
              if (result.status != 200) {
                _t.templatehide = true;
              }
            }).catch(e => {
              _t.templatehide = true;
            });
          }

        });
      },
      dailog(msg) {
        this.dilog(msg);
      },
      pushvideo(item) {


        //返回host   this.api.healthhost()；
        if (this.videoUrl != '') {
          let videorul = this.api.healthhost() + this.videoUrl;
          this.$router.push({
            path: './myVideo',
            query: {
              id: '',
              recordNo: this.$route.query.recordNo,
              detailsDataname: item.name,
              videorul: videorul
            }
          })
        } else {

          this.dailog('视频不存在')
        }

      },
      //微信配置
      wxcofing(linkdata) {
        let sharData = linkdata;
        let _t = this;
        let url = window.location.href.split('#')[0];
        let wxparams = {
          url: '/mdtc/wx/wxAauthSDK',
          data: {
            url: url
          }
        };

        _t.api.post(wxparams, response => {
          var wxMethod = ["checkJsApi", "closeWindow", "getLocation", "getNetworkType", "onMenuShareTimeline", "onMenuShareAppMessage"];
          this.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.appid + "" || "", // 必填，公众号的唯一标识
            timestamp: response.timestamp + "" || "", // 必填，生成签名的时间戳
            nonceStr: response.nonceStr + "" || '', // 必填，生成签名的随机串
            signature: response.signature + "" || '', // 必填，签名，见附录1
            jsApiList: wxMethod
          });
          this.wx.ready(function () {
            _t.sharlink(sharData);
          });
          this.wx.error(function (res) {

          });


        });
        //
      },
      //微信分享
      wxshar(data, sharData) {

        var _t = this;

        _t.wx.onMenuShareTimeline({
          title: sharData.name + '体检报告', // 分享标题
          link: data.fileUrl, // 分享链接
          success: function () {
            _t.$store.commit('saveshouHideval', false);
            _t.dailog('分享成功');

          },
          cancel: function () {
            _t.$store.commit('saveshouHideval', false);
            _t.dailog('分享失败');

          }
        });
        _t.wx.onMenuShareAppMessage({
          title: sharData.name + '体检报告', // 分享标题
          link: data.fileUrl, // 分享链接
          success: function () {
            _t.$store.commit('saveshouHideval', false);
            _t.dailog('分享成功')

          },
          cancel: function () {
            _t.$store.commit('saveshouHideval', false);
            _t.dailog('分享失败')

          }
        });
      },
      //分享内容
      sharlink(sharData) {
        let _t = this;

        let sharlink = {
          url: 'VR000302',
          data: {
            recordNo: sharData.recordNo,
            userId: sharData.userId
          }
        };
        _t.api.post(sharlink, response => {
          //分享内容
          this.wxshar(response, sharData)
        });
      }
    },
    created() {
      //用户信息
      this.usermsg();
    },
    mounted() {

        document.getElementById('waiindex').style.display = "none";
    }

	}
</script>

<style lang="less">

  .register {
    .headtop {
      width: 100%;
      height: 40px;
      background: #38bdf0;
    }
		height: 100%;
		display: flex;
		flex-direction: column;
		.rep-physical {
			text-align: center;
			font-size: 18PX;
			font-weight: 400;
			color: #A8A8A8
		}
    .healthTips {
      margin: auto;
      margin-bottom: 33px;
      width: 610px;
      text-align: center;
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      color: #747474;
      .onpure_title {
        padding-right: 38px;
        padding-left: 38px;
        /* background: ;*/
        background-color: #f1f1f1;
      }
      .linePre {
        position: relative;
        .onpure {
          position: relative;
          z-index: 2;
        }

        .line {
          position: absolute;
          top: 36px;
          background: #b9b9b9;
          height: 1px;
          width: 302px;
          left: 50%;
          margin-left: -151px;
          -webkit-transform: scaleY(0.25);
          transform: scaleY(0.25);
        }
      }

      .tipcontent {
        line-height: 40px;
      }
    }
    .tiphend {
      line-height: 71px;
    }
	}

  #app .register .vux-header {
		background: none;
	}

  .reg-topReport {
		height: 580px;
    background: url("../../assets/image/bgxintwo.png") no-repeat center;
		background-size: 100%;
	}

  .reg-topsssReport {
    display: none;
    background: url("../../assets/image/danaodaisss.png") no-repeat center;
  }
  .rep-list {

    flex: 1;
		background-color: rgb(241, 241, 241);
		/* & :last-child:after{
        content: '';
        display: block;
        width: 690px;
        height: 50px;
        margin: 0 auto;


      }*/

  }

  .rep-list-report {
		margin-top: -160px;
	}

  .rep-list-report {
		position: relative;
		z-index: 2;
		&:after {
			content: '';
			display: block;
			width: 640px;
			height: 140px;
			position: absolute;
			z-index: -1;
			left: 50px;
			bottom: -46px;
			background: url("../../assets/image/rep-list-bg.png") center no-repeat;
			background-size: 100%;
		}

  }

</style>
