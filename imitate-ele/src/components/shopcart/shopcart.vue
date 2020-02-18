<template>
  <div class="shopcart">
    <div class="left">
      <span>商品数量：<span :class="{shopNum: totalNum != 0}">{{totalNum}}</span></span>
      <span class="tatol_price">￥{{totalPrice}}</span>
      <span>另需配送费4愿</span>
    </div>
    <div class="right" v-if="totalPrice === 0">￥20元起送</div>
    <div class="right goPay" v-else-if="totalPrice >= 20" @click="goPayMoneny">去结算</div>
    <div class="right" v-else>还差￥{{20 - totalPrice}}元起送</div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props: {
    // totalPrice: {
    //   type: Number,
    //   default: 0
    // },
    // shopNum: {
    //   type: Number,
    //   default: 0
    // }
  },
  data () {
    return {
      totalPriceS: this.totalPrice
    }
  },
  computed: {
    ...mapState(['totalNum', 'totalPrice'])
  },
  methods: {
    goPayMoneny () {
      alert('需支付' + this.totalPrice + '元')
    }
  }
}
</script>
<style lang="scss" scoped>
.shopcart{
  display: flex;
  color: rgba(255,255,255,0.4);
  height: 48px;
  align-items: center;
  .left{
    width: 70%;
    span{
      display: inline-block;
      padding-left: 8px;
      font-size: 16px;
      height: 24px;
      line-height: 24px;
      .shopNum{
        padding-left: 0;
        text-align: center;
        width: 24px;
        border-radius: 12px;
        background: red;
        color: #ffffff;
      }
    }
    span:nth-child(3){
      font-size: 10px;
    }
  }
  .right{
    width: 30%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-color: #2b333b;
    font-size: 14px;
    font-weight: bold;
  }
  .goPay{
    background-color: #00b43c !important;
    color: #ffffff !important;
  }
}
</style>
