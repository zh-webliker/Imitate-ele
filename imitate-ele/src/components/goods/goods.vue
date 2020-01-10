<template>
  <div class="goods">
    <div class="left_food_title" ref="menuWrapper">
      <ul class="food_title">
        <li v-for="(item, index) in goodsAtroduce" :key="index" @click="clickMenuItem(index,$event)" :class="index == current ? 'active' : ''">{{item.name}}</li>
      </ul>
    </div>
    <div class="right_food_detail" ref="foodsWrapper">
      <div class="food_detail_box">
        <div v-for="(good, index1) in goodsAtroduce" :key='index1' class="food_unit">
          <div class="unit_name"><div class="line"></div>{{good.name}}</div>
          <div v-for='(items, index2) in good.foods' :key='index2' class="unit_have_food" @click="clickFood(items,$event)">
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
    <food :food='selectedFood' ref="foodChild"></food>
  </div>
</template>

<script>
import { goods } from '../../api/api'
import BScroll from 'better-scroll'
import Vue from 'vue'

import food from '../food/food.vue'
export default {
  data () {
    return {
      goodsAtroduce: [],
      tops: [],
      current: 0,
      selectedFood: {}
    }
  },
  components: {
    food
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
          this._initTops()
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
    },
    _initTops () {
      let top = 0
      this.tops.push(top)
      let lis = this.$refs.foodsWrapper.getElementsByClassName('food_unit')
      ;[].slice.call(lis).forEach(li => {
        // 拿到div的高度
        console.log(li.clientHeight, top)
        top += li.clientHeight
        // 拿到每个标题对应的位置
        this.tops.push(top)
      })
    },
    clickMenuItem (index, event) {
      if (!event._constructed) { //  如果没有这个属性，则认为是原生事件，不执行下面函数
        return
      }
      console.log(index)
      // 点击菜单右边滚到对应位置
      this.current = index
      var li = this.$refs.foodsWrapper.getElementsByClassName('food_unit')[index]
      this.foodsScroll.scrollToElement(li, 300)
    },
    clickFood (food, event) {
      console.log(food, event)
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.foodChild.show(true) // this.$refs.子组件ref名.子组件方法 调用子组件方法
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
  background-color: #fff !important;
}
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
    flex: 1;
    overflow: hidden;
    .food_detail_box{
      height: auto;
    }
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
