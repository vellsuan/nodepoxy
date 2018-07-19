<script src="../../../../../nuxt-bnhcp-master/server/index.js"></script>
<template>
  <div>
    <div class="fxbg" v-if="fxbg" @click="fxbghide">
      <img :src="fxbgsrc" alt="">
    </div>

    <div v-else class='det-father'>
      <div class="headtop"></div>
      <x-header :left-options="{showBack: true,backText: ''}" :right-options="{showMore: false}">报告详情
        <div @click.stop="shouHide" slot="right" class="shouwRight">
          <div class="xiazai" alt=""></div>
        </div>
      </x-header>
      <hend-right>
      </hend-right>
      <div class="det-bg">

        <div class="dte-bg-name">
          <router-link class="ruterWidth" :to="{path:'./email'}" v-text="detailsDataname">
          </router-link>
        </div>

        <div class="det-man-parent">
          <div class="det-bg-manleft">

            <div class="det-bg-manitem det-man-fonttop">

              <img v-if="Number(listSix[0].isYang)" src="../../assets/image/list_bg1.png">
              <img v-else="" src="../../assets/image/list_bg2.png">
              <div class="det-colo-line"></div>
              <div class="det-man-font" v-if="listSix.length==0">
                <p class="det-man-fontfirst">
                <p class="det-man-fontfirst">426微弱mol</p>
                <p>426微弱mol</p>
              </div>
              <div class="det-man-font" v-else>
                <p class="det-man-fontfirst">
                  <span>{{listSix[0].examDetail}}</span>kg/<span>{{listSix[0].unit}}m</span></p>
                <p>{{listSix[0].itemName}}</p>
              </div>
            </div>
            <div class="det-bg-manitem">
              <img v-if="Number(listSix[1].isYang)" src="../../assets/image/list_bg1.png">
              <img v-else="" src="../../assets/image/list_bg2.png">
              <div class="det-man-font" v-if="listSix.length==0">
                <p class="det-man-fontfirst">
                <p class="det-man-fontfirst">426微弱mol</p>
                <p>426微弱mol</p>
              </div>
              <div class="det-man-font" v-else>
                <p class="det-man-fontfirst">
                  <span>{{listSix[1].examDetail}}</span>kg/<span>{{listSix[1].unit}}m</span></p>
                <p>{{listSix[1].itemName}}</p>
              </div>
            </div>
            <div class="det-bg-manitem">

              <img v-if="Number(listSix[2].isYang)" src="../../assets/image/list_bg1.png">
              <img v-else="" src="../../assets/image/list_bg2.png">
              <div class="det-man-font" v-if="listSix.length==0">
                <p class="det-man-fontfirst">
                <p class="det-man-fontfirst">426微弱mol</p>
                <p>426微弱mol</p>
              </div>
              <div class="det-man-font" v-else>
                <p class="det-man-fontfirst">
                  <span>{{listSix[2].examDetail}}</span>kg/<span>{{listSix[2].unit}}m</span></p>
                <p>{{listSix[2].itemName}}</p>
              </div>
            </div>
          </div>
          <div class="det-bg-man">
          </div>
          <div class="det-bg-manright">
            <div class="det-bg-manitem det-man-fonttop">
              <img v-if="Number(listSix[3].isYang)" src="../../assets/image/list_bg1.png">
              <img v-else="" src="../../assets/image/list_bg2.png">
              <div class="det-colo-rightline"></div>
              <div class="det-man-font" v-if="listSix.length==0">
                <p class="det-man-fontfirst">
                <p class="det-man-fontfirst">426微弱mol</p>
                <p>426微弱mol</p>
              </div>
              <div class="det-man-font" v-else>
                <p class="det-man-fontfirst">
                  <span>{{listSix[3].examDetail}}</span>kg/<span>{{listSix[3].unit}}m</span></p>
                <p>{{listSix[3].itemName}}</p>
              </div>
            </div>
            <div class="det-bg-manitem">
              <img v-if="Number(listSix[4].isYang)" src="../../assets/image/list_bg1.png">
              <img v-else="" src="../../assets/image/list_bg2.png">
              <div class="det-man-font" v-if="listSix.length==0">
                <p class="det-man-fontfirst">
                <p class="det-man-fontfirst">426微弱mol</p>
                <p>426微弱mol</p>
              </div>
              <div class="det-man-font" v-else>
                <p class="det-man-fontfirst">
                  <span>{{listSix[4].examDetail}}</span>kg/<span>{{listSix[4].unit}}m</span></p>
                <p>{{listSix[4].itemName}}</p>
              </div>
            </div>
            <div class="det-bg-manitem">
              <img v-if="Number(listSix[5].isYang)" src="../../assets/image/list_bg1.png">
              <img v-else="" src="../../assets/image/list_bg2.png">
              <div class="det-man-font" v-if="listSix.length==0">
                <p class="det-man-fontfirst">
                <p class="det-man-fontfirst">426微弱mol</p>
                <p>426微弱mol</p>
              </div>
              <div class="det-man-font" v-else>
                <p class="det-man-fontfirst">
                  <span>{{listSix[5].examDetail}}</span>kg/<span>{{listSix[5].unit}}m</span></p>
                <p>{{listSix[5].itemName}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="det-music">
          <div class="det-bg-music" @click="pushvideo">

            <div class="det-bg-cleco">

              <div class="det-bg-clecoChend" :style="{backgroundImage: 'url(' + workerImg + ')' }">
                <img src="../../assets/image/det-video-play.png" alt="图片加载失败">
              </div>

            </div>


            <div class="det-font">
              <div class="det-font-item"><span v-text="workerName">李师师</span><span class="det-font-itemspan">医师</span>
              </div>
              <div class="det-font-item det-font-itemcenter">视频报告详解</div>
              <div class="det-font-item"><span v-text="createTimeStr"></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="det-list">
        <div class="det-list-top">
          <cell :class="{ 'det-cone-one': isActive,'det-cone-style':Summary}" :title="('异常结果汇总')" is-link :link="{path:'./summaryReport',query: {recordNo:$route.query.recordNo}}" :border-intent="false">
            <p slot="title" class="titleFs">异常结果汇总</p>
            <slot><span class="det-solt-color"><span v-text="checksum"></span>项检查总和</span>
            </slot>
          </cell>
          <template v-if="showContent001">
            <cell-box :class="{ 'det-cone-one': isActive }" :border-intent="false" class="sub-item">

            </cell-box>
          </template>
          <cell :class="{ 'det-cone-one': isActive,'det-proposal-style':Summary}" :title="('专家指导意见')" is-link
                :border-intent="false" :arrow-direction="showContent002 ? 'up' : 'down'"
                @click.native="showContent002 = !showContent002">
            <p slot="title" class="titleFs">专家指导意见</p>
          </cell>
          <template v-if="showContent002">
            <cell-box :class="{ 'det-cone-one': isActive }" :border-intent="false" class="sub-item">
              <slot>

                <div class="det-linhight">
                  <pre><code v-text="adviceExpert"></code></pre>
                </div>


              </slot>
            </cell-box>
          </template>
        </div>
        <div class="det-testing">
          <div class="det-testing-chiede">您全部检测</div>
        </div>
        <div class="det-list-footer">
          <group>
            <slot v-if="templatehide">数据未加载</slot>

            <cell v-for="(item,index) in listData" :key='index' v-else
                  :link="{path:item.ruterpath,query: {sectionName:item.sectionName,recordNo:item.recordNo || '',deptId:item.deptId || '', groupSingleCode: item.groupSingleCode || '',groupId:item.groupId || ''}}"
                  :class="{ 'det-cone-one': isActive,'det-cone-list':Summary}" :title="item.sectionName" is-link
                  :border-intent="false">
              <p slot="title" class="titleFs" v-text="item.sectionName"></p>
              <img slot="icon" width="18" v-if="item.abnormalNum!=0" style="display:block;margin-right:5px;"
                   src="../../assets/image/list_bg3.png">
              <img slot="icon" width="18" v-else style="display:block;margin-right:5px;"
                   src="../../assets/image/bg-52_03.jpg">
              <slot>
                <div class="det-solt-color">
                  <div></div>
                  <div v-if="item.abnormalNum==0">
                  </div>
                  <div v-else>
                    <span v-text="item.abnormalNum"></span>项异常检测
                  </div>
                </div>
              </slot>
            </cell>
          </group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { XHeader, Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
  //VR000203.do 总数  VR000101.do
  import HendRight from "./hendRight.vue";

  var bgurl = '/static/img/detailed_R_bg2.727af79.png';
  export default {

    mounted: function() {

      let _t = this;

      //判断机形
      if (!this.bus.phone) {
        this.fxbgsrc = require('../../assets/image/cofficeappel.png')
      }
      //公共数据
      //监控子组件的数据
      _t.bus.$on('selected', function (result) {
        _t.fxbg = result;
      });

      if(this.$route.query.name !== '') {
        this.detailsDataname = this.$route.query.name;
      }

      if(this.$route.query.recordNo !== "undefined") {
        //保存recordNo
        this.$store.commit('saveRecNo', this.$route.query.recordNo);
        this.recordNo = this.$route.query.recordNo || "";
        /*	this.workerName = this.$route.query.workerName || "";*/
        this.recordDate = this.$route.query.recordDate || "";
        this.customerId = this.$route.query.customerId || "";
        //总数
        let advices = {
          url: "RV000108",
          data: {
            recordNo: this.recordNo
          }
        };

        this.api.post(advices, reponse => {

          _t.$store.commit('saveDetails', reponse);
          if (reponse.list.length > 0) {
            //视频接口
            let list = reponse.list[0];

            _t.createTimeStr = list.createTimeStr && list.createTimeStr.slice(0, 10) || '';
            _t.workerName = list.workerName || '';

            //擅长项目
            console.log(list);
            _t.goodAt = list.workerInfo && list.workerInfo.goodAt || '';
            //视频跳转

            //视频地址
            _t.videoUrl = list.videoUrl || '';

            console.log(_t.videoUrl);
            /*  if (_t.videoUrl != '') {
                _t.advicesskip = true;
              }*/
            // 医生职称
            _t.workerTitle = list.workerInfo.workerTitle || '';
            //医生头像
            _t.workerImg = this.api.healthhost() + list.workerInfo.workerImg || _t.workerImg;

            //人数统计还没有字段
            // 个人介绍
            //简介
            _t.introduction = list.workerInfo.introduction || '';
            //提交报告编号
            //科室id
          }
        });

        this.awaici();

        //
        /*   let paramsone = {
                     url: "VR000101",
                     data: {
                       customerId: this.customerId,
                     }
                   };
                   this.api.post(paramsone, reponse => {
                    /!* _t.checksum = reponse.num;*!/
                   });*/
        //六项
        let listSixData = {
          url: "VR000206",
          data: {
            recordNo: this.recordNo,
          }
        };
        this.api.post(listSixData, reponse => {
          //六项处理
          if(reponse.list.length > 0) {
            for(let i = 0; i < reponse.list.length; i++) {
              if(reponse && reponse.list[i] === null || reponse && reponse.list[i] === '') {
                reponse.list.splice(i, 1, {
                  examDetail: 0,
                  itemName: 0,
                  unit: 0,
                  isYang: 0
                })
              }
            }
            _t.listSix = reponse.list

          }
        });
        //检查列表
        let list = {
          url: "VR000202",
          data: {
            recordNo: this.recordNo,
            deptId: this.deptId,
            customerId: this.customerId,
          }
        };
        this.api.post(list, reponse => {

          _t.listData = reponse.list;
          for(let i = 0; i < this.listData.length; i++) {
            if(_t.listData[i]['groupSize'] != 1) {
              _t.listData[i]['ruterpath'] = './projectList'
            } else {
              _t.listData[i]['ruterpath'] = './projectDetail'
            }
          }
        }).then(function (result) {
          if (result.status != 200) {
            _t.templatehide = true;
          }
        }).catch(e => {
          _t.templatehide = true;
          console.log(e)
        });
        //专家意见
        let advice = {
          url: "VR000104",
          data: {
            recordNo: this.recordNo
          }
        };
        this.api.post(advice, reponse => {
          _t.adviceExpert = reponse.entity.summarySuggest;

        });
        var sharData = {
          recordNo: this.$route.query.recordNo || '',
          userId: this.$store.state.userinfo.userId || '',
          name: this.$store.state.userinfo.userName || ''
        };
        /* _t.sharlink(sharData);
         _t.wxcofing()*/
      }
    },
    data() {
      return {
        templatehide: false,
        listSix: [],

        //项目组拼音简码
        /*  groupSingleCode: "",
                  /!*假数据*!/
                  //科室id
                  deptId: "456",
                  //项目组id
                  groupId: "",*/
        //总数
        //体检编号
        //视频跳转
        advicesskip: false,
        createTimeStr: '',
        workerImg: '',
        recordNo: '1234',
        num: "",
        workerName: '',
        recordDate: "",
        //class
        isActive: true,
        Summary: true,
        //列表
        listData: [],
        //六项
        that: this,
        fxbg: false,
        styleObject: {
          backgroundImage: "url(" + bgurl + ")",
        },
        adviceExpert: "意见",
        checksum: 0,
        detailsDataname: "",
        money: null,
        showContent001: false,
        showContent002: false,
        showContent003: false,
        showContent004: false,
        fxbgsrc: require('../../assets/image/cofficeanz.png'),
        shiyan: '3123',
        videoUrl: ''
      }
    },
    watch: {
      listSix: function(val) {
      }

    },

    methods: {
      //总数
      awaici() {
        let _t = this;
        let params = {
          url: "VR000203",
          data: {
            recordNo: this.recordNo,
          }
        };
        this.api.post(params, reponse => {
          _t.checksum = reponse.num;
        })
      },
      //微信分享提示
      //微信分享
      wxcofing(wxdata, wxsharData) {

        let data = wxdata;
        let sharData = wxsharData;
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
          _t.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.appid + "" || "", // 必填，公众号的唯一标识
            timestamp: response.timestamp + "" || "", // 必填，生成签名的时间戳
            nonceStr: response.nonceStr + "" || '', // 必填，生成签名的随机串
            signature: response.signature + "" || '', // 必填，签名，见附录1
            jsApiList: wxMethod
          });
          _t.wx.ready(function () {
            /*_t.sharlink(sharData);*/
            /*_t.wxshar(response)*/

            /* _t.wxshar(data, sharData)*/
          });
          this.wx.error(function (res) {

          });


        });
      },
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
          _t.wxcofing(response, sharData)
        });
      },
      wxshar(data, sharData) {
        var _t = this;
        _t.wx.onMenuShareTimeline({
          title: sharData.name + '体检报告', // 分享标题
          link: data.fileUrl && _t.api.healthhost() + data.fileUrl || "http://service.fuhua-life.com", // 分享链接
          imgUrl: _t.api.healthhost() + 'static/img/vux_logo.png',
          success: function () {
            _t.$store.commit('saveshouHideval', false);
          },
          cancel: function () {
            _t.$store.commit('saveshouHideval', false);
          }
        });
        _t.wx.onMenuShareAppMessage({
          title: sharData.name + '体检报告', // 分享标题
          desc: sharData.name + '体检报告', // 分享描述
          link: data.fileUrl && _t.api.healthhost() + data.fileUrl || "http://service.fuhua-life.com", // 分享链接
          imgUrl: _t.api.healthhost() + 'static/img/vux_logo.png',
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            _t.$store.commit('saveshouHideval', false);

          },
          cancel: function () {
            _t.$store.commit('saveshouHideval', false);
          }
        });
      },
      dailog(msg) {
        this.dilog(msg);
      },
      fxbghide() {
        this.fxbg = false
      },
      //右侧弹窗
      shouHide: function() {

        if (!this.$store.state.shouHideval) {
          this.$store.commit('saveshouHideval', true);
        } else {
          this.$store.commit('saveshouHideval', false);
        }
      },
      //视频如有就跳转没有就提示
      pushvideo() {
        //返回host   this.api.healthhost()；
        if (this.videoUrl != '') {
          let videorul = this.api.healthhost() + this.videoUrl;
          console.log(videorul);
          this.$router.push({
            path: './myVideo',
            query: {
              id: '',
              recordNo: this.$route.query.recordNo,
              detailsDataname: this.detailsDataname,
              videorul: videorul
            }
          })
        } else {

          this.dailog('视频不存在')
        }

      }
    },
    components: {
      XHeader,
      Group,
      Cell,
      CellFormPreview,
      CellBox,
      Badge,
      HendRight
    }
  }
