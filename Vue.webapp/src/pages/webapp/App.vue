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

  @import "./assets/css/reset.css";
  @import "./assets/css/theme.css";
  @import '~vux/src/styles/1px.less';
  #app{
    height:100%;
  }

</style>
