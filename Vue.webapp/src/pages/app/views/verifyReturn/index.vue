<template>
  <div class="verifyRetrun" v-bind:style="{backgroundImage: 'url(' + successImgUrl + ')'}">
    <x-button class="qiandaos" @click.native="colse">返回</x-button>
  </div>
</template>
<script>
  import {

    XButton

  } from 'vux'

  export default {
    components: {
      XButton
    },
    data() {
      return {
        successImgUrl: ''
      }
    },
    methods: {
      colse() {
        //关闭
        console.log(this.wx);
        this.wx.closeWindow();
      }
    },
    mounted() {
      let _t = this;
      _t.api.post({
        url: 'SIGN0206',
        data: {}
      }, response => {
        let successImgUrl = response.entity.successImgUrl;
        _t.successImgUrl = this.api.healthhost() + successImgUrl
      });
    }
  }
</script>
<style lang='less'>
  .verifyRetrun {
    position: relative;
    height: 100%;
    width: 100%;
    background: url("../../assets/image/Verifybackground.png") no-repeat center;
    background-size: 100% 100%;
    .qiandaos {
      position: absolute;
      background: #38bdf0;
      border-radius: 100px;
      width: 580px;
      height: 88px;

      left: 0;
      right: 0;
      font-size: 32px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      top: 1005px;
      // margin-top: 1145px;
    }
  }
</style>
