<template>
  <div class="head_component">
    <div class="head_main">
      <div class="avater">
        <img :src='seller.avatar'>
      </div>
      <div class="description">
        <div class="shop_name">
          <img src="./headImg/brand.png">
          <div>{{seller.name}}</div>
        </div>
        <div class="delievery_time">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="full_reduction" v-if='seller.supports'>
          <img src="./headImg/decrease.png">
          <div class="showdescription">{{seller.supports[0].description}}</div>
          <div class="hidedescription" @click="detailPage(true)">
            {{seller.supports.length}}个
          </div>
        </div>
      </div>
    </div>
    <div class="bulletin">
      <img src="./headImg/bulletin.png">
      <div class="div1">{{seller.bulletin}}</div>
      <div @click="detailPage(true)">></div>
    </div>
    <div class="bgimg">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div class="detail_show" v-if="showDetail">
        <div class="store_name">
          <div>{{seller.name}}</div>
          <div></div>
        </div>
        <div class="store_youhui">
          <div class="title">
            <div class="line"></div>
            <div>优惠信息</div>
            <div class="line"></div>
          </div>
          <div class="content" v-for="(item, index) in seller.supports" :key='item.type'>
            <span :class="classMap[index]" class="icon"></span>
            <span>{{item.description}}</span>
          </div>
        </div>
        <div class="store_bulletin">
          <div class="title">
            <div class="line"></div>
            <div>商家公告</div>
            <div class="line"></div>
          </div>
          <p class="store_bulletin_detail">
            {{seller.bulletin}}
          </p>
        </div>
        <div class="close_detail" @click="detailPage(false)">x</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['seller'],
  data () {
    return {
      showDetail: false,
      classMap: [ 'decrease', 'discount', 'guarantee', 'invoice', 'special' ]
    }
  },
  methods: {
    detailPage (isShow) {
      this.showDetail = isShow
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
@mixin bg-img($url) {
  background: url('./headImg/'+ $url + '.png') no-repeat;
}
img {
  display: block;
}
.head_component{
  position: relative;
  color: rgb(255,255,255);
  background: rgba(7,17,27,0.5);
}
.head_main {
  padding: 24px 12px 18px 24px;
  display: flex;
}
.avater{
  width: 64px;
  height: 64px;
  margin-right: 16px;
  img {
    width: 100%;
    height: 100%;
  }
}
.description {
  padding-top: 2px;
  .shop_name {
    display: flex;
    img {
      width: 34px;
      margin-right: 6px;
    }
    div{
      font-size: 16px;
      font-weight: bold;
    }
  }
  .delievery_time{
    font-size: 12px;
    color: rgb(255,255,255);
    font-weight: 200;
    margin-top: 8px;
  }
  .full_reduction{
    display: flex;
    margin-top: 10px;
    font-size: 10px;
    color: rgb(255,255,255);
    height: 16px;
    align-items: center;
    img {
      width: 12px;
      height: 12px;
      margin-right: 4px;
    }
    .hidedescription {
      margin-left: 80px;
      background-color: rgba(7,17,27,0.2);
      width: 47px;
      height: 24px;
      border-radius: 12px;
      text-align: center;
      line-height: 24px;
    }
  }
}
.bulletin{
  display: flex;
  width: 100%;
  align-items: center;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  font-size: 10px;
  background: rgba(7,17,27,0.2);
  img {
    width: 22px;
    height: 12px;
    margin-right: 6px;
  }
  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgb(255,255,255);
  }
  .div1{
    width: 86%;
  }
}
.bgimg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
    filter: blur(10px)
  }
}
.detail_show {
  padding: 80px 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(7,17,27,0.8);
  z-index: 10;
  .store_name {
    font-size: 16px;
    font-weight: 700;
    div {
      text-align: center;
    }
  }
  .store_youhui {
    color: rgb(255,255,255);
    margin-top: 35px;
    .content {
      margin-top: 10px;
      padding-left: 25px;
      font-size: 14px;
      .icon {
        margin-right: 10px;
      }
    }
  }
}
.store_bulletin {
  margin-top: 35px;
}
.store_bulletin_detail {
  padding: 0 25px;
  font-size: 14px;
  line-height: 24px;
  padding-top: 7px;
}
.title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0 20px 0;
  .line {
    width: 119px;
    height: 2px;
    background: rgba(255,255,255,0.2);
  }
}
.close_detail{
  text-align: center;
  font-size: 24px;
  margin-top: 45px;
}
.icon{//要先给span设置出宽高，才能有背景图片
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
  vertical-align: middle;
}
.decrease{
  @include bg-img('decrease')
}
.discount{
  @include bg-img('discount')
}
.guarantee{
  @include bg-img('guarantee')
}
.invoice{
  @include bg-img('invoice')
}
.special{
  @include bg-img('special')
}
</style>
