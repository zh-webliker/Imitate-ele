<template>
  <div>
    <div class='ratingType'>
      <div :class="bgcolor === 0 ? 'active' : ''" @click="chooseRatingType(0)">{{ratingType.all}}{{ratings.length}}</div>
      <div :class="bgcolor === 1 ? 'active' : ''" @click="chooseRatingType(1)">
        {{ratingType.positive}}{{positive.length}}
      </div>
      <div :class="bgcolor === 2 ? 'active' : ''" @click="chooseRatingType(2)">
        {{ratingType.negative}}{{ratings.length - positive.length}}
      </div>
    </div>
    <div class="is_content">
      <div
      class="choose_is_content"
      :class="chooseText === 0 ? 'activeText' : ''"
      @click="haveText()"></div>
      <div>只查看有内容的评论</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ratingType: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    ratings: {
      type: Array,
      dafault () {
        return []
      }
    }
  },
  data () {
    return {
      bgcolor: 0,
      chooseText: 1
    }
  },
  methods: {
    chooseRatingType (type) {
      this.bgcolor = type
      this.$emit('chooseRatingType', type, this.chooseText)
    },
    haveText () {
      if (this.chooseText === 0) {
        this.chooseText = 1
      } else {
        this.chooseText = 0
      }
      this.$emit('haveText', this.bgcolor, this.chooseText)
    }
  },
  computed: {
    positive () {
      return this.ratings.filter((itme) => {
        return itme.rateType === 0
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ratingType{
  margin-top: 10px;
  display: flex;
  padding: 1px 0px;
  div{
    margin-right: 15px;
    padding: 5px 10px;
    background-color: rgba(0,160,220,0.2);
  }
  .active{
    background-color: #00a0dc;
    color: #fff;
  }
}
.is_content{
  margin-top: 15px;
  display: flex;
  align-items: center;
  div{
    margin-right: 15px;
  }
  .choose_is_content{
    width: 20px;
    height: 20px;
    border: solid 1px gray;
  }
  .activeText{
    border: none;
    background-color: rgb(72, 228, 10);
  }
}
</style>
