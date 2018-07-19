<template>
  <div class="fujian">
    <x-header :left-options="{showBack: true,backText: ''}">
      {{sectionName}}
    </x-header>

    <div v-for="urlepath in item">
      <img :src="itemhttp+(urlepath.reportPath)" alt="">

    </div>
  </div>
</template>
<script>
  //需不需要做兼容如果图片未加载回去重新加载
  import {XHeader} from 'vux'
  //附件图片
  export default {
    mounted: function () {
      //更改vieport值放大缩小
      let moutattr = "width=device-width, initial-scale=1, user-scalable=yes";
      let vieport = document.getElementsByName("viewport")[0];
      let content = vieport.getAttribute('content');
      vieport.setAttribute('content', moutattr)

    },

    components: {XHeader},
    data() {
      return {

        item: this.$route.query.itemlist,
        itemhttp: this.api.healthhost(),
        sectionName: this.$route.query.sectionName
      }
    },
    methods: {
      viewiport: function () {
        console.log(111)
      }
    }
  }
</script>
<style lang="scss">
  .fujian {
    img {
      width: 100%;
    }
  }
</style>
