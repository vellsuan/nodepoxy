<template>
	<div class="conclusion">
		<group class="pro-con-doc">
			<cell title="检查医生" :value="names"></cell>
		</group>
		<div class="pro-con-detail">
			<p>科室小结</p>

      <p>
      <pre><code v-text="contents"></code></pre>
      </p>
		</div>
		<p>
      *温馨提示：此检验结果仅对本标本负责，仅供临床参考。本报告所含图片，均是配合文字所述配发，不能用于二次诊断或其他任何医学判断目的的使用。
		</p>
	</div>
</template>

<script>
	import { Group, Cell } from 'vux'
	export default {
		components: {
			Group,
			Cell
		},
		props: ['names', 'contents']
	}
</script>

<style lang="css">
	#pro .conclusion .weui-cell {
		background: none;
	}

	#pro .conclusion .weui-cell__ft {
		position: static;
	}

	#pro .conclusion .vux-label {
		margin-left: 0;
	}

	.conclusion {
		width: 100%;
		min-height: 470px;
		background-color: #f5f5f5;
		padding-top: 0.1px;
	}

	.pro-con-doc {
		margin: 18px 0 18px 0;
	}

  .pro-con-detail {
		width: 100%;
		min-height: 157px;
		background-color: white;
		padding-top: .1px;
		overflow: auto;
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;

    color: #2d2d2d;
  }

	.pro-con-detail>p:first-of-type {
    height: 26px;
    font-family: 'PingFangrEgular';
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    color: #2d2d2d;
		margin: 30px 0 0 30px;
	}

  .pro-con-detail>p:last-of-type {
		margin: 36px 0 0 46px;
    font-family: 'PingFangrEgular';
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    color: #747474;
		padding-right: 20px;
		padding-bottom: 120px;
		/* white-space:nowrap;overflow:hidden;text-overflow:ellipsis*/
	}

  .conclusion>p {
		margin: 26px 30px 0 30px;
		line-height: 33px;
    font-family: 'PingFangrEgular';
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;

    color: #747474;
		padding-bottom: 20px;
	}

  　pre, code {
    display: block;
    overflow: auto;
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    white-space: pre-wrap; /* Firefox */
  }
</style>
