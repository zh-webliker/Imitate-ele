<template>
  <div class="goods">
    <div class="left_food_title">
      <ul class="food_title">
        <li v-for="(item, index) in goodsAtroduce" :key="index">{{item.name}}</li>
      </ul>
    </div>
    <div class="right_food_detail">
      <div v-for="(good, index1) in goodsAtroduce" :key='index1' class="food_unit">
        <div class="unit_name">{{good.name}}</div>
        <div v-for='(items, index2) in good.foods' :key='index2' class="unit_have_food">
          <img :src="items.image" class="food_img">
          <div class="food_introduce">
            <div class="food_name">{{items.name}}</div>
            <div class="food_flavor">{{items.description}}</div>
            <div class="food_sell">
              <span>月售{{items.sellCount}}</span>
              <span>好评率{{items.sellCount}}</span>
            </div>
            <div class="food_price">￥{{items.price}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goods } from '../../api/api'

export default {
  data () {
    return {
      goodsAtroduce: []
    }
  },
  methods: {

  },
  created () {
    goods().then(res => {
      console.log(res.data.data)
      this.goodsAtroduce = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.goods{
  display: flex;
  position: relative;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // top: 0;
  .left_food_title{
    width: 100px;
    ul{
      padding: 0;
      margin: 0;
      li{
        list-style: none;
        border-bottom: 1px solid #cacaca;
        background-color: #f3f5f7;
        height: 55px;
      }
    }
  }
  // .right_food_detail .food_unit{

  // }
  .right_food_detail{
    position: absolute;
    top: 0;
    left: 100px;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }
}
.food_img{
  width: 64px;
  height: 64px;
}
</style>
