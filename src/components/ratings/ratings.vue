<template>
  <div class="ratings-wrap">
    <div class="rating-main">
      <div class="rating-header">
        <div class="overview-left">
          <h3 class="score">{{seller.data.score}}</h3>
          <p class="txt">综合评分</p>
          <p class="rank">高于周边商家{{seller.data.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <div class="service-score">
            <span class="txt">服务态度</span>
            <star v-bind:size="36" v-bind:score="seller.data.serviceScore"></star>
            <span class="score">{{seller.data.serviceScore}}</span>
          </div>
          <div class="food-score">
            <span class="txt">商品评价</span>
            <star v-bind:size="36" v-bind:score="seller.data.foodScore"></star>
            <span class="score">{{seller.data.foodScore}}</span>
          </div>
          <div class="deliever-time">
            <span class="txt">送达时间</span>
            <span class="deliver-time">{{seller.data.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select></rating-select>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  import ratingselect from 'components/ratingSelect/ratingSelect.vue';

  export default {
    data: function() {
      return {

      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star: star,
      split: split,
      'rating-select': ratingselect
    }
  };
</script>

<style lang="stylus">
  .rating-main
    .rating-header
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(7,17,27,0.1)
        text-align: center
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255,153,0)
        .txt
          line-height: 12px
          margin-bottom: 8px
          font-size: 12px
          color: rgb(7,17,27)
        .rank
          line-height: 10px
          margin-bottom: 6px
          font-size: 10px
          color: rgba(7,17,27,0.5)
      .overview-right
        flex: 1
        padding-left: 24px
        padding-right: 24px
        .service-score,
        .food-score
          line-height: 18px
          .txt
            margin-right: 6px
            font-size: 12px
            color: rgb(7,17,27)
          .score
            margin-left: 6px
            font-size: 12px
            color: rgb(255,153,0)
          .star-wrap
            display: inline-block
            vertical-align: top

        .deliever-time
          line-height: 18px
          .txt
            margin-right: 6px
            font-size: 12px
            color: rgb(7,17,27)
          .deliver-time
            font-size: 12px
            color: rgb(147,153,159)
</style>
