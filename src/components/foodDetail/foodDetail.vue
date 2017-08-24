<template>
   <transition name="detail-show">
     <div class="food-detail-scroll-wrap" ref="foodDetailWrap"  v-show="showFlag">
       <div class="food-detail-wrap">
         <div class="food-photo">
           <img :src="food.image">
           <i class="back icon-arrow_lift" v-on:click="back"></i>
         </div>
         <div class="food-content">
           <h3 class="food-name">{{food.name}}</h3>
           <div class="food-extra">
             <span>月售{{food.sellCount}}份</span>
             <span>好评率{{food.rating}}%</span>
           </div>
           <div class="food-operate">
             <div class="food-price-wrap">
               <span class="cur-price">￥{{food.price}}</span>
               <span class="old-price" v-show="food.oldPrice !== ''">￥{{food.oldPrice}}</span>
             </div>
             <div class="food-count-ctrl">
               <transition name="btn-move">
                 <span class="add-good-btn" v-on:click.stop="addFirst($event)" v-show="!food.count || food.count === 0">加入购物车</span>
               </transition>
               <good-ctrl v-bind:food="food" v-on:foodselect="selectAnimate" v-show="food.count && food.count > 0"></good-ctrl>
             </div>
           </div>
         </div>
         <split></split>
         <div class="food-desc">
           <h3>商品介绍</h3>
           <p>{{food.info}}</p>
         </div>
         <split></split>
         <div class="food-ratings">
           <h3 class="rating-title">商品评价</h3>
           <rating-select v-bind:select-type="selectType" v-bind:only-content="onlyContent" v-bind:desc="desc" v-bind:ratings="food.ratings" v-on:select-change="selectChange" v-on:toggle-content="toggleContent"></rating-select>
           <ul class="rating-list" v-show="food.ratings.length !== 0">
             <li v-for="rating in food.ratings" class="rating-item" v-show="ratingShow(rating.rateType, rating.text)">
                <div class="rating-header">
                  <div class="rating-time">{{rating.rateTime | formateDate}}</div>
                  <div class="user">
                    <span class="user-name">{{rating.username}}</span>
                    <img v-bind:src="rating.avatar" class="user-avatar">
                  </div>
                </div>
                <div class="rating-content">
                  <span v-bind:class="{'icon-thumb_down': rating.rateType === 1, 'icon-thumb_up': rating.rateType === 0}"></span>{{rating.text}}
                </div>
             </li>
           </ul>
           <div class="no-rating" v-show="food.ratings.length === 0 || !food.ratings">暂无评论</div>
         </div>
       </div>
     </div>
   </transition>
</template>

