<template>
	<div class='video-father'>
    <div :class="{'headerTopWrite':true}"></div>
    <x-header :left-options="{showBack: true,backText: ''}" :right-options="{showMore: false}"
              :class="{'headerwrite':true}">视频报告解读
    </x-header>
		<div class="video-header">
			<div class="video-vider">
				<Play :videoUrl="videoUrl"></Play>
			</div>
			<div class="video-qianming">
				<div class="video-qianming-chiend">
					<p class="video-qianming-name"><span v-text="detailsDataname"></span><span>体检报告解读</span></p>
					<p class="video-qianming-tiem" v-text="createTimeStr"></p>
				</div>
			</div>
		</div>
		<div class="video-man">
			<div class="video-manitem">
				<div>
					<img class="video-clicl" v-bind:src="workerImg" alt="">
				</div>
			</div>
			<div class="video-manitem">
				<div class="video-manitem-fontsie">
					<p class="video-manitem-p"><span><span id="video-manitem-name" v-text="workerName">王芳红</span><span class="video-manitem-Occupation" v-text="workerTitle">国家职业医药师</span></span>
					</p>
          <p class="video-manitem-p"><span class="video-manitem-Occupation" v-html="introduction">
          </span>
					</p>
					<p class="video-manitem-p">
						<img src="../../assets/image/colorfont_07.png" alt="">
						<span>服务</span>
            <span class="video-manitem-num" v-text="serverNum">145</span>
						<span>人</span>
					</p>
				</div>
			</div>
      <!--<div class="video-manitem video-con">
                <span class="video-con-left"></span>
            </div>-->
		</div>
		<div class="video-content">
			<div class="video-content-shan">
				擅长项目
			</div>
      <div class="video-content-font" v-html="goodAt">

      </div>

		</div>
	</div>
</template>
<script>
  /*v-html="introduction"*/
	import { XHeader } from 'vux';
	import Play from '../myVideo/videoplay';
	export default {
    methods: {
      LimitNumber(txte) {
        var str = txte;
        str = str.substr(0, 30) + '...';
        return str
      }
    },
    mounted: function() {

			var _t = this;

			this.recordNo = this.$route.query.recordNo;

			this.detailsDataname = this.$route.query.detailsDataname;

      let Detaillist = _t.$store.state.Detail.list;

      if (Detaillist.length > 0) {
          //视频接口
        let list = Detaillist[0];

          _t.createTimeStr = list.createTimeStr || '';
          _t.workerName = list.workerName || '';
          //擅长项目
          _t.goodAt = list.workerInfo.goodAt || '';
          //视频地址
          _t.videoUrl = list.videoUrl || '';
          // 医生职称
          _t.workerTitle = list.workerInfo.workerTitle || '';
          //医生头像
        _t.workerImg = this.api.healthhost() + list.workerInfo.workerImg || _t.workerImg;

        _t.serverNum = list.workerInfo.serverNum;
          //人数统计还没有字段
          // 个人介绍
          //简介
        let str = list.workerInfo.introduction || '';
        let str2 = str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\，|\<|\.|\>|\/|\?]/g, "");
        if (str2.length > 30) {
          _t.introduction = this.LimitNumber(str);
        } else {
          _t.introduction = str
        }

          //提交报告编号
          //科室id
        }


    },
		data() {
			return {
				workerImg: "http://img5.imgtn.bdimg.com/it/u=193248827,4207640734&fm=27&gp=0.jpg",
				introduction: "某方面专家",
				workerTitle: "医生",
				goodAt: "暂无数据",
				workerName: "",
				createTimeStr: "",
				detailsDataname: "",
				videoUrl: 0,
				recordNo: "",
        serverNum: ''
			}
		},
		watch: {
			videoUrl: function(val) {
				this.videoUrl = val
			}
		},
		components: {
			XHeader,
			Play
		}
	}
</script>
<style scoped lang="less">

	@base: 130px;

  .video-father {
    .headerTopWrite {
      height: 40px;
      width: 100%;
      background: #ffffff;
    }

		height: 100%;
		background: #f1f1f1;
		.video-manitem-p {
			flex: 1;
			display: flex;
			align-items: center;
			img {
				width: 34px;
				height: 34px;
				margin-right: 16px;
			}
		}
		.video-qianming {
			display: flex;
			align-items: center;
			height: 126px;
			width: 100%;
			background: #FFFFFF;
			.video-qianming-name {
				font-size: 30px;
				/*px*/
				font-weight: bold;
				padding-left: 30px;
				padding-right: 30px;
			}
			.video-qianming-tiem {
				margin-top: 20px;
				font-size: 20px;
				/*px*/
				color: #adadad;
				padding-left: 30px;
				padding-right: 30px;
			}
		}
		.video-man {
			display: flex;
			background: #FFFFFF;
			margin-top: 20px;
      min-height: 180px;
			align-items: center;
			.video-clicl {
				width: 130px;
				height: @base;
				border-radius: 65px;
				/* background: url('../../assets/image/detailed_R_bg2.png') no-repeat center;
         background-size: 100% 100%;*/
			}
			;
			.video-manitem-fontsie {
        min-height: @base;
				display: flex;
				margin-left: 30px;
				flex-direction: column;
			}
			;
			box-sizing: border-box;
			padding-right: 28px;
			padding-left: 28px;
		}
		.video-content {
			border: 1px solid #f1f1f1;
			margin-top: 20px;
			background: #FFFFFF;
			min-height: 100px;
			margin-right: 20px;
			margin-left: 20px;
			box-sizing: border-box;
			.video-content-font {
				margin: 30px;
				line-height: 52px;
				font-size: 26px;
				/*px*/
			}
			.video-content-shan {
				display: flex;
				height: 60px;
				width: 152px;
				background: -webkit-linear-gradient(left, #38bdf0, #65e0f0);
				margin-top: 16px;
				color: #FFFFFF;
				justify-content: center;
				align-items: center;
				border-radius: 0 30px 30px 0;
			}
		}
		.video-con {
			display: flex;
			justify-content: flex-end;
			flex: 1px;
			height: @base;
			.video-con-left {
				display: flex;
				width: 38px;
				height: 40px;
				align-items: flex-start;
				justify-content: flex-end;
				background: url('../../assets/image/colorfont_03.png') no-repeat center;
				background-size: 100% 100%;
			}
		}
		.video-footer-last {
			height: 20px;
			width: 100%;
			background: #f1f1f1;
		}
		#video-manitem-name {
			font-size: 28px;
			/*px*/
			margin-right: 26px;
		}
		.video-manitem-Occupation {
			color: #747474;
      overflow: hidden;

		}
		.video-manitem-num {
			color: #38bdf0;
		}
	}
</style>
