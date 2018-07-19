<template>
	<div class="report">
		<slot>
			<div class="rep-sex-name">
				<img :src="sexImg" alt="女">
				<span v-text="childItem.name"></span>
			</div>
			<div class="rep-time-addr vux-1px-l">
				<p v-text="childItem.recordDate"></p>
				<p v-text="childItem.institutionName"></p>
			</div>
			<div class="rep-icon">
				<x-icon type="ios-arrow-right" size="23"></x-icon>
			</div>
		</slot>
	</div>
</template>

<script>
	//我的报告内容
	export default {
		props: {
			childItem: Object || ''
		},
		data() {
			return {
				name: this.$store.state.name || '匿名',
				sexImg: this.$store.state.sex === '2' ? require('../../assets/image/rep-female.png') : require('../../assets/image/rep-male.png')
			}
		}
	}
</script>

<style rel=”stylesheet/scss” lang="scss">
	.report {
		box-sizing: border-box;
		width: 690px;
		height: 140px;
		padding: 21px 22px;
		background: #fff;
		margin: 0 auto 20px;
		display: flex;
		border-radius: 6px;
		color: #747474;
		.rep-sex-name {
			height: 98px;
      font-size: 28px;
      color: #747474;
      font-weight: normal;
      font-family: 'PingFangrEgular';
			padding-right: 26px;
			line-height: 98px;
			img {
				width: 62px;
				padding: 14px 24px 22px;
			}
		}
		.rep-time-addr {
			flex: 1;
			padding-left: 26px;
      font-size: 22px;
      color: #747474;
			line-height: 49px;
      font-weight: normal;
      font-family: 'PingFangrEgular';
		}
		.rep-time-addr :last-child {
      font-size: 26px;
      color: #747474;
      font-weight: normal;
			white-space: nowrap;
      font-family: 'PingFangrEgular';
		}
		.rep-icon {
			line-height: 98px;
			padding-top: 14px;
			.vux-x-icon {
				fill: #858585;
			}
		}
	}
</style>
