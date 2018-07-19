<template>
	<div class="summary">
    <div :class="{'headerwritTop':true}"></div>
    <x-header :left-options="{showBack: true,backText: ''}" :right-options="{showMore: false}">异常结果汇总</x-header>
		<div class="summary-parent">
			<div v-for="item in listdata">
				<div class="summary-height summary-title">
					<div class="summary-title-item">{{item.deptName}}</div>
					<div class="summary-title-num"><span v-text="item.abnormalNum"></span><span>项异常</span></div>
				</div>
				<div class="summary-height summary-list" v-for="chiend in item.diseaseList">
					<div class="summary-list-content">
						{{chiend.diseaseName}}
					</div>
					<div class="summary-icon">
            <!--<img class="summary-icon-left" src="../../assets/image/jiantou_03.png" alt="">
                        <p class="summary-icon-right">异常结果</p>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { CellFormPreview, Group, Cell, XHeader } from 'vux'

	export default {
		mounted: function() {
			if(this.$route.query.recordNo != 'undefiend') {
				this.recordNo = this.$route.query.recordNo;
			}
			let params = {
				url: "VR000207",
				data: {
					recordNo: this.recordNo,
				}
			};
			this.api.post(params, reponse => {
				this.listdata = reponse.list;

			});
		},
		components: {
			CellFormPreview,
			Group,
			Cell,
			XHeader
		},
		data() {
			return {
				listdata: [],
				recordNo: ""
			}
		}
	}
</script>
<style scoped lang="less">
	.summary {
    .headerwritTop {
      width: 100%;
      height: 40px;
      background: #ffffff;
    }
		.summary-height {
      min-height: 96px;
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 28px;
      /*  line-height: 50px;*/
    }
		.summary-parent {}
		.summary-title {
			background: #dff7ff;
			color: #3f9fc4;
			display: flex;
			.summary-title-item {
				margin: 0 30px;
				flex: 1;
			}
			.summary-title-num {
				margin-right: 30px;
				 :nth-child(1) {
					color: red;
				}
				 :nth-child(2) {
					color: #747474;
				}
			}
		}
		.summary-list {
			padding-left: 30px;
			box-sizing: border-box;
			border-bottom: 1px solid #e5e5e5;
		}
		.summary-icon {
			display: flex;
			align-items: center;
			margin-right: 30px;
		}
		.summary-list-content {
			flex: 1;
		}
		.summary-icon-left {
			margin-right: 14px;
			width: 16px;
			height: 24px;
		}
		.summary-icon-right {
			color: red;
		}

  }
</style>
