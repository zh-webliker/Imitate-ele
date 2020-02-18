<template>
  <div class="seller" ref="seller">
    <div class="seller_box">
      <div class="server_box">
        <div class="name">
          <div class="name_detail">
            <div>{{seller.name}}</div>
            <div>
              <start :size='36' :score='seller.deliveryPrice'></start>
              <span class="sell_count">({{seller.ratingCount}})</span>
              <span class="sell_count">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="collection">
            <div class="like" @click="changeLike" :class="{'active': liker === 1}"></div>
            <div>{{liker === 0 ? '收藏' : '已收藏'}}</div>
          </div>
        </div>
        <div class="serve_info">
          <div class="info_detail">
            <div>起送价</div>
            <div><span>{{seller.minPrice}}</span>元</div>
          </div>
          <div class="info_detail">
            <div>商家配送</div>
            <div><span>{{seller.deliveryPrice}}</span>元</div>
          </div>
          <div class="info_detail">
            <div>平均送达时间</div>
            <div><span>{{seller.deliveryTime}}</span>分钟</div>
          </div>
        </div>
      </div>
      <splice></splice>
      <div class="notice_box">
        <div class="title">公告与活动</div>
        <div class="content">{{seller.bulletin}}</div>
        <div class="discount">
          <ul>
            <li v-for='item in seller.supports' :key="item.supports">{{item.description}}</li>
          </ul>
        </div>
      </div>
      <splice></splice>
      <div class="scene_box">
        <div class="title">商场实景</div>
        <div class="content" ref="scene">
          <!-- <div class="inner_content" style="{width: 500px}"> -->
          <div class="inner_content" :style="{width: getWidth + 'px'}">
            <img :src="items" alt="" v-for="(items, index) in seller.pics" :key="index">
          </div>
        </div>
      </div>
      <splice></splice>
      <div class="info_box">
        <div class="title">商场信息</div>
        <div class="content">
          <ul>
            <li v-for='(i, index1) in seller.infos' :key="index1">{{i}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {seller} from '../../api/api'
import start from '../start/start'
import splice from '../splice/splice'
import {mapState, mapMutations} from 'vuex'
import BScroll from 'better-scroll'
export default {
  components: {
    start,
    splice
  },
  data () {
    return {
      seller: {},
      length: 0
    }
  },
  computed: {
    ...mapState({
      liker: 'liker'
    }),
    getWidth () {
      console.log(this.seller)
      return this.length * 120 + 8 * (this.length - 1) // 1.this.seller.pics.length 报错，seller此时是{}，空指针异常；2.computed执行
    }
  },
  methods: {
    ...mapMutations(['changeLike'])
  },
  created () {
    seller().then((res) => {
      console.log(res.data.data, 'seller')
      this.length = res.data.data.pics.length
      this.seller = res.data.data
    })
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new BScroll(this.$refs.scene, {
        click: true,
        scrollX: true
      })
      /* eslint-disable no-new */
      const a = new BScroll(this.$refs.seller, {
        click: true
      })
      console.log(a.hasVerticalScroll, a.scrollerHeight, a)
    })
  }
}
</script>
<style lang="scss" scoped>
.seller{
  position: absolute;
  top: 176px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .seller_box{
    .server_box{
      padding: 10px;
      border-top: 1px solid #f5f5f5;
      .name{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px 15px 10px;
        border-bottom: 1px solid #f5f5f5;
        .name_detail{
          div:nth-child(1){
            font-size: 14px;
            line-height: 14px;
            color: #07111b;
            margin-bottom: 8px;
          }
          div:nth-child(2){
            display: flex;
            .start{
              margin: 0 !important;
            }
            .sell_count{
              margin-left: 10px;
            }
          }
        }
        .collection{
          width: 50px;
          div{
            margin: 0 auto;
            text-align: center;
          }
          .like{
            margin-bottom: 5px;
            width: 20px;
            height: 20px;
            background-color: #e2e3e4;
          }
          .active{
            background-color: rgb(218, 17, 17);
          }
        }
      }
      .serve_info{
        padding: 15px 15px 5px 15px;
        display: flex;
        justify-content: space-between;
        text-align: center;
        .info_detail{
          flex: 1;
          border-right: 1px solid #f5f5f5;
          font-size: 10px;
          line-height: 10px;
          color: #93999f;
          margin-bottom: 4px;
          div:nth-child(2){
            margin-top: 10px;
            span{
              font-size: 24px;
              line-height: 24px;
              color: black;
            }
          }
        }
        .info_detail:last-child{
          border: none;
        }
      }
    }
    .notice_box{
      padding: 15px 20px 0 20px;
      .title{
        font-size: 14px;
        line-height: 14px;
        color: #07111b;
        margin-bottom: 8px;
      }
      .content{
        color: #f01414;
        font-size: 12px;
        line-height: 20px;
        padding-left: 15px;
      }
      .discount{
        padding: 15px 15px 0 15px;
        ul{
          list-style: none;
          margin: 0;
          padding: 0;
          li{
            padding: 15px 0px;
            font-size: 12px;
            border-top: 1px solid #f5f5f5;
          }
        }
      }
    }
    .scene_box{
      padding: 15px 20px 0 20px;
      height: 130px;
      position: relative;
      .title{
        font-size: 14px;
        line-height: 14px;
        color: #07111b;
        margin-bottom: 8px;
      }
      .content{
        position: absolute;
        top: 35px;
        left: 20px;
        right: 0px;
        bottom: 10px;
        overflow: hidden;
        .inner_content{
          height: 100%;
          display: flex;
          // width: 500px;
          img{
            display: block;
            width: 120px;
            height: 90px;
            margin-right: 8px;
          }
        }
      }
    }
    .info_box{
      padding: 15px 20px 0 20px;
      .title{
        font-size: 14px;
        line-height: 14px;
        color: #07111b;
        margin-bottom: 8px;
      }
      .content{
        ul{
          list-style: none;
          padding: 0;
          margin: 0;
          li{
            padding: 15px 0px;
            font-size: 12px;
            border-top: 1px solid #f5f5f5;
          }
        }
      }
    }
  }
}
</style>
