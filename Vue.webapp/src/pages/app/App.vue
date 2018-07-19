<template>
  <div @click="emailArt" id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  methods: {
    //关闭右侧功能弹窗
    emailArt: function () {
      this.$store.commit('saveshouHideval', false);
    }
  }
}
</script>

<style lang="less">
  html,body{
    width: 100%;
    height: 100%;
    position: relative;
  }
  @import "./assets/css/reset.css";
  @import "./assets/css/theme.css";
  @import '~vux/src/styles/1px.less';
  #app{
    width: 100%;
    height:100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    left:0;
    top:0;
  }

</style>
