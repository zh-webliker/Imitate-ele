<template>
  <div class="cart_control">
    <div class="reduce" @click.stop="reduce" v-if="singleNum != 0">-</div>
    <div class="count" v-if="singleNum != 0">{{singleNum}}</div>
    <div class="add" @click.stop="add">+</div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  props: {
    singlePrice: {
      type: Number,
      default: 0
    },
    singleNumP: {
      type: Number,
      default: 0
    },
    dataIndex: {
      type: Object,
      default () {
        return {
          index1: '',
          index2: ''
        }
      }
    }
  },
  data () {
    return {
      singleNum: 0
    }
  },
  computed: {
    ...mapState(['totalNum'])
  },
  methods: {
    ...mapMutations(['goodsAdd', 'goodsReduce']),
    reduce () {
      this.goodsReduce()
      if (this.singleNum > 0) {
        this.singleNum = this.singleNum - 1
      }
      this.$emit('getTotalPrice', this.singlePrice, 'reduce', this.singleNum, this.dataIndex)
    },
    add () {
      this.goodsAdd()
      this.singleNum = this.singleNum + 1
      console.log(this.singleNum)
      this.$emit('getTotalPrice', this.singlePrice, 'add', this.singleNum, this.dataIndex)
    },
    updatasingleNumP (val) {
      this.singleNum = val
    }
  },
  watch: {
    singleNumP: function (val) { // watch 监听数据改变，此时需要对dom进行显示隐藏的时候，就需要在methods写一个方法，然后调用methods里的方法
      this.updatasingleNumP(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.cart_control{
  display: flex;
  .reduce,.add{
    width: 16px;
    line-height: 16px;
    height: 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }
  .count{
    margin: 0 10px;
  }
  .reduce{
    border: 1px solid #00a0dc;
    color: #00a0dc;
  }
  .add{
    border: 1px solid #00a0dc;
    background-color: #00a0dc;
    color: #ffffff;
  }
}
</style>
