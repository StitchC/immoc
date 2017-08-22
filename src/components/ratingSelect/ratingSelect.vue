<template>
  <div class="rating-select-wrap">
    <div class="rating-type-wrap border-1px">
      <span class="rating-all-btn" v-bind:class="{'active': childSelectType === 2}" v-on:click="select(2,$event)">{{desc.all}}<span>{{ratings.length}}</span></span>
      <span class="rating-positive-btn" v-bind:class="{'active': childSelectType === 0}" v-on:click="select(0,$event)">{{desc.positive}}<span>{{positiveCount.length}}</span></span>
      <span class="rating-negative-btn" v-bind:class="{'active': childSelectType === 1}" v-on:click="select(1,$event)">{{desc.negative}}<span>{{negativeCount.length}}</span></span>
    </div>
    <div class="rating-only-content">
      <span class="check-icon icon-check_circle" v-bind:class="{'active': onlyContent === true}" v-on:click="toggleContent"></span>
      <span class="txt">只查看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    data: function() {
      return {
        childSelectType: this.selectType,
        childOnlyContent: this.onlyContent
      };
    },
    props: {
      ratings: {
        // 保存对应商品的评论
        type: Array,
        default: function() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default: function() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positiveCount: function() {
        return this.ratings.filter((item) => {
          return item.rateType === POSITIVE;
        });
      },
      negativeCount: function() {
        return this.ratings.filter((item) => {
          return item.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select: function(type, event) {
        if (!event._constructed) {
          return;
        }
        this.childSelectType = type;
        this.$emit('select-change', [type]);
      },
      toggleContent: function(event) {
        if (!event._constructed) {
          return;
        }
        this.childOnlyContent = !this.childOnlyContent;
        this.$emit('toggle-content', [this.childOnlyContent]);
      }
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .rating-select-wrap
    .rating-type-wrap
      padding: 12px 0 18px 0
      margin: 0 18px
      border-1px(rgba(7,17,27,0.1))
      font-size: 0
      .rating-all-btn
        display: inline-block
        line-height: 16px
        padding: 8px 12px
        margin-right: 8px
        border-radius: 2px
        font-size: 12px
        color: rgb(77,85,93)
        background-color: rgba(0,160,220,0.2)
        &.active
          background-color: rgba(0,160,220,1)
          color: #fff
        span
          font-size: 10px
      .rating-positive-btn
        isplay: inline-block
        line-height: 16px
        padding: 8px 12px
        margin-right: 8px
        border-radius: 2px
        font-size: 12px
        ccolor: rgb(77,85,93)
        background-color: rgba(0,160,220,0.2)
        &.active
          background-color: rgba(0,160,220,1)
          color: #fff
        span
          font-size: 10px
      .rating-negative-btn
        isplay: inline-block
        line-height: 16px
        padding: 8px 12px
        margin-right: 8px
        border-radius: 2px
        font-size: 12px
        ccolor: rgb(77,85,93)
        background-color: rgba(77,85,93,0.2)
        &.active
          background-color: rgba(77,85,93,1)
          color: #fff
        span
          font-size: 10px
    .rating-only-content
      line-height: 24px
      padding: 12px 18px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      .check-icon
        line-height: 24px
        vertical-align: middle
        margin-right: 4px
        font-size: 24px
        color: rgb(147,153,159)
        &.active
          color: #00c850;
      .txt
        line-height: 24px
        color: rgb(147,153,159)
        font-size: 12px
</style>
