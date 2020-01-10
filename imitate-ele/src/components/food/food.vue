<template>
  <transition name="move">
    <div v-show="isShow" ref="food" class="food">
      <div class="food_info_head">
        <div class="head_img">
          <img :src="food.icon" alt="">
          <div class="back" @click="show(false)">
            <span class="icon_arrow_lift"></span>
          </div>
        </div>
        <div class="head_name">{{food.name}}</div>
        <div class="head_sell">
          <span>月售：{{food.sellCount}}份</span>
          <span>好评率：{{food.rating}}%</span>
        </div>
        <div class="head_buy">
          <div class="buy_price">￥{{food.price}}</div>
          <div class="buy_shopcart">加入购物车</div>
        </div>
      </div>
      <div class="food_intro_body">
        <div>商品信息</div>
        <div class="intro">{{food.info}}</div>
      </div>
      <div class="food_comment_foot">
        <div>商品评价</div>
        <div></div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
export default {
  props: {
    food: Object
  },
  data () {
    return {
      foods: this.food,
      isShow: false
    }
  },
  created () {
    Vue.nextTick(() => {
      console.log(this.food)
    })
  },
  computed: {
  },
  methods: {
    show (isShow) {
      this.isShow = !this.isShow
      if (isShow) { // 判断数据存在，在执行vue.nextTick()方法
        Vue.nextTick(() => {
          console.log(this.scroll)
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.food{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 48px;
  z-index: 30;
  background: #f3f5f7;
  .food_info_head{
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #cacaca;
    .head_img{
      width: 100%;
      img{
        width: 100%;
      }
      .back{
        position: absolute;
        top: 10px;
        left: 10px;
        .icon_arrow_lift{
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
          &::after{
            content: '<';
          }
        }
      }
    }
    .head_sell,.head_name,.head_buy{
      padding: 5px;
    }
    .head_buy{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .buy_shopcart{
        height: 30px;
        line-height: 30px;
        color: #fff;
        background-color: #00a0dc;
        border-radius: 18px;
        width: 100px;
        text-align: center;
      }
    }
  }
  .food_intro_body{
    background-color: #fff;
    margin-top: 30px;
    padding: 15px;
    border-bottom: 1px solid #cacaca;
    border-top: 1px solid #cacaca;
    .intro{
      font-size: 14px;
      color: gray;
      padding: 10px;
      line-height: 20px;
    }
  }
  .food_comment_foot{
    background-color: #fff;
    margin-top: 30px;
    padding: 15px;
    border-top: 1px solid #cacaca;
  }
}
</style>
