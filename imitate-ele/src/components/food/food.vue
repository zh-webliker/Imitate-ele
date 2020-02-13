<template>
  <transition name="move">
    <div v-show="isShow" ref="food" class="food">
      <div class="food_wrap">
        <div class="food_info_head">
          <div class="head_img">
            <img :src="food.icon" alt />
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
          <div>
            <ratingSelect
            :ratingType='ratingType'
            :ratings='ratingsLength'
            @chooseRatingType='chooseRatingType'
            @haveText='chooseRatingType'></ratingSelect>
          </div>
          <div class="rating_list">
            <ul>
              <li v-for='(items, index) in ratings' :key='index'>
                <div class="user_info">
                  <div class="rateTime">{{nowTime(items.rateTime)}}</div>
                  <div class="name">
                    <div>{{items.username}}</div>
                    <img :src="items.avatar" alt="">
                  </div>
                </div>
                <div class="content">{{items.rateType === 0 ? '好评' : '差评'}}：{{items.text}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import ratingSelect from '../ratingSelect/ratingSelect'
import {nowTime} from '../../common/common'
let ratingArray = []
export default {
  props: {
    food: Object
  },
  components: {
    ratingSelect
  },
  data () {
    return {
      ratings: this.food.ratings,
      ratingsLength: [],
      isShow: false,
      ratingType: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      contentType: 0
    }
  },
  created () {
  },
  computed: {
    nowTime () {
      return function (time) {
        return nowTime(time)
      }
    }
  },
  methods: {
    show (isShow) {
      this.isShow = !this.isShow
      if (isShow) {
        // 判断数据存在，在执行vue.nextTick()方法
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
    },
    chooseRatingType (type, val) {
      console.log(type, val, 'type')
      this.contentType = type
      this.chooseRatingList(type)
      this.chooseIsText(val)
      ratingArray = []
    },
    chooseRatingList (type) {
      const oldRatings = this.food.ratings
      console.log(this.ratings, oldRatings)
      const length = oldRatings.length
      if (type === 0) {
        this.ratings = oldRatings
        ratingArray = oldRatings
      } else if (type === 1) {
        for (let i = 0; i < length; i++) {
          if (oldRatings[i].rateType === 0) {
            ratingArray.push(oldRatings[i])
          }
        }
        this.ratings = ratingArray
      } else if (type === 2) {
        for (let i = 0; i < length; i++) {
          if (oldRatings[i].rateType === 1) {
            ratingArray.push(oldRatings[i])
          }
        }
        this.ratings = ratingArray
      }
    },
    chooseIsText (val) {
      let newRatingsArray = []
      if (val === 0) {
        for (let i = 0; i < ratingArray.length; i++) {
          if (ratingArray[i].text === '') {
          } else {
            newRatingsArray.push(ratingArray[i])
          }
        }
        this.ratings = newRatingsArray
      }
    }
  },
  watch: {
    'food.ratings': function (val) { // 异步问题导致props传过来的值不能准确赋给data里的值，所以用watch监听
      this.ratings = val
      this.ratingsLength = val
    }
    // contentType: {
    //   handler (newVal, oldVal) {
    //     console.log(newVal, oldVal)
    //     const length = this.foods.ratings.length
    //     const ratingArray = []
    //     if (newVal === 0) {
    //       this.foods = this.food
    //     } else if (newVal === 1) {
    //       for (let i = 0; i < length; i++) {
    //         if (this.foods.ratings.rateType === 0) {
    //           ratingArray.push(this.foods.ratings.rateType)
    //         }
    //       }
    //       this.foods = ratingArray
    //     } else if (newVal === 2) {
    //       for (let i = 0; i < length; i++) {
    //         if (this.foods.ratings.rateType === 1) {
    //           ratingArray.push(this.foods.ratings.rateType)
    //         }
    //       }
    //       this.food = ratingArray
    //     }
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.food {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 48px;
  z-index: 30;
  overflow: hidden;
  background: #f3f5f7;
  .food_info_head {
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #cacaca;
    .head_img {
      width: 100%;
      img {
        width: 100%;
      }
      .back {
        position: absolute;
        top: 10px;
        left: 10px;
        .icon_arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
          &::after {
            content: "<";
          }
        }
      }
    }
    .head_sell,
    .head_name,
    .head_buy {
      padding: 5px;
    }
    .head_buy {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .buy_shopcart {
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
  .food_intro_body {
    background-color: #fff;
    margin-top: 30px;
    padding: 15px;
    border-bottom: 1px solid #cacaca;
    border-top: 1px solid #cacaca;
    .intro {
      font-size: 14px;
      color: gray;
      padding: 10px;
      line-height: 20px;
    }
  }
  .food_comment_foot {
    background-color: #fff;
    margin-top: 30px;
    padding: 15px;
    border-top: 1px solid #cacaca;
    .rating_list{
      ul{
        list-style: none;
        li{
          margin-top: 15px;
          .user_info{
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            .name{
              display: flex;
              img{
                width: 10px;
                height: 10px;;
              }
            }
          }
          .content{
            font-size: 14px;
          }
        }
      }
    }
  }
}
.food_wrap{

}
img{
  display: block;
}
</style>
