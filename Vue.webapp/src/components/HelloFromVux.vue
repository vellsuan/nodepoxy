<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> 我是标题 </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  mounted() {
    this.$http.get('/org/business/USER0405.do').then(response => {
      console.log(response.data)
    }, response => {
      console.log(response)
    });
  }
}
</script>

<style lang='scss'>
.vux-demo {
  text-align: center;
  h1 {
    font-size: 28px;/*px*/
  }
}

.logo {
  width: 100px;
  height: 100px
}
</style>
