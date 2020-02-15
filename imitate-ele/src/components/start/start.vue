<template>
  <div class="start">
    <span v-for="(i, index) in getStartNum" :key='index' :class="'start'+size+'_on'"></span>
    <span :class="'start'+size+'_'+getLastStart"></span>
    <span v-for="(e, index1) in getOffStart" :key="index1+'id'" :class="'start'+size+'_off'"></span>
    <!--  -->
  </div>
</template>
<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 36
    }
  },
  data () {
    return {
      scoreInt: this.score
    }
  },
  computed: {
    getStartNum () {
      return Math.floor(this.scoreInt)
    },
    getLastStart () {
      let bgImg = ''
      const num = this.scoreInt - this.getStartNum
      if (num !== 0) {
        if (num < 1) {
          if (num > 0.5) {
            bgImg = 'half'
          } else if (num < 0.5) {
            bgImg = 'off'
          }
        }
      }
      return bgImg
    },
    getOffStart () {
      const offNum = 5 - this.scoreInt
      let offNumInt = 0
      if (offNum >= 1) {
        offNumInt = Math.floor(offNum)
      }
      return offNumInt
    }
  },
  watch: {
    score: function (val) {
      this.scoreInt = val
    }
  }
}
</script>
<style lang="scss" scoped>
img{
  display: block;
}
.start{
  margin: 0 10px;
  font-size: 0 !important; // 解决循环出的span与写出的Span之间出现的间距
  span{
    display: inline-block;
    margin-right: 3px;
  }
  .start24_on{
    width: 10px;
    height: 10px;
    background: url('./star24_on@2x.png');
    background-size: 10px 10px; // 要写在background后才生效
  }
  .start36_on{
    width: 15px;
    height: 15px;
    background: url('./star36_on@2x.png');
    background-size: 15px 15px;
  }
  .start48_on{
    width: 20px;
    height: 20px;
    background: url('./star48_on@2x.png');
    background-size: 20px 20px;
  }
  .start24_half{
    width: 10px;
    height: 10px;
    background: url('./star24_half@2x.png');
    background-size: 10px 10px;
  }
  .start36_half{
    width: 15px;
    height: 15px;
    background: url('./star36_half@2x.png');
    background-size: 15px 15px;
  }
  .start48_half{
    width: 20px;
    height: 20px;
    background: url('./star48_half@2x.png');
    background-size: 20px 20px;
  }
  .start24_off{
    width: 10px;
    height: 10px;
    background: url('./star24_off@2x.png');
    background-size: 10px 10px;
  }
  .start36_off{
    width: 15px;
    height: 15px;
    background: url('./star36_off@2x.png');
    background-size: 15px 15px;
  }
  .start48_off{
    width: 20px;
    height: 20px;
    background: url('./star48_off@2x.png');
    background-size: 20px 20px;
  }
}
</style>
