<template>
  <div id="app">
    <el-header :seller="seller"></el-header>
  </div>
</template>

<script>
import { seller } from './api/api'
import header from './components/head/head.vue'

export default {
  name: 'App',
  components: {
    'el-header': header
  },
  data () {
    return {
      seller: {
      }
    }
  },
  created () {
    seller().then(res => {
      console.log(res.data.data)
      this.seller = res.data.data
    })
  }
}
</script>

<style lang='scss'>
  body,html{
    margin: 0;
    padding: 0;
  }
</style>
