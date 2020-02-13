<template>
  <div class="ratings_" ref='ratings_'>
    <div class="ratings_page">
      <div class="shop_info">
        <div class="infp_left">
          <div>{{seller.score}}</div>
          <div>综合评分</div>
          <div>高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="info_right">
          <div class="serve">
            <div>服务态度</div>
            <start :score='seller.serviceScore' :size='24'></start>
            <div>{{seller.serviceScore}}</div>
          </div>
          <div class="goods">
            <div>商品评分</div>
            <start :score='seller.foodScore' :size='24'></start>
            <div>{{seller.foodScore}}</div>
          </div>
          <div class="delivery">
            <span>送达时间</span>
            <span>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <splice></splice>
      <div class="ratingList">
        <ratingSelect
          :ratingType='ratingType'
          :ratings='oldRatings'
          @chooseRatingType='chooseRatingType'
          @haveText='chooseRatingType'></ratingSelect>
          <ul>
            <li v-for='(items, index) in ratings' :key="index">
              <div class="user_avter">
                <img :src="items.avatar" alt="">
              </div>
              <div class="user_info">
                <div>
                  <div>{{items.username}}</div>
                  <div>{{nowTime(items.rateTime)}}</div>
                </div>
                <div>
                  <start :score='items.score' :size='24'></start>
                  <div class="time">{{items.deliveryTime}}分钟送达</div>
                </div>
                <div class="text">{{items.text}}</div>
                <div>
                  <span>{{items.rateType === 0 ? '好评' : '差评'}}</span>
                  <span
                  class="title"
                  v-for="(item, i) in items.recommend"
                  :key='i'>{{item}}</span>
                </div>
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import ratingSelect from '../ratingSelect/ratingSelect'
import splice from '../splice/splice'
import start from '../start/start'
import {ratings, seller} from '../../api/api'
import {nowTime} from '../../common/common'
let ratingArray = []
export default{
  components: {
    ratingSelect,
    splice,
    start
  },
  data () {
    return {
      ratings: [],
      oldRatings: [],
      seller: '',
      ratingType: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      contentType: 0
    }
  },
  created () {
    ratings().then((res) => {
      console.log(res, 'res')
      this.ratings = res.data.data
      console.log(this.ratings.length)
      this.oldRatings = res.data.data
    })
    seller().then((res) => {
      console.log(res, 'seller')
      this.seller = res.data.data
    })
    Vue.nextTick(() => {
      this.scroll = new BScroll(this.$refs.ratings_, {
        click: true
      })
    })
  },
  methods: {
    // nowTimeP (time) {
    //   console.log(nowTime(time))
    // },
    chooseRatingType (type, val) {
      console.log(type, val, 'type')
      this.contentType = type
      this.chooseRatingList(type)
      this.chooseIsText(val)
      ratingArray = []
    },
    chooseRatingList (type) {
      // const oldRatings = this.ratings
      const length = this.oldRatings.length
      if (type === 0) {
        this.ratings = this.oldRatings
        ratingArray = this.oldRatings
      } else if (type === 1) {
        for (let i = 0; i < length; i++) {
          if (this.oldRatings[i].rateType === 0) {
            ratingArray.push(this.oldRatings[i])
          }
        }
        this.ratings = ratingArray
      } else if (type === 2) {
        for (let i = 0; i < length; i++) {
          if (this.oldRatings[i].rateType === 1) {
            ratingArray.push(this.oldRatings[i])
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
  computed: {
    nowTime () {
      return function (time) {
        return nowTime(time)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ratings_{
  overflow: hidden;
  position: absolute;
  top: 176px;
  bottom: 0;
  left: 0;
  right: 0;
  .ratings_page{
  }
}
.shop_info{
  display: flex;
  .infp_left{
    padding: 10px 20px;
    text-align: center;
    div:nth-child(1){
      font-size: 24px;
      line-height: 28px;
      color: #f90;
      margin-bottom: 6px;
    }
    div:nth-child(2){
      font-size: 12px;
      line-height: 12px;
      color: #07111b;
      margin-bottom: 8px;
    }
    div:nth-child(3){
      font-size: 10px;
      line-height: 10px;
      color: #93999f;
    }
  }
  .info_right{
    width: 60%;
    padding: 10px 0;
    .serve,.goods,.delivery{
      display: flex;
      margin-bottom: 8px;
      line-height: 18px;
      text-align: center;
      div:nth-child(1),span:nth-child(1){
        font-size: 12px;
        color: #07111b;
        margin-left: 60px;
      }
      div:nth-child(2){
        margin-left: 12px;
        font-size: 12px;
        color: #f90;
      }
      span:nth-child(2){
        margin-left: 12px;
        display: inline-block;
        font-size: 12px;
        color: #93999f;
      }
    }
  }
}
.ratingList{
  padding: 10px 15px;
  ul{
    list-style: none;
    padding: 0;
    li{
      display: flex;
      margin-top: 15px;
      border-bottom: 1px solid #f3f5f7;
      .user_avter img{
        width: 25px;
        height: 25px;
      }
      .user_info{
        padding: 0 15px;
        width: 80%;
        div:nth-child(1){
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          line-height: 12px;
          color: #93999f;
          margin-bottom: 5px;
        }
        div:nth-child(2){
          display: flex;
          font-size: 10px;
          font-weight: 200;
          line-height: 12px;
          color: #93999f;
          margin-bottom: 5px;
          .time{
            margin-left: 10px;
          }
        }
        .text{
          font-size: 12px;
          line-height: 18px;
          color: #07111b;
          margin-bottom: 8px;
        }
        div:nth-child(4){
          padding: 0 0 10px 0;
          span{
            display: inline-block;
            color: #93999f;
            font-size: 9px;
          }
          .title{
            margin-right: 5px;
            padding: 0 6px;
            line-height: 16px;
            margin: 0 0 4px 8px;
            border: 1px solid rgba(7,17,27,0.1);
          }
        }
      }
    }
    li:last-child(){
      border: none;
    }
  }
}
img{
  display: block;
}
</style>