<script type="text/ecmascript-6">
  import GoodCtrl from 'components/goodsControl/goodsControl.vue';
  import split from 'components/split/split.vue';
  import BetScroll from 'better-scroll';
  import RatingsSelect from 'components/ratingSelect/ratingSelect.vue';
  import {formateDate} from '../../common/js/date';

  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    data: function() {
      return {
        showFlag: false,
        detailscroll: null, // 保存实例化better-scroll 对象
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    components: {
      'good-ctrl': GoodCtrl,
      split: split,
      'rating-select': RatingsSelect
    },
    filters: {
      formateDate: function(time) {
         let date = new Date(time);
         return formateDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      show: function() {
        this.showFlag = !this.showFlag;
        // 保持选择评论类型组件的初始化
        this.selectType = ALL;
        this.onlyContent = false;

        this.$nextTick(() => {
          if(!this.detailscroll) {
            this.detailscroll = new BetScroll(this.$refs.foodDetailWrap, {
              click: true
            });
          }else {
            this.detailscroll.refresh();
          }
        });
      },
      back: function() {
        this.showFlag = !this.showFlag;
      },
      addFirst: function(event) {
        if (!event._constructed) {
          return;
        }
         this.$set(this.food, 'count', 1);
        // 触发动画
        this.$emit('foodselect', [event.target]);
      },
      selectAnimate: function(elm) {
          this.$parent.$refs.shopcart.drop(elm[0]);
      },
      selectChange: function(type) {
        this.selectType = type[0];
        this.$nextTick(() => {
          this.detailscroll.refresh();
        });
      },
      toggleContent: function(bool) {
        this.onlyContent = bool[0];
        this.$nextTick(() => {
          this.detailscroll.refresh();
        });
      },
      ratingShow: function(type, txt) {
        if(this.onlyContent === true && txt === '') {
          return false;
        }
        if(this.selectType === ALL) {
          return true;
        }else {
          return this.selectType === type;
        }
      }
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .food-detail-scroll-wrap
    position: fixed
    top: 0
    left: 0
    bottom: 60px
    width: 100%
    height: 100%
    background-color: #fff
    z-index: 30
    &.detail-show-enter
      transform: translateX(-100%)
      opacity: 1
    &.detail-show-enter-active
      transition: all .5s ease
    &.detail-show-enter-to
      transform: translateX(0)
    &.detail-show-leave-active
      transition: all .4s ease
    &.detail-show-leave-to
      transform: translateX(-100%)
    .food-photo
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
      .back
        position: absolute
        top: 10px
        left: 0
        font-size: 20px
        color: #fff
        padding: 10px
    .food-content
      padding: 18px
      .food-name
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .food-extra
        margin-bottom: 18px
        font-size: 10px
        color: rgb(147,153,159)
        line-height: 10px
        span
          margin-right: 12px
      .food-operate
        height: 24px
        line-height: 24px
        font-size: 0
        .food-price-wrap
          display: inline-block
          vertical-align: middle
          width: 50%
          height: 24px
          line-height: 24px
          .cur-price
            line-height: 24px
            margin-right: 4px
            font-size: 18px
            font-weight: 700
            color: rgb(240,20,20)
          .old-price
            line-height: 24px
            font-size: 10px
            font-weight: 700
            color: rgb(147,153,159)
            text-decoration: line-through
        .food-count-ctrl
          position: relative
          display: inline-block
          vertical-align: middle
          width: 50%
          height: 24px
          line-height: 24px
          text-align: right
          .add-good-btn
            display: inline-block
            width: 74px
            height: 24px
            line-height: 24px
            border-radius: 12px
            background-color: rgb(0,160,220)
            color: #fff
            font-size: 10px
            text-align: center
            &.btn-move-enter
              opacity: 0
            &.btn-move-enter-active
              transition: all .4s linear
            &.btn-move-enter-to
              opacity: 1
            &.btn-move-leave-active
              transition: all .4s linear
            &.btn-move-leave-to
              opacity: 0
          .goodsCtrl-template
            position: absolute
            vertical-align: middle
            top: -6px
            right: 0
    .food-desc
      padding: 18px
      h3
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      p
        line-height: 24px
        padding-left: 8px
        font-size: 12px
        color: rgb(77,85,93)

    .food-ratings
      padding-top: 18px
      .rating-title
        padding-left: 18px
        margin-bottom: 6px
      .rating-list
        padding: 0 18px 48px 18px
        .rating-item
          padding: 16px 0
          border-1px(rgba(7,17,27,0.1))
          .rating-header
            font-size: 0
            height: 12px
            line-height: 12px
            margin-bottom: 6px
            .rating-time
              display: inline-block
              width: 50%
              height: 12px
              line-height: 12px
              font-size: 10px
              color: rgb(147,153,159)
            .user
              display: inline-block
              width: 50%
              height: 12px
              line-height: 12px
              font-size: 10px
              color: rgb(147,153,159)
              text-align: right
              .user-name
                margin-right: 6px
              .user-avatar
                width: 12px
                height: 12px
                border-radius: 50%
          .rating-content
            line-height: 24px
            font-size: 12px
            color: rgb(7,17,27)
            span
              margin-right: 4px
              line-height: 24px
              font-size: 12px
              color: rgb(147,153,159)
              &.icon-thumb_up
                color: rgb(0,160,220)
              &.icon-thumb_down
                color: rgb(147,153,159)
      .no-rating
        padding: 18px 0
        font-size: 12px
        color: rgb(147,153,159)
        text-align: center
</style>