</script>
<style lang="less">
  .det-father {
    background: #f1f1f1;

    /* min-height: 2000px;*/
    .headtop {
      width: 100%;
      height: 40px;
      background: #38bdf0;
    }
  }

  .fxbg {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .det-father .titleFs {
    font-family: 'PingFangrEgular';
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    color: #2d2d2d;
  }

  .det-list {
    display: flex;
    align-content: center;
    flex-direction: column;
    color: #686868;
  }

  .det-list-top,
  .det-list-footer {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    /*  margin: 0 auto;*/
  }

  .weui-cells .det-list-con {
    display: flex;
  }

  .weui-cells .det-list-con img {
    display: flex;
    -webkit-align-items: center;
  }

  .det-father .weui-cells {
    margin-bottom: 20px;
  }

  .det-list-right {
    flex: 1;
  }

  .det-list-con img {
    width: 36px;
    height: 36px;
  }

  .det-bg {
    background: url("../../assets/image/datailed_R_bg1.png") no-repeat center;
    background-size: 100% 645px;
    background-position: top;
    min-height: 753px;
    display: flex;
    flex-direction: column;
  }

  .det-bg .det-bg-man {
    margin: 0 auto;
    background: url("../../assets/image/datailed_R_bg4.png") no-repeat center;
    background-size: 152px 368px;
    min-width: 160px;
    height: 441px;
    margin-bottom: 7px;
    position: relative;
    z-index: 1000;
  }

  .det-bg .det-bg-music {
    position: relative;
    margin: 0 auto;
    background: url('../../assets/image/detailed_R_bg3.png') no-repeat center;
    background-size: 470px 193px;
    width: 470px;
    height: 216px;
  }

  .det-bg .dte-bg-name {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 58px;

    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;

    color: #ffffff;
    border-radius: 29px;

    border: 1px solid #62c3ed;
    margin-top: 15px;
  }

  .det-music {
    position: relative;
  }

  .det-bg-cleco {
    background: url('../../assets/image/yuanhuanbg.png') no-repeat center;
    background-size: 244px 244px;
    width: 244px;
    height: 244px;
    border-radius: 122px;
     position: absolute;
    left: -38px;
    top: -30px;
    z-index: 100;
    .det-bg-clecoChend {
      position: absolute;
      background-size: 192px 192px;
      width: 192px;
      height: 192px;
      border-radius: 98px;
      z-index: 50;
      top: 26.25px;
      left: 26.25px;

      img {
        margin: 0 auto;
        width: 60px;
        height: 60px;
        display: block;
        margin-top: 67.5px;
      }

    }
  }

  //.det-bg-cleco

  .det-font {
    position: absolute;
    height: 100px;
    margin: 0 auto;
    left: 232px;
    top: 42px;
    font-size: 26px;

  }

  .det-font-item {
    color: #a08366;
  }

  .det-font-itemcenter {
    font-size: 32px;

    box-sizing: border-box;
    padding: 15px 0;
    color: #917052;
  }

  .det-font-itemspan {
    margin-left: 25px;
  }

  .det-man-parent {
    display: flex;
    align-items: center;
  }

  .det-man-parent .det-bg-manleft img {
    position: absolute;
    width: 24px;
    height: 24px;
    z-index: 100;
  }

  .det-man-parent .det-bg-manright img {
    position: absolute;
    width: 24px;
    height: 24px;
    z-index: 100;
  }

  .det-bg-manleft {
    flex: 1;
    position: relative;
  }

  .det-bg-manright {
    flex: 1;
    position: relative;
  }

  .det-colo-line {
    position: absolute;
    height: 90%;
    width: 2px;
    overflow: hidden;
    background: #60b6e5;
    left: 50px;
    top: -5px
  }

  .det-colo-rightline {
    position: absolute;
    height: 90%;
    width: 2px;
    overflow: hidden;
    background: #60b6e5;
    left: 12px;
    top: -5px
  }

  .det-bg-manleft .det-bg-manitem {
    display: flex;
    margin-left: 39px;
    align-items: center;
  }

  .det-bg-manleft .det-bg-manitem p {
    padding-top: 10px;

    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;

    letter-spacing: 0px;
    color: #ffffff;
    margin-left: 20px;
  }

  .det-bg-manleft .det-bg-manitem p det-man-fontfirst {
    color: #edf4fb;
    padding-bottom: 10px;
    font-size: 24px;

  }

  .det-bg-manright .det-bg-manitem {
    display: flex;
    align-items: center;
  }

  .det-bg-manright .det-bg-manitem p {
    padding-top: 10px;

    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;

    letter-spacing: 0px;
    color: #ffffff;
    margin-left: 20px;
  }

  .det-bg-manright .det-bg-manitem p det-man-fontfirst {
    color: #edf4fb;
    padding-bottom: 10px;
  }

  .det-man-font {
    font-size: 34px;

    margin-left: 20px;
  }

  .det-bg-manitem {
    margin-top: 30px;
  }

  .det-man-fonttop {
    margin-top: -40px;
  }

  .det-list .weui-cells {
    margin-top: 0;
    background: #f1f1f1;

  }

  .det-list .det-cone-one {
    width: 692px;
    border: none;

  }

  .det-list .weui-cell {
    background: #FFFFFF;
    box-sizing: border-box;
  }

  .det-list .det-cone-style {
    height: 98px;
    font-size: 34px;

    /*  margin-bottom: 18px;*/
    border-radius: 5px;
  }

  .det-testing {
    position: relative;
    margin: 0 auto;
    display: flex;
    background: #FFFFFF;
    box-sizing: border-box;
    height: 98px;
    width: 692px;
    border: none;
    align-items: center;
    font-size: 28px;
    padding: 10PX 15PX;
    /*border-bottom: 1px solid #e5e5e5;*/
    font-family: 'PingFangrEgular';
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    color: #2d2d2d;
  }

  .det-testing:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 97px;
    right: 0;
    height: 1PX;
    border-top: 2PX solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.25);
    transform: scaleY(0.25);
  }

  .det-list .det-proposal-style {
    height: 98px;
    font-size: 34px;
    margin-top: 18px;

  }

  .det-solt-color {
    font-family: 'PingFangrEgular';
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    color: #f06666;
  }

  .det-linhight {
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 42px;
    letter-spacing: 0px;
    color: #939393;
  }

  .det-list-linhight {
    font-size: 24px;

    line-height: 40px;
  }

  .vux-header .vux-header-right .vux-header-more {
    display: block;
    /*background: url('../../assets/image/insetera.png') no-repeat center;*/
    background-size: 100% 100%;
    width: 40px;
    height: 40px;
  }

  .shouwRight {
    width: 80px;
    height: 80px;
  }

  .xiazai {
    width: 40px;
    height: 40px;
    background: url('../../assets/image/xiazai2.png') center no-repeat;
    background-size: 100%;
  }

  .ruterWidth {
    display: block;
    width: 100%;
    font-family: 'PingFangrEgular';
    height: 100%;
    text-align: center;
    line-height: 58px;
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0;
    color: #ffffff;
  }

  .det-cone-list {
    min-height: 98px;
  }

  .det-cone-list.weui-cell:before {
    width: 92%;
    margin: auto;
  }

  /*//消除头部的一条伪类线*/
  #app .det-list .det-proposal-style:before {
    color: #fff;
    border-top: 0;
    height: 0;
  }

  .det-father .vux-cell-bd {
    padding-top: 8px;
  }

  .det-father .vux-header .vux-header-right .vux-header-more:after {
    content: " ";
    font-size: 32px;

  }

  　pre, code {
    display: block;
    overflow: auto;
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    white-space: pre-wrap; /* Firefox */
  }

</style>
