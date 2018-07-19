<template>
	<div class="x-heartrate" :class="num>90? 'red':'normal'">
		<div class="x-heart-num">
			<span>{{ num }}</span>
			<span>心率(次/分)</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: ['num'],
		data() {
			return {

			}
		}
	}
</script>
<style lang="css">
	.x-heartrate {
		width: 709px;
		height: 261px;
	}
	
	.normal {
		background: url(../../assets/image/healthrate.jpg) no-repeat center center;
		background-size: 100%;
	}
	
	.red {
		background: url(../../assets/image/healthrate_red.jpg) no-repeat center center;
		background-size: 100%;
	}
	
	.x-heart-num {
		width: 216px;
		height: 216px;
		margin: 20px 0 0 246px;
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	
	.x-heart-num span:first-of-type {
		font-size: 46px;
		color: #ff5a5a;
		margin: 62px 0 20px 0;
	}
	
	.x-heart-num span:last-of-type {
		color: #747474;
		font-size: 11px;
	}
</style>