<template>
  <div class="star-wrap" v-bind:class="starType">
    <span v-for="itemClass in itemClasses" v-bind:class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  /*
    定义常量
  */
  const STAR_LENGTH = 5;  // 定义星星个数 这个限定了保存星星状态数组的长度
  const CLS_ON = 'on';    // 定义星星的类名 CLS_ON 表示一颗星
  const CLS_HALF = 'half';// CLS_HALF 表示半颗星
  const CLS_OFF = 'off';  // CLS_OFF 表示没星


  export default {
    props: {
      // 定义父组件传过来的值的名字
      // size 表示传过来星星图片的尺寸
      // score 表示传过来的分数
      size: {
        // 指定分辨率
        type: Number
      },
      score: {
        // 从后台获取的分数由父组件传递过来
        type: Number
      }
    },
    computed: {
      starType: function() {
        // 返回星星包裹层定义星星大小的类名
        // star-48 表示使用 文件名为 star_48 的星星图片
        return 'star-' + this.size;
      },
      itemClasses: function() {
        // 返回星星样式类名的数组
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);

        // 把所有代表整数量的 CLS_ON 类名放入result 数组
        for(let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }

        // 如果有小数把代表小数的类名 CLS_HALF 放如result 数组
        if(hasDecimal === true) {
          result.push(CLS_HALF);
        }

        // 然后把剩下的位置放入代表没有星的类名 CLS_OFF
        while(result.length < STAR_LENGTH) {
          result.push(CLS_OFF);
        }

        return result;
      }
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .star-wrap
    font-size: 0
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        /*
          这里的 & 表示
          star-item
          连着类名就表示 既有star-item 又有 xx 的类名
          例如
            &.on 表示既有star-item 又有 on 这个类名
        */
        &:last-child
          margin-right: 0
        &.on
          icon-size("star48_on")
        &.off
          icon-size("star48_off")
        &.half
          icon-size("star48_half")
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          icon-size("star36_on")
        &.off
          icon-size("star36_off")
        &.half
          icon-size("star36_half")
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          icon-size("star24_on")
        &.off
          icon-size("star24_off")
        &.half
          icon-size("star24_half")
  .star-wrap .star-item
    display: inline-block
    background-repeat: no-repeat
</style>
