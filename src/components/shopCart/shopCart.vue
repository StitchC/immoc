<template>
  <div class="shopCart-wrap">
    <div class="content" v-on:click="toggleList">
      <div class="left-content">
        <div class="shopCart-logo-wrap">
          <div class="shopCart-logo" v-bind:class="{'highLight': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="food-select-num">{{totalCount}}</div>
        </div>
        <div class="total-price" v-bind:class="{'highLight': totalCount > 0}">￥{{totalPrice}}</div>
        <div class="shopCart-desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="right-content">
        <div class="pay-btn" v-bind:class="{'highLight': payDesc.status === 1}" v-on:click.stop="goToPay">{{payDesc.txt}}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop-move" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-for="(ball, index) in balls" v-bind:key="index">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="fold">
      <div class="shopCart-list" v-show="listShow">
        <div class="list-header">
          <h3 class="list-title">购物车</h3>
          <div class="empty-btn-wrap">
            <span class="empty" v-on:click="emptyCart">清空</span>
          </div>
        </div>
        <div class="list-content" ref="cartList">
          <ul>
            <li class="food-detail" v-for="food in selectFood" v-if="food.count > 0">
              <span class="food-name">{{food.name}}</span>
              <div class="food-price">
                <span class="food-total-price">￥{{food.price * food.count}}</span>
                <div class="cart-control-wrap">
                  <goods-ctrl v-bind:food="food" v-on:foodselect="cartListSelect"></goods-ctrl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="cartListBg">
      <div class="shopCart-bg" v-show="listShow" v-on:click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import goodsctrl from 'components/goodsControl/goodsControl.vue';
  import BetScroll from 'better-scroll';

  export default {
    data: function() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        // 购物车列表折叠状态
        fold: true
      };
    },
    props: {
      selectFood: {
        type: Array,
        default: function() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      // 计算一共要结算多少钱
      totalPrice: function() {
        let total = 0;
        this.selectFood.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      // 计算一共选择了多少过商品
      totalCount: function() {
        let count = 0;
        this.selectFood.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      // 定义结算按钮中的文字描述
      payDesc: function() {
        if(this.totalPrice !== 0 && this.totalPrice < this.minPrice) {
          return {
            status: 0,
            txt: '还差￥' + (this.minPrice - this.totalPrice) + '起送'
          };
        }else if(this.totalPrice === 0) {
          return {
            status: 0,
            txt: '￥' + this.minPrice + '起送'
          };
        }else {
          return {
            status: 1,
            txt: '去结算'
          };
        }
      },
      listShow: function() {
        if(!this.totalCount) {
          this.fold = true;
          return false;
        }else {
          let show = !this.fold;
          if (show === true) {
            this.$nextTick(() => {
              this.listScroll.refresh();
            });
          }
          return show;
        }
      }
    },
    created: function() {
      this.$nextTick(() => {
        this.listScroll = new BetScroll(this.$refs.cartList, {
          click: true
        });
      });
    },
    components: {
      'goods-ctrl': goodsctrl
    },
    methods: {
      // 小球下坠的动画执行函数
      drop: function(target) {
          let len = this.balls.length;

          for (let i = 0; i < len; i++) {
            let ball = this.balls[i];
            if(!ball.show) {
              ball.show = true;
              ball.targetElem = target;
              this.dropBalls.push(ball);
              return;
            }
          }
      },
      toggleList: function() {
          if(!this.totalCount) {
            return;
          }else {
            this.fold = !this.fold;
          }
      },
      hideList: function() {
        this.fold = true;
      },
      cartListSelect: function(target) {
        this.drop(target[0]);
      },
      emptyCart: function() {
        this.selectFood.forEach((food) => {
          food.count = 0;
        });
      },
      goToPay: function() {
        if(this.totalPrice < this.minPrice) {
          return;
        }else {
          alert('￥需要支付' + this.totalPrice + '元');
        }
      },
      beforeEnter: function(el) {
        let len = this.balls.length;

        for (let i = 0; i < len; i++) {
          let ball = this.balls[i];
          if(ball.show) {
            let rect = ball.targetElem.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
            el.style.transform = 'translate3d(0,' + y + 'px,0)';

            let inner = el.querySelectorAll('.inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
            inner.style.transform = 'translate3d(' + x + 'px,0,0)';
          }
        }
      },
      enter: function(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.display = '';
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';

          let inner = el.querySelectorAll('.inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
        done();
      },
      afterEnter: function(el) {
        let ball = this.dropBalls.shift();
        if(ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .shopCart-wrap
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    line-height: 48px
    background-color: #141d27
    /*z-index: 50*/
    .content
      display: flex
      .left-content
        flex: 1
        height: 48px
        line-height: 48px
        font-size: 0
        background-color: #141d27
        .shopCart-logo-wrap
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          line-height: 56px
          box-sizing: border-box
          border-radius: 50%
          background-color: #141d27
          font-size: 0
          text-align: center
          .shopCart-logo
            display: inline-block
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: #2b343c
            &.highLight
              background-color: rgb(0,160,220)
              & .icon-shopping_cart
                color: #fff
              & + .food-select-num
                display: block
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858A
          .food-select-num
            display: none
            position:absolute
            left: 35px
            top: 0
            width: 24px
            height: 16px
            line-height: 16px
            border-radius: 16px
            background-color: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
            font-size: 9px
            font-weight: 700
            text-align: center
            color: #fff
        .total-price
          position: relative
          display: inline-block
          vertical-align: top
          padding-right: 12px
          margin-right: 12px
          height: 48px
          line-height: 48px
          border-right: 1px solid rgba(255,255,255,0.1)
          color: rgba(255,255,255,0.4)
          font-size: 16px
          font-weight: 700
          z-index: 20
          &.highLight
            color: #fff
        .shopCart-desc
          display: inline-block
          vertical-align: top
          height: 48px
          line-height: 48px
          font-size: 10px
          color: rgba(255,255,255,0.4)
      .right-content
        flex: 0 0 105px
        width: 105px
        height: 48px
        line-height: 48px
        .pay-btn
          width: 100%;
          margin-right: 12px
          background-color: #2B333B
          font-size: 12px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          text-align: center
          &.highLight
            background-color: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all .4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background-color: rgb(0,160,220)
          transition: all .4s linear
    .shopCart-list
      position: absolute
      left: 0
      top: 0
      width: 100%
      z-index: -1
      transform: translate3d(0,-100%,0)
      &.fold-enter
        transform: translate3d(0,0,0)
      &.fold-enter-active
        transition: all .4s linear
      &.fold-enter-to
        transform: translate3d(0,-100%,0)
      &.fold-leave-active
        transition: all .4s linear
      &.fold-leave-to
        transform: translate3d(0,0,0)
      .list-header
        display: flex
        height: 40px
        line-height: 40px
        padding: 0 18px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        background-color: #f3f5f7
        h3
          flex: 1
          font-size: 14px
          font-weight: 200
          color: rgb(7,17,27)
        .empty-btn-wrap
          flex: 1
          font-size: 12px
          color: rgb(0,160,220)
          text-align: right
      .list-content
        position: relative
        max-height: 217px
        overflow: hidden
        background-color: #fff
      .list-content ul
        padding: 0 18px
        li
          position: relative
          height: 48px
          line-height: 48px
          padding: 12px 0
          border-1px(rgba(7,17,27,0.1))
          font-size: 0
          .food-name
            position: absolute
            top: 24px
            left: 0
            display: inline-block
            height: 24px
            line-height: 24px
            margin-right: 18px
            color: rgb(7,17,27)
            font-size: 14px
          .food-price
            position: absolute
            top: 24px
            right: 0
            display: inline-block
            height: 24px
            line-height: 24px
            font-size: 0
            .food-total-price
              vertical-align: top
              line-height: 24px
              font-size: 14px
              font-weight: 700
              color: rgb(240,20,20)
            .cart-control-wrap
              display: inline-block
              line-height: 24px
              vertical-align: middle
              margin-left: 12px
              margin-top: -7px
    .shopCart-bg
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: rgba(7,17,27,0.6)
      backdrop-filter: blur(10px)
      z-index: -2
      &.cartListBg-enter
        opacity: 0
      &.cartListBg-enter-active
        transition: all .5s linear
      &.cartListBg-enter-to
        opacity: 1
      &.cartListBg-leave-active
        transition: all .5s linear
      &.cartListBg-leave-to
        opacity: 0
</style>
