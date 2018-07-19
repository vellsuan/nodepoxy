<template>
	<div id="pro">

    <x-header :left-options="{showBack: true,backText: ''}">项目详情</x-header>
		<div class="pro-medecal">
			<span>{{groupName}}</span>
		</div>
		<p class="proheartRateSpan">初步意见：{{summaryRemark}}</p>
		<div class="pro-heartRate" v-if="itemiD">
			<x-heartrate :num="numfa" class="x-heart"></x-heartrate>
		</div>

    <!--是否显示图片-->
		<x-artery :list="happending"></x-artery>

    <group v-for="item in happending" :key="item.groupSingleCode" v-if="item.itemFlag==0||item.itemFlag==2">
      <cell :title="item.itemName" :value="item.examDetail+(item.unit||'')" @click.native="examDetailmd(item)">

        <img v-if="Number(item.isYang)" class="icon-left" slot="icon" src="../../assets/image/list_bg3.png" width="35"
             height="35" style="display:block;margin-right:5px;"/>
        <img v-else="Number(item.isYang)" class="icon-left" slot="icon" src="../../assets/image/medecal_icon.jpg"
             width="35" height="35" style="display:block;margin-right:5px;"/>
        <p slot="title" class="yijianFt" v-text="item.itemName"></p>
			</cell>
		</group>
		<x-conclusion :names="namefa" :contents="contents"></x-conclusion>

    <div class="button-btn" v-if="reportFileFlag==1">

      <button @click="handclick({listReport})">查看附件</button>
		</div>

		<x-dialog v-model="showToast" class="dialog-demo">
			<div class="medcontent">

        <div class="dalogprent">

          <div class="titlediv">
            <div class="dlogname">项目名称</div>
            <div class="dalogtitles" v-text="dalogtitle"></div>
          </div>

          <div class="wrapper" ref="menuScroll">
            <div class="content">
              <div class="danweiparen" v-if="itemMemo!=='' && itemMemo!==null">
                <div class="msgdiv">提示信息</div>
                <div class="fontcontent" v-text="itemMemo"></div>
                <div class="dalogcontent"></div>
              </div>
              <div class="danweiparen" v-if="refRanger!=='' && refRanger!==null">
                <div class="fanweidiv">参考范围</div>
                <div class="fontcontent" v-text="refRanger"></div>
                <div class="dalogcontent"></div>
              </div>

              <div class="danweiparen" v-if="unit!==null && unit!==''">
                <div class="danweidiv">单位</div>
                <div class="fontcontent" v-text="unit"></div>
                <div class="dalogcontent"></div>
              </div>

              <div class="resultdiv" v-if="dalogcontent!=='' && dalogcontent!==null">
                <div>结果</div>
                <div class="fontres" v-text="dalogcontent"></div>
              </div>

            </div>
          </div>
        </div>
			</div>
			<div @click="showToast=false" class="shouToast">
				<div class="vux-colse">
					<img src="../../assets/image/xhao.png" alt="">
				</div>
			</div>
		</x-dialog>

	</div>
</template>
<script type="text/javascript">
	import { XHeader, Group, Cell, XDialog, XButton } from 'vux'
	import Xheartrate from './Xheartrate'
	import XConclusion from './XConclusion'
	import XArtery from './XArtery'
  import BScroll from 'better-scroll'

  console.log(BScroll);
	/* import cssPre from '~vux/src/styles/close';*/

	export default {
		components: {
			XHeader,
			Group,
			Cell,
			XDialog,
			XButton,
			'x-heartrate': Xheartrate,
			'x-conclusion': XConclusion,
			'x-artery': XArtery
		},
		data() {
			return {
				dalogcontent: '',
				dalogtitle: "",

				showToast: false,
				happending: [
					// {tit:'病史',val:'无'},{tit:'病史',val:'无'},{tit:'病史',val:'无'},{tit:'病史',val:'无'},{tit:'病史',val:'无'}
				],
				itemiD: false,
				numfa: '',
				namefa: '',
				summaryRemark: '',
				contents: '',
				groupName: '',
				reportFileFlag: '',
        listReport: '',
        /* itemWorksReport: '',*/
        httpUrl: '',
        unit: '',
        refRanger: '',
        itemMemo: ""
			}
		},
		methods: {
      //内容详情弹窗
			examDetailmd(val) {
        this.dalogtitle = val.itemName;
        this.unit = val.unit;

        this.dalogcontent = val.examDetail;
        this.refRanger = val.refRanger;
        this.itemMemo = val.itemMemo;
        console.log(val.itemMemo);

        //弹窗
				this.showToast = true
			},

			handclick(item) {
        let itemlist = item.listReport;

        let itemhttpUrl = this.httpUrl;
        let sectionName = this.$route.query.sectionName;
        this.$router.push({path: '/accessory', query: {itemlist, itemhttpUrl, sectionName}});
        /*if(item.stats == 0) {
          window.location.href = this.httpUrl + item.urlPath
                } else if(item.stats == 1) {
          window.open(this.httpUrl + item.urlPath);
                }*/
        let self = this;
        let params = {
          url: 'VR000208',
          data: {
            groupId: item.listReport[0].groupId,//项目组拼音简码
            recordId: item.listReport[0].recordId//体检编号
          }
        };
        this.api.post(params, response => {
          let res = response.list;
          console.log(res)
        })
			}
		},
		mounted() {

      var self = this;
			const params = {
				url: 'VR000205',
				data: {
					deptId: this.$route.query.deptId,
					groupId: this.$route.query.groupId,
          /*	groupSingleCode: this.$route.query.groupSingleCode,*/
					recordNo: this.$route.query.recordNo
				}
      };
			this.api.post(params, response => {
        let res = response;
        self.httpUrl = res.httpUrl;
        self.numfa = res.groupAbnormals; //项目组异常数
        self.namefa = res.workerName; //诊断医生
        self.groupName = res.groupName; //项目组名称
        self.summaryRemark = res.summaryRemark; //初步意见
        self.reportFileFlag = res.reportFileFlag; //附件是否显示
        self.contents = res.conclusion; //科室小结
        self.happending = res.itemList;
        self.listReport = res.listReport; //附件实体

        for(let i = 0; i < self.happending.length; i++) {
          //是否显示头部图
					if(this.happending[i].itemId == "8a807e995973291c015978b64b240044") {
            self.numfa = this.happending[i].examDetail.replace('次/分', "");
						this.itemiD = true
					}
				}
      });
      //重新禁用放大缩小
      let moutattr = "width=device-width, initial-scale=1, user-scalable=no";
      let vieport = document.getElementsByName("viewport")[0];
      let content = vieport.getAttribute('content');
      vieport.setAttribute('content', moutattr);
      this.$nextTick(() => {
        this.menuScroll = new BScroll(this.$refs.menuScroll, {
          click: true
        });
      });

    }

	}
