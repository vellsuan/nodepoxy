<template>
	<div id="textlist">
    <x-header :left-options="{showBack: true,backText: ''}">项目详情</x-header>
		<div class="text-exam">
			<span>{{deptName}}</span>
			<span><b>{{numall}}</b>项异常</span>
		</div>
		<group v-for="i in pros" :key="i.itemId">
      <router-link
        :to="{ path: 'projectDetail', query: {deptId:i.deptId,groupId:i.groupId,groupSingleCode:i.groupSingleCode,recordNo:i.recordNo,sectionName:i.groupName}}">

				<cell :title="i.groupName" is-link>
          <img slot="icon" src="./../../assets/image/list_bg3.png" alt="" v-if="i.groupAbnormalNums>0">
          <img slot="icon" src="./../../assets/image/medecal_icon.jpg" alt="" v-else="i.groupAbnormalNums>0">
          <!-- <icon  type="warn"  v-if="i.groupAbnormalNums>0"></icon>
           <icon type="warn"  v-else="i.groupAbnormalNums=0"></icon>-->
          <p slot="title" class="yijianFt" v-text="i.groupName"></p>
					<span class="cell-span" v-if="i.groupAbnormalNums>0">
						{{i.groupAbnormalNums}}项异常检测
					</span>
				</cell>
			</router-link>
		</group>
	</div>
</template>

<script>
	import { XHeader, Group, Cell, Icon } from 'vux'
	export default {
		components: {
			XHeader,
			Group,
			Cell,
			Icon
		},
		data() {
			return {
				pros: [

				],
        sectionName: '',
        //头部分类
				numall: '',
				deptName: ''

			}
		},
		mounted() {

      //二级分类
      let self = this;
			const params = {
				url: 'VR000204',
				data: {
					deptId: this.$route.query.deptId, //科室ID
					recordNo: this.$route.query.recordNo //体检编号
				}
      };
			this.api.post(params, response => {
        let res = response;
        self.pros = res.list;
        self.numall = res.deptAbnormalNum || '0'; //科室异常数
				self.deptName = res.deptName //科室名称
			})
		}
	}
</script>

<style lang="less">
	.text-exam {
		width: 100%;
		height: 88px;
		background-color: #dff7ff;
	}

  #textlist {
    .weui-cells {
      min-height: 98px;

    }
    .weui-cells:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1PX;
      border-top: 2PX solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.25);
      transform: scaleY(0.25);
    }
    img {
      width: 36px;
      height: 36px;
    }
    .weui-cell__hd {
      display: flex;
      align-items: center;
      padding: 0;
      margin-right: 16px;
    }
    p {
      height: 36px;

      display: flex;
      align-items: center;
    }

  }
  #textlist .yijianFt {
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;

    line-height: 100%;
    color: #2d2d2d;
  }
	.text-exam>span:first-of-type {
		float: left;
		margin: 32px 0 0 30px;
		color: #95c5dc;
		font-size: 34px;

  }

	.text-exam>span:last-of-type {
		float: right;
		margin: 32px 20px 0 0;
		font-size: 34px;

		color: #959da0;
	}

  .text-exam>span:last-of-type b {
		color: #fd6a6b;
		font-weight: normal;
	}

  #textlist .vux-no-group-title:after {
		display: none;
	}

  #textlist .weui-cells {
		margin-top: 0;
		height: 88px;
    display: flex;
    align-items: center;
    a {
      width: 100%;
    }
  }

  .vux-label {
		font-size: 26px;
		color: #000
	}

  .cell-span {
		color: #ff8c8f;
		font-size: 26px;
    width: 18px;
	}
</style>
