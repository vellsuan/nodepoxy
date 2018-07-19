<template>
	<div class="lightbox" v-show="boxval">
		<div class="popBox" @click="hideBox" v-show="boxval==2"></div>
		<div class="pop" @click="hideBox">
			<p>请检查必填项！</p>
		</div>

  </div>
</template>
<script>
	export default {
		props: ['boxval'],
		data() {
			return {
				showBox: this.boxval || false
			}
		},
		methods: {
			hideBox() {
				this.$emit("change")
			}
		},
	}
</script>
<style lang="css">
	.lightbox {
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 9999;
	}

  .popBox {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
	}

  .pop {
		position: absolute;
		width: 50%;
		height: 100px;
		line-height: 100px;
		/* padding:20px; */
		text-align: center;
		background: rgba(0, 0, 0, 0.4);
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		z-index: 9999;
		border-radius: 80px;
	}

  h4 {
		color: #38bdf0;
		font-size: 30px;
		margin-bottom: 20px;
	}

  .pop p {
		color: #fff;
	}
</style>
