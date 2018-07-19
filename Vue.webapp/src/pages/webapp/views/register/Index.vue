<template>
  <div class="register">
   <!-- <div class="hederTopwrite"></div>-->
    <div style="height:100%;">
      <div class="reg-top">

        <x-header @on-click-back="backFun" :left-options="{showBack: true,backText: '',preventGoBack:true}">绑定个人信息
        </x-header>

      </div>
      <reg-form @add="changeVal"></reg-form>
    </div>
    <lightBox :boxval="boxval" @change="hideBox"></lightBox>

  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import RegForm from './Form'
  import lightBox from './lightBox'
  export default {
    components: {
      XHeader,
      "reg-form": RegForm,
      'lightBox': lightBox
    },
    data() {
      return {
        boxval: false
      }
    },
    mounted() {

      document.getElementById('waiindex').style.display = "none";
    },
    methods: {
      backFun() {
        window.location.href = "http://app_report_back"
      },
      changeVal: function(val) {
        this.boxval = val;
        setTimeout(() => {
          this.boxval = false
        }, 1000)
      },
      hideBox: function() {
        this.boxval = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .register {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(241, 241, 241);
    .headerwritTop {
      width: 100%;
      height: 40px;
      background: #38bdf0;
    }

  }

  #app .register .vux-header {
    background: none;
  }

  #app .register {
    .reg-top {
      height: 590px;
      background: url("../../assets/image/bgxintwo.png") no-repeat center;
      background-size: 100% 100%;
    }
    .hederTopwrite {
      width: 100%;
      height: 40px;
      background: #38bdf0;
    }
    .fontFoter {
      font-size: 24px;
      color: #747474;
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
