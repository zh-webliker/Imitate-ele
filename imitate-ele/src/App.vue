<template>
  <div id="app">
    <el-header :seller="seller"></el-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
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
      },
      isActive: true
    }
  },
  created () {
    seller().then(res => {
      this.seller = res.data.data
    })
  }
}
</script>

<style lang='scss'>
  body,html{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  .tab{
    display: flex;
    text-align: center;
    .tab-item{
      width: 33.33%;
      height: 40px;
      line-height: 40px;
      color: #4d555d;
      font-size: 14px;
      a{
        text-decoration: none;
      }
    }
    .active{
      color: red;
      text-decoration: none;
    }
  }
  </style>
