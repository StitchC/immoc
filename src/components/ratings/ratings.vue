<template>
  <div class="ratings-wrap" ref="ratingScroll">
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
      <rating-select v-bind:select-type="selectType" v-bind:only-content="onlyContent" v-bind:ratings="ratings" v-on:toggle-content="toggleContent" v-on:select-change="selectChange"></rating-select>
      <div class="rating-list-wrap">
        <ul class="rating-list">
          <li class="rating-item border-1px" v-for="rating in ratings" v-show="ratingShow(rating.rateType, rating.text)">
            <div class="avatar-wrap">
              <img v-bind:src="rating.avatar">
            </div>
            <div class="rating-content">
              <div class="content-header">
                <div class="username">{{rating.username}}</div>
                <div class="publish-time">{{rating.rateTime | formateDate}}</div>
                <div class="score">
                  <star v-bind:size="24" v-bind:score="rating.score" class="star"></star>
                  <span class="delivery-time" v-show="rating.deliveryTime !== '' && rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
              </div>
              <p class="content-txt">{{rating.text}}</p>
              <div class="content-recommend">
                <span v-bind:class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                <span class="recommend-item" v-for="recommend in rating.recommend" v-show="rating.recommend.length != 0 && rating.recommend">{{recommend}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  import ratingselect from 'components/ratingSelect/ratingSelect.vue';
  import Betscroll from 'better-scroll';
  import {formateDate} from '../../common/js/date.js';

  const ALL = 2;
  const ERR_OK = 0;
  export default {
    data: function() {
      return {
        scroll: null,
        ratings: [],
        selectType: ALL,
        onlyContent: false
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    created: function() {
      console.log('评论组件创建');
      console.log(this.$refs.ratingScroll);
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if(response.errno === ERR_OK) {
          this.ratings = response.data;
        }
      });
    },
    mounted: function() {
      console.log('评论组件编译完毕');
      this.$nextTick(() => {
        this.initScroll();
        console.log(this.$refs.ratingScroll);
      });
    },
    updated: function() {
      console.log('评论组件更新完毕');
      this.$nextTick(() => {
        this.initScroll();
        console.log(this.$refs.ratingScroll);
      });
    },
    components: {
      star: star,
      split: split,
      'rating-select': ratingselect
    },
    filters: {
      formateDate: function(time) {
        let date = new Date(time);
        return formateDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      toggleContent: function(bool) {
        this.onlyContent = bool[0];
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      selectChange: function(type) {
        this.selectType = type[0];
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      ratingShow: function(type, txt) {
        if(this.onlyContent === true && (txt === '' || !txt)) {
          return false;
        }

        if(this.selectType === ALL) {
          return true;
        }else {
          return type === this.selectType;
        }
      },
      initScroll: function() {
        if(!this.scroll) {
          this.scroll = new Betscroll(this.$refs.ratingScroll, {
            click: true
          });
        }else {
          this.scroll.refresh();
        }
      }
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings-wrap
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
  .rating-main
    .rating-header
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(7,17,27,0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
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
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .service-score,
        .food-score
          line-height: 18px
          font-size: 0
          .txt
            margin-right: 12px
            font-size: 12px
            color: rgb(7,17,27)
          .score
            margin-left: 12px
            font-size: 12px
            color: rgb(255,153,0)
          .star-wrap
            display: inline-block
            vertical-align: top
        .deliever-time
          line-height: 18px
          font-size: 0
          .txt
            margin-right: 12px
            font-size: 12px
            color: rgb(7,17,27)
          .deliver-time
            font-size: 12px
            color: rgb(147,153,159)
    .rating-list-wrap
      .rating-list
        padding: 0 18px
        .rating-item
          display: flex
          padding: 18px 0
          border-1px(rgba(7,17,27,0.1))
          .avatar-wrap
            flex: 0 0 28px
            width: 28px
            padding-right: 12px
            img
              width: 28px
              height: 28px
              border-radius: 50%
          .rating-content
            flex: 1
            .content-header
              font-size: 0
              .username
                display: inline-block
                width: 50%
                height: 12px
                line-height: 12px
                font-size: 10px
                color: rgb(7,17,27)
              .publish-time
                display: inline-block
                width: 50%
                height: 12px
                line-height: 12px
                text-align: right
                font-size: 10px
                color: rgb(147,153,159)
              .score
                margin: 4px 0 6px 0
                .star
                  display: inline-block
                  margin-right: 6px
                .delivery-time
                  line-height: 12px
                  font-size: 10px
                  color: rgb(147,153,159)
            .content-txt
              margin-bottom: 8px
              line-height: 18px
              font-size: 12px
              color: rgb(7,17,27)
            .content-recommend
              .icon-thumb_up
                margin-right: 6px
                line-height: 16px
                font-size: 12px
                color: rgb(0,160,220)
              .icon-thumb_down
                margin-right: 6px
                line-height: 16px
                font-size: 12px
                color: rgb(183,187,191)
              .recommend-item
                vertical-align: middle
                height: 16px
                line-height: 16px
                margin-top: 8px
                margin-right: 8px
                padding: 0 6px
                border: 1px solid rgba(7,17,27,0.1)
                border-radius: 2px
                background-color: #fff
                font-size: 9px
                color: rgb(147,153,159)
</style>
