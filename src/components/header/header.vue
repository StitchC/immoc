<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.data.avatar">
      </div>
      <div class="seller-main-content">
        <!-- 商家标题 包括名字和图标 -->
        <div class="seller-main-content-title">
          <span class="brand-icon"></span>
          <span class="seller-name">{{seller.data.name}}</span>
        </div>
        <!-- 商家描述 -->
        <div class="seller-description">
          {{seller.data.description}}/{{seller.data.deliveryTime}}分钟送到
        </div>
        <!-- 判断是否有活动信息 有就输出 -->
        <div v-if="seller.data.supports" class="seller-support">
          <seller-icon class="support-icon" v-bind:iconType="seller.data.supports[0].type" v-bind:iconSize="1"></seller-icon>
          <span class="support-description">{{seller.data.supports[0].description}}</span>
        </div>
      </div>
      <!-- 弹出层显示按钮 -->
      <div v-if="seller.data.supports" v-on:click="showDetail" class="seller-support-num-btn">
        <span class="support-count">{{seller.data.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div v-on:click="showDetail" class="bulletin-wrapper">
      <span class="bulletin-type-icon"></span><span class="bulletin-text">{{seller.data.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img v-bind:src="seller.data.avatar" width="100%" height="100%">
    </div>
    <transition name="detail-show">
      <div v-if="detailShow" class="detail">
        <div class="detail-content-wrap clearfix">
          <div class="detail-main-content">
            <h1 class="detail-seller-name">{{seller.data.name}}</h1>
            <div class="star-wrapper">
              <star v-bind:size="48" v-bind:score="seller.data.score"></star>
            </div>
            <div class="detail-title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.data.supports" class="supports-list-wrap">
              <li v-for="(item,index) in seller.data.supports" class="supports-item">
                <seller-icon class="supports-icon" v-bind:iconType="item.type" v-bind:iconSize="2"></seller-icon>
                <span class="supports-text">{{seller.data.supports[index].description}}</span>
              </li>
            </ul>
            <div class="detail-title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <p class="seller-bulletin">{{seller.data.bulletin}}</p>
          </div>
        </div>
        <div v-on:click="showDetail" class="detail-content-close icon-close"></div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  // 导入评分星星组件
  import star from 'components/star/star.vue';
  import sellerIcon from 'components/sellerIcon/sellerIcon.vue';

  // 输出自己本身
  export default {
    data() {
      return {
        detailShow: false
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      showDetail: function() {
        this.detailShow = !this.detailShow;
      }
    },
    // 创建生命周期钩子
    created: function() {
      this.suportIconClass = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star: star,
      'seller-icon': sellerIcon
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    position: relative
    color: #fff
    background-color: rgba(7,17,27,0.5)
    overflow: hidden
  .content-wrapper
    position: relative
    padding: 24px 12px 18px 24px
    font-size: 0
  .content-wrapper .avatar
    display: inline-block
    vertical-align: top
  .content-wrapper .avatar img
    border-radius: 2px
  .content-wrapper .seller-main-content
    display: inline-block
    margin-left: 16px
  .content-wrapper .seller-main-content .seller-main-content-title
    margin: 2px 0 8px 0
  .content-wrapper .seller-main-content .seller-main-content-title .brand-icon
    display: inline-block
    vertical-align: middle
    margin-right: 6px
    width: 30px
    height: 18px
    /* 引用css 预处理函数 icon-size 对背景图片进行不同屏幕下的切换 */
    icon-size("brand")
    background-size: 30px 18px
    background-repeat: no-repeat
  .content-wrapper .seller-main-content .seller-main-content-title .seller-name
    display: inline-block
    vertical-align: middle
    line-height: 18px
    font-size: 16px
    font-weight: bold
  .content-wrapper .seller-main-content .seller-description
    margin-bottom: 10px
    line-height: 12px
    font-size: 12px
  .content-wrapper .seller-main-content .seller-support .support-icon
    display: inline-block
    vertical-align: top
    width: 12px
    height: 12px
    margin-right: 4px
    background-size: 12px 12px
    background-repeat: no-repeat
  .content-wrapper .seller-main-content .seller-support .support-description
    vertical-align: middle
    line-height: 12px
    font-size: 10px
  .content-wrapper .seller-support-num-btn
    position: absolute
    right: 12px
    bottom: 18px
    height: 24px
    line-height: 24px
    padding: 0 8px
    border-radius: 14px
    background-color: rgba(0,0,0,0.2)
    text-align: center
  .content-wrapper .seller-support-num-btn .support-count
    vertical-align: super
    font-size: 10px
  .content-wrapper .seller-support-num-btn .icon-keyboard_arrow_right
    vertical-align: top
    margin-left: 2px
    line-height: 24px
    font-size: 10px
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 12px
    background-color: rgba(7,17,27,0.2)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  .bulletin-type-icon
    display: inline-block
    vertical-align: middle
    width: 22px
    height: 12px
    icon-size("bulletin")
    background-size: 22px 12px
    background-repeat: no-repeat
    font-size: 10px
  .bulletin-text
    vertical-align: baseline
    height: 12px
    margin: 0 4px
    font-size: 10px
  .bulletin-wrapper .icon-keyboard_arrow_right
    position: absolute
    right: 12px
    top: 8px
    font-size: 10px
  .background
    position: absolute
    top: 0
    left: 0
    width: 100%
    z-index: -1
  .detail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 100
    overflow: auto
    background-color: rgba(7,17,27,0.8)
  .detail-content-wrap
    width: 100%
    min-height: 100%
  .detail-main-content
    margin-top: 64px
    padding-bottom: 64px
  .detail-content-close
    position: relative
    width: 32px
    height: 32px
    margin: -40px auto 0 auto
    clear: both
    font-size: 32px
    color: rgba(255,255,255,0.4)
  .detail-seller-name
    line-height: 16px
    font-size: 16px
    font-weight: 700
    text-align: center
  .star-wrapper
    margin-top: 18px
    padding: 2px 0
    text-align: center
  .detail-title
    display: flex
    width: 90%
    margin: 28px auto 24px auto
    .line
      flex: 1
      position: relative
      top: -6px
      border-bottom: 1px solid rgba(255,255,255,0.2)
    .text
      padding: 0 12px
      font-size: 14px
      font-weight: 700
  .supports-list-wrap
    width: 80%
    margin: 0 auto
    padding-bottom: 28px
    & .supports-item
      margin-top: 12px
    & .supports-item .supports-icon
      display: inline-block
      vertical-align: middle
      width: 16px
      height: 16px
      margin-right: 6px
      background-size: 16px 16px
      background-repeat: no-repeat
    & .supports-item .supports-text
      vertical-align: middle
      line-height: 12px
      font-size: 12px
   /*
  .supports-item .supports-icon
    &.decrease
      icon-size("decrease_2")
    &.discount
      icon-size("discount_2")
    &.guarantee
      icon-size("guarantee_2")
    &.invoice
      icon-size("invoice_2")
    &.special
      icon-size("special_2")
    */
  .detail-main-content .seller-bulletin
    width: 80%
    margin: 24px auto 0 auto
    font-size: 12px
    line-height: 24px
  /* 弹出层过渡效果 */
  .detail-show-enter-active
  .detail-show-leave-active
    transition: all .5s linear
  .detail-show-enter
  .detail-show-leave-to
    opacity: 0
</style>
