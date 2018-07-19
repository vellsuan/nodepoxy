<template>
	<div class="borderList">
    <div v-for="item in Divdata" :class="{borderborem:item.border}" :id="item.id" @click.stop="fenxiang(item.id)">
			<slot>
				<div>
					<slot name="left"><img :src='item.iconurl' alt=""></slot>
				</div>
				<main>
					<slot>{{item.content}}</slot>
				</main>
				<div>
					<slot name="right"></slot>
				</div>
			</slot>

		</div>
	</div>
</template>
<script>
	export default {
		props: ['Divdata'],
    mounted: function () {

    },
    data() {
      return {}
    },
		methods: {
			fenxiang: function(idindex = '1') {
        let _t = this;

				if(idindex === '1') {

          let user = this.$store.state.userinfo;
          let usrecordNo = this.$store.state.recordNo;
          _t.$store.commit('saveshouHideval', false);
          let premas = {
            url: "VR000301",
            data: {
              recordNo: usrecordNo,
              userId: user.userId
            }
          };
          this.api.post(premas, reponse => {

          }, true);

        } else if(idindex === '2') {
          //微信分享提示页
          // this.bus.$emit('selected', true)
          console.log(222222222);
          _t.$store.commit('saveshouHideval', false);
        }
			}
		}
	}
</script>
