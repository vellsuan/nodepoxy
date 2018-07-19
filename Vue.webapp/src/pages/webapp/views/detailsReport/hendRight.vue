<template>
	<div>
		<slot>

      <div class="hendRight-right" v-show="this.$store.state.shouHideval">
        <div class="triangle-up"></div>
				<listhedert :Divdata="data"></listhedert>
			</div>
		</slot>
	</div>
</template>

<script>
	import Listhedert from "./listHedert.vue";
	export default {
		props: ['showDiv'],

    data() {
			return {

        hendRighttrue: this.showDiv,
				data: [{
						id: '1',
          content: '下载到邮箱',
						iconurl: require('../../assets/image/youxiang.png'),
          border: false
        }/*,
					{
						id: '2',
						content: '分享到微信',
						iconurl: require('../../assets/image/weixin.png'),
            border: true
					}*/
				]
			}
		},
		methods: {
			hendRight: function() {
				this.$emit('increment', '123')
			},
			fenxiang: function(idindex = '1') {
				if(idindex === '1') {
          console.log(22222222);
          console.log(this.$store.state.userinfo)
				} else if(idindex === '2') {

        }
			}
		},
		components: {
			Listhedert
		}
	}
</script>
<style lang="scss">
	.hendRight-right {
    width: 218px;
		border-radius: 20px;
		position: absolute;
		background: #ffffff;
		/*padding: 20px;*/
		padding-top: 20px;
		padding-bottom: 20px;
    right: 20px;
		top: 120px;
		z-index: 1000;
		.borderborem {
      position: relative;
      /*border-bottom: 1px solid #e5e5e5;*/
		}
		.borderList {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
      /*height: 126px;*/
			padding-left: 20px;
			padding-right: 20px;
		}

    div {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		main {
			padding-top: 20px;
			padding-bottom: 20px;
			padding-left: 14px;
		}
		img {
			width: 26px;
			height: 26px;
		}

  }

  .triangle-up {
    position: absolute;
    width: 0;
    height: 0;
    top: -30px;
    left: 130px;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 32px solid #fff;
  }

  .borderborem:after {
    /*  border-bottom: 1px solid #e5e5e5;*/
    content: "  ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 2px;
    background-color: #e0e0e0;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
    -webkit-transform: scaleY(.25);
    transform: scaleY(.25);
  }
</style>
