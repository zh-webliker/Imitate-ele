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
          <div v-for='(items, index2) in good.foods' :key='index2' class="unit_have_food" @click="clickFood(items,$event,index1,index2)">
            <img :src="items.image" class="food_img">
            <div class="food_introduce">
              <div class="food_name">{{items.name}}</div>
              <div class="food_flavor">{{items.description}}</div>
              <div class="food_sell">
                <span>月售{{items.sellCount}}</span>
                <span>好评率{{items.sellCount}}</span>
              </div>
              <div class="food_price">
                <div>￥{{items.price}}</div>
                <div>
                  <Carcontrol
                  :singlePrice='items.price'
                  :singleNumP='goodsAtroduce[index1].foods[index2].count'
                  :dataIndex='{index1: index1, index2: index2}'
                  @getTotalPrice='getTotalPrice'
                  ></Carcontrol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shopcart">
      <Shopcart :totalPrice='20' :shopNum='1'></Shopcart>
    </div>
    <Food :food='selectedFood'
    @emitSingleNum='emitSingleNum'
    ref="foodChild"></Food>
  </div>
</template>

<script>
// import内容要有顺序，最上面是框架模块，然后是第三方库模块，然后是自己的组件模块，再是api层的模块
import Vue from 'vue'
import BScroll from 'better-scroll'
import Shopcart from '../shopcart/shopcart'
import Carcontrol from '../cartContro/cartContro'
import Food from '../food/food.vue'
import {mapState, mapMutations} from 'vuex'
import { goods } from '../../api/api'
export default {
  data () {
    return {
      goodsAtroduce: [],
      tops: [],
      current: 0,
      selectedFood: {}
      // singleNumP: 0
    }
  },
  components: {
    Food,
    Shopcart,
    Carcontrol
  },
  computed: {
    ...mapState(['totalPrice', 'array1', 'array2'])
  },
  created () {
    goods().then(res => {
      if (res.data.code === 0) {
        // this.goodsAtroduce = res.data.data
        let list = res.data.data
        list.forEach((item) => {
          item.foods.forEach(food => {
            food.count = 0
          })
        })
        console.log(list, 'data')
        this.goodsAtroduce = list
        console.log(this.goodsAtroduce, 'this.goodsAtroduce')
        Vue.nextTick(() => {
          // 初始化滚动条
          this.initScroll()
          this._initTops()
        })
      }
    })
  },
  methods: {
    ...mapMutations(['getTotalPriceV', 'getGoodsIndex', 'goodsAdd']),
    emitSingleNum (val) {
      console.log(val, 'val')
      console.log(this.array1, this.array2)
      this.goodsAtroduce[this.array1].foods[this.array2].count = val
    },
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
    clickFood (food, event, index1, index2) {
      console.log(food, event, index1, index2)
      this.getGoodsIndex({array1: index1, array2: index2})
      console.log(this.array1, this.array2)
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.foodChild.show(true) // this.$refs.子组件ref名.子组件方法 调用子组件方法
    },
    getTotalPrice (val, type, count, dataIndex) {
      console.log('getTotalPrice', type, count)
      this.goodsAtroduce[dataIndex.index1].foods[dataIndex.index2].count = count
      this.getTotalPriceV({num: val, type: type}) // vuex mutation 方法传参,getTotalPriceV接收的时候是一个对象
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
  background-color: #fff !important;
}
.shopcart{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: #141d27;
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
      .food_price{
        display: flex;
        justify-content: space-between;
      }
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