</script>
<style lang="less">
	@import '~vux/src/styles/close';

	.dialog-demo {

    .weui-dialog {
			/* border-radius: 20px;*/
			/* padding-bottom: 8px;*/
			background: rgba(255, 255, 255, 0);
		}
		.dialog-title {
			line-height: 30px;
			color: #666;
		}
		.img-box {
			height: 350px;
			overflow: hidden;
		}
		.vux-close {
			margin-top: 8px;
			margin-bottom: 8px;
		}
	}

  #pro {
    .weui-cell {
      width: 100%;
    }
    .weui-cell__hd {

    }
    .vux-cell-bd {
      padding-top: 8px;
    }
    background-color: #f5f5f5;
    .yijianFt {
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;

      letter-spacing: 0px;
      color: #2d2d2d;
    }
	}

  #pro .pro-medecal {
		width: 100%;
		height: 88px;
		background-color: #dff7ff;
	}

  #pro .pro-medecal span {
		color: #95c5dc;
		margin: 31px 0 0 30px;
		font-size: 28px;

		float: left;
	}

  #pro .pro-heartRate {
		width: 100%;
    height: 238px;
		background-color: #f5f5f5;
		position: relative;
    margin-bottom: 56px;
	}

  #pro .pro-heartRate>span {
		margin: 25px 0 0 21px;
		float: left;
    color: #fd5050;
    font-size: 26px;

	}

  .proheartRateSpan {
		margin: 35px 0 0 28px;
		margin-bottom: 20px;
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    color: #fd5050;
	}

  #pro .x-heart {
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -110.5px 0 0 -354.5px;
	}

  #pro .weui-cell__ft {
		position: absolute;
		left: 339px;
		font-size: 26px;

    width: 260px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

  #pro .vux-no-group-title:after {
		display: none;
	}

  #pro .vux-no-group-title,
	#pro .weui-cells {
		margin-top: 0;
    min-height: 94px;
    display: flex;
    align-items: center;
	}

  #pro .icon-left {
		width: 35px;
		height: 35px;
	}

  #pro .button-btn {
		height: 98px;
		background: #fff;
	}

  #pro .button-btn button {
		height: 72px;
		background: -webkit-linear-gradient(left, #f07b38, #ec4441);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #f07b38, #ec4441);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #f07b38, #ec4441);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #f07b38, #ec4441);
		color: #fff;
		border: none;
		border-radius: 36px;
		width: 710px;
		margin: 20px;
		font-size: 30px;

  }

  .medcontent {
		width: 100%;
    height: 694px;
		border-radius: 20px;
		background: white;
	}

  .shouToast {
		height: 72px;
	}

  .vux-colse {
		margin-top: 36px;
		img {
			width: 72px;
			height: 72px;
		}
	}

  .dalogprent {
    padding: 28px 40px;
		.dalogtitle {
			display: flex;
			padding-bottom: 20px;
			border-bottom: 1px solid #e5e5e5;
			font-family: PingFang-SC-Medium;
			font-size: 32px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 69px;
			letter-spacing: 0px;
			color: #000000;
		}
		.dalogcontent {
			display: flex;
      //padding-top: 40px;
			font-family: PingFang-SC-Regular;
			font-size: 26px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 46px;
			letter-spacing: 0px;
			color: #747474;
		}
    .wrapper {
      height: 430px;
      overflow: hidden
    }

    .fanweidiv, .danweidiv, .msgdiv, .dlogname {
      font-size: 30px;
      height: 94px;

      font-weight: normal;
      font-stretch: normal;
      line-height: 94px;
      color: #9c9c9c;
      text-align: left;
    }
    .resultdiv {
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 94px;
      color: #9c9c9c;
      text-align: left;
    }
    .danweiparen, .titlediv {
      position: relative;
    }
    .danweiparen {
      display: flex;
      justify-content: space-between;
    }
    .dalogtitles {
      text-align: left;
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 64px;
      color: #000000;
    }
    .dalogtitles:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 160px;
      right: 0;
      height: 1PX;
      border-top: 2PX solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.25);
      transform: scaleY(0.25);
    }
    .dalogcontent:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 94px;
      right: 0;
      height: 1PX;
      border-top: 2PX solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.25);
      transform: scaleY(0.25);
    }
    .fontres {
      font-family: PingFangrEgular;
      text-align: left;
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 54px;
      color: #000000;
    }
    .fontcontent {
      flex: 1;
      text-align: right;
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 94px;
      letter-spacing: 0px;
      color: #000000;
    }
  }


</style>
