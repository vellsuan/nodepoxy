<template>
	<div>
		<div class="pro-artery" v-for="items in list" :key="items.deptId" v-if="items.itemFlag==1">
			<p>{{items.itemName}}<span>({{items.refRanger}}/{{items.unit}}）</span></p>
			<div class="pro-artery-range">
				<div class="pro-artery-range-line"></div>
				<span class="pro-artery-range-blueball left-ra">
					<em>{{items.minValue}}</em>
				</span>
				<span class="pro-artery-range-blueball ball-line"></span>

        <span class="pro-artery-range-value dow" style="left:10%"
              v-if="items.examDetail<items.minValue">
					<span>{{items.examDetail}}</span>
				<span></span>
				</span>
        <span class="pro-artery-range-value up" style="left:90%"
              v-else-if="items.examDetail>items.maxValue">
					<span>{{items.examDetail}}</span>
				<span></span>
				</span>
				<span class="pro-artery-range-value" :style="{left:q+posis(items)+'%'}" v-else>
					<span>{{items.examDetail}}</span>
				<span>正常</span>
				</span>
				<span class="pro-artery-range-blueball right-ra">
					<em>{{items.maxValue}}</em>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['list'],
		data() {
			return {
				q: 30,
				min: 4.0,
				max: 10.0,
				person: 6.8
			}
		},
		methods: {
			posis(items) {
        return ((items.examDetail - items.minValue) / (items.maxValue - items.minValue)) * 0.4 * 100
			}
		}
	}
</script>

<style lang="css">
	.pro-artery {
		width: 709px;
		height: 240px;
		background-color: white;
		border-radius: 15px;
		position: relative;
		left: 50%;
		margin-left: -354.5px;
		margin-top: 20px;
		padding-top: .1px;
		margin-bottom: 20px;
	}

  .pro-artery>p {
		font-size: 30px;
		/*px*/
		margin: 27px 0 0 27px;
		padding-top: 20px;
	}

  .pro-artery>p>span {
		color: #aaa;
	}

  .pro-artery-range {
		width: 100%;
		height: 182px;
		position: relative;
	}

  .pro-artery-range-line {
		width: 588px;
		height: 5px;
		background-color: #e5e5e5;
		border-radius: 5px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -2.5px 0 0 -294px;
	}

  .pro-artery-range-blueball {
		background-color: #38bdf0;
		float: left;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		margin: -6.5px 0 0 -6.5px;
	}

  .pro-artery-range-value {
		float: left;
		width: 110px;
		height: 110px;
    background: url(../../assets/image/clred.png) no-repeat;
		background-size: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		margin: -55px 0 0 -55px;
		z-index: 1;
	}

  .pro-artery-range-value.up {
    background: url(../../assets/image/clblue.png) no-repeat;
		background-size: 100%;
		left: 90%;
	}

  .pro-artery-range-value.dow {
    background: url(../../assets/image/clblue.png) no-repeat;
		background-size: 100%;
		left: 9%;
	}

  .pro-artery-range-value.up:before,
	.pro-artery-range-value.dow:before {
		content: "";
		position: absolute;
		top: 50%;
		width: 25px;
		height: 5px;
		background-color: #fb9f79;
		margin: -2.5px 0 0 0;
	}

  .pro-artery-range-value.up:before {
		left: -24px;
	}

  .pro-artery-range-value.dow:before {
		right: -24px;
	}

  .pro-artery-range-value.up span:nth-of-type(1),
	.pro-artery-range-value.dow span:nth-of-type(1) {
		/*position: absolute;
		bottom: 55px;*/
		color: #f13e3c;
		font-size: 34px;
		/*px*/
	}

  .pro-artery-range-value.up span:nth-of-type(2),
	.pro-artery-range-value.dow span:nth-of-type(2) {
		/*position: absolute;
		bottom: 18px;*/
		width: 22px;
		height: 26px;
		background: url(../../assets/image/arrow1.png) no-repeat;
		background-position: center bottom;
		background-size: 100%;
	}

  .pro-artery-range-value.dow span:nth-of-type(2) {
		transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		/* IE 9 */
		-moz-transform: rotate(180deg);
		/* Firefox */
		-webkit-transform: rotate(180deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(180deg);
	}

  .pro-artery-range-value>span:first-of-type {
		color: #38bdf0;
		font-size: 30px;
		padding-top: 8px;
		/*px*/
	}

  .pro-artery-range-value>span:last-of-type {
		font-size: 22px;
		/*px*/
		/*margin-top: 11px;*/
		color: #747474;
		padding-top: 10px;
	}

  .pro-artery .ball-line {
		border-radius: 0;
		height: 5px;
		top: 52%;
		left: 150px;
		width: 405px;
	}

  .left-ra {
		left: 150px;
	}

  .right-ra {
		right: 150px;
	}

  .right-ra em,
	.left-ra em {
		position: absolute;
		bottom: -50px;
		left: -10px;
		color: #a3a3a3;
	}
</style>
