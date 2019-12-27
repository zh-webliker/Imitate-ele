<template>
  <div class="goods">
    <div class="left_food_title" ref="menuWrapper">
      <ul class="food_title">
        <li v-for="(item, index) in goodsAtroduce" :key="index">{{item.name}}</li>
      </ul>
    </div>
    <div class="right_food_detail" ref="foodsWrapper">
      <div>
        <div v-for="(good, index1) in goodsAtroduce" :key='index1' class="food_unit">
          <div class="unit_name"><div class="line"></div>{{good.name}}</div>
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
  </div>
</template>

<script>
import { goods } from '../../api/api'
import BScroll from 'better-scroll'
import Vue from 'vue'

export default {
  data () {
    return {
      goodsAtroduce: []
    }
  },
  created () {
    goods().then(res => {
      console.log(res.data)
      // this.goodsAtroduce = res.data.data
      if (res.data.code === 0) {
        this.goodsAtroduce = res.data.data
        Vue.nextTick(() => {
          // 初始化滚动条
          this.initScroll()
        })
      }
    })
  },
  methods: {
    initScroll () {
      // 创建分类列表的Scroll
      /* eslint-disable no-new */
      new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      // 创建food的Scroll
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      })
      // 绑定scroll监听
      this.foodsScroll.on('scroll', (pos) => {
        console.log(pos.y, 'pos')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.goods{
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 181px;
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
  .right_food_detail{
    // position: absolute;
    // top: 0;
    // left: 100px;
    // right: 0;
    // bottom: 0;
    overflow: hidden;
  }
}
.food_img{
  width: 64px;
  height: 64px;
}
.unit_name{
  background-color: #f3f5f7;
  height: 30px;
  line-height: 30px;
  display: flex;
  .line{
    width: 3px;
    background-color: #93999f;
    margin-right: 15px;
  }
}
.unit_have_food{
  background-color: #fff;
  display: flex;
  margin: 20px;
  padding: 10px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  .food_img{
    margin-right: 15px;
  }
}
.unit_have_food:last-child{
  border-bottom: none;
}

</style>
