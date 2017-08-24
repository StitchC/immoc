<template>
  <div class="seller-wrapper" ref="sellerscroll">
    <div class="seller-main">
      <div class="seller-header">
        <div class="seller-intro border-1px">
          <h1 class="seller-name">{{seller.data.name}}</h1>
          <star v-bind:size="36" v-bind:score="seller.data.score" class="star"></star>
          <span class="seller-rank">({{seller.data.ratingCount}})</span>
          <span class="seller-sells-count">月售{{seller.data.sellCount}}单</span>
        </div>
        <ul class="seller-detail">
          <li classs="min-price">
            <p class="title">起送价</p>
            <p class="desc"><span class="digtail">{{seller.data.minPrice}}</span>元</p>
          </li>
          <li class="deliver-price">
            <p class="title">商家配送</p>
            <p class="desc"><span class="digtail">{{seller.data.deliveryPrice}}</span>元</p>
          </li>
          <li class="deliver-time">
            <p class="title">平均配送时间</p>
            <p class="desc"><span class="digtail">{{seller.data.deliveryTime}}</span>分钟</p>
          </li>
        </ul>
        <div class="favorite-wrap">
          <span class="icon icon-favorite" v-bind:class="{'active': isFavorite}" v-on:click="togglefavorite"></span>
          <transition name="favorite-move">
            <span class="icon-move icon-favorite active" v-show="isFavorite"></span>
          </transition>
          <span class="favorite-txt">{{favoriteTxt}}</span>
        </div>
      </div>
      <split></split>
      <div class="seller-notice-wrap">
        <h3>公告与活动</h3>
        <p>{{seller.data.bulletin}}</p>
        <ul class="seller-supports-list">
          <li class="seller-support-item border-1px" v-for="item in seller.data.supports">
            <seller-icon v-bind:icon-type="item.type" v-bind:icon-size="3" class="icon"></seller-icon>
            {{item.description}}
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-view">
        <h3>商家实景</h3>
        <div class="seller-photo-wrap" ref="photolistscroll">
          <ul class="seller-photo-list" ref="photolist">
            <li class="seller-photo-item" v-for="photo in seller.data.pics">
              <img v-bind:src="photo">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h3 class="title border-1px">商家信息</h3>
        <ul class="seller-info-list">
          <li class="seller-info-item border-1px" v-for="item in seller.data.infos">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 导入模块方法
  import {saveToLocal, getFromLocal} from 'common/js/store.js';

  import BetScroll from 'better-scroll';
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  import SellerIcon from 'components/sellerIcon/sellerIcon.vue';

  export default {
    data: function() {
      return {
        isFavorite: false
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
      'seller-icon': SellerIcon
    },
    created: function() {
      let id = this.seller.id;
      this.isFavorite = getFromLocal(id, 'favorite');
      this.$nextTick(() => {
        this.scroll = new BetScroll(this.$refs.sellerscroll, {
          click: true
        });
        this.setPhotoListWidth();
      });
    },
    computed: {
      favoriteTxt: function() {
        return this.isFavorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      setPhotoListWidth: function() {
        if(this.seller.data.pics) {
          let width = 120;
          let margin = 16;
          let result = (width + margin) * this.seller.data.pics.length - margin;
          this.$refs.photolist.style.width = result + 'px';

          this.photoscroll = new BetScroll(this.$refs.photolistscroll, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        }
      },
      togglefavorite: function() {
        if (!event._constructed) {
          return;
        }

        this.isFavorite = !this.isFavorite;
        saveToLocal(this.seller.id, 'favorite', this.isFavorite);
      }
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .seller-wrapper
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .seller-header
      position: relative
      padding: 18px
      .seller-intro
        border-1px(rgba(7,17,27,0.1))
        font-size: 0
        .seller-name
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7,17,27)
        .star
          vertical-align: -2px
          display: inline-block
          line-height: 18px
          height: 18px
          margin: 8px 8px 18px 0
        .seller-rank
          line-height: 18px
          margin-right: 12px
          font-size: 10px
          color: rgb(77,85,93)
        .seller-sells-count
          line-height: 18px
          font-size: 10px
          color: rgb(77,85,93)
      .seller-detail
        display: flex
        justify-content: space-between
        padding-top: 18px
        font-size: 0
        li
          flex: 1
          border-right: 1px solid rgba(7,17,27,0.1)
          &:last-child
            border-right: 0
          .title
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
            text-align: center
          .desc
            height: 24px
            line-height: 24px
            font-size: 10px
            color: rgb(7,17,27)
            text-align: center
            .digtail
              font-size: 24px
              color: rgb(7,17,27)
      .favorite-wrap
        position: absolute
        right: 11px
        top: 18px
        width: 50px
        text-align: center
        .icon
          display: block
          height: 24px
          line-height: 24px
          margin-bottom: 4px
          font-size: 24px
          color: #d4d6d9
          z-index: 10
          &.active
            color: rgb(240,20,20)
        .icon-move
          position: absolute
          display: block
          top: 0
          right: 0
          width: 50px
          height: 24px
          line-height: 24px
          margin-bottom: 4px
          font-size: 24px
          color: rgb(240,20,20)
          z-index: -1
          opacity: 0
          &.favorite-move-enter
            z-index: 20
          &.favorite-move-enter-active
            transition: all .5s ease
          &.favorite-move-enter-to
            transform: scale(2.5)
            opacity: 0.8
        .favorite-txt
          line-height: 10px
          font-size: 10px
          color: rgb(77,85,93)
    .seller-notice-wrap
      padding: 18px 18px 0 18px
      h3
        font-size: 14px
      p
        padding: 8px 0 16px 12px
        line-height: 24px
        font-size: 12px
        color: rgb(240,20,20)
        border-1px(rgba(7,17,27,0.1))
      .seller-supports-list
        .seller-support-item
          height: 12px
          line-height: 16px
          padding: 16px 12px
          font-size: 12px
          color: rgb(7,17,27)
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .icon
            vertical-align: top
            width: 16px
            height: 16px
            margin-right: 6px
            background-size: 100%
    .seller-view
      padding: 18px 0 18px 18px
      h3
        margin-bottom: 12px
        font-size: 14px
      .seller-photo-wrap
        width: 100%
        overflow: hidden
        white-space: nowrap
        .seller-photo-list
          font-size: 0
          .seller-photo-item
            display: inline-block
            margin-right: 16px
            width: 120px
            height: 90px
            &:last-child
              margin-right: 0
            img
              width: 100%
              height: 100%
    .seller-info
      padding: 18px
      h3
        height: 16px
        line-height: 16px
        padding: 12px 0
        margin-bottom: 12px
        border-1px(rgba(7,17,27,0.1))
      .seller-info-list
        padding-bottom: 16px
        .seller-info-item
          height: 16px
          line-height: 16px
          padding: 16px 12px
          font-size: 12px
          color: rgb(7,17,27)
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
</style>
