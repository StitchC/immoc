<template>
  <div class="goods-wrap">
    <div class="menu-wrap" ref="menuWrap">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item border-1px" v-bind:class="{'current': curIndex === index}" v-on:click="selectMenu(index, $event)">
          <span class="menu-text">
            <seller-icon v-show="item.type > 0" class="menu-icon" v-bind:iconType="item.type" v-bind:iconSize="3"></seller-icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <ul>
        <li v-for="item in goods" class="foods-list-item food-list-hook">
          <h1 class="fodds-menu-title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" v-on:click="showDetail(food, $event)">
              <div class="food-photo">
                <img width="57" height="57" v-bind:src="food.icon">
              </div>
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <p v-if="food.description != ''" class="food-description">{{food.description}}</p>
                <div class="food-extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="food-price">
                  <span class="current-price">￥{{food.price}}</span>
                  <span v-if="food.oldPrice != ''" class="old-price">￥{{food.oldPrice}}</span>
                </div>
                <div class="goodsCtrl-wrap">
                  <goods-ctrl v-bind:food="food" v-on:foodselect="foodSelectClick"></goods-ctrl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart v-bind:select-food="selectGoods" v-bind:deliveryPrice="seller.data.deliveryPrice" v-bind:minPrice="seller.data.minPrice" ref="shopcart"></shop-cart>
    <food-detail v-bind:selectedfood="selectFood" v-on:foodselect="foodSelectClick" ref="foodDetail"></food-detail>
  </div>
</template>

<script type="text/ecmascript-6">
  import sellerIcon from 'components/sellerIcon/sellerIcon.vue';
  import BetScroll from 'better-scroll';
  import shopcart from 'components/shopCart/shopCart.vue';
  import goodsctrl from 'components/goodsControl/goodsControl.vue';
  import foodDetail from 'components/foodDetail/foodDetail.vue';


  const ERR_OK = 0;

  export default {
    data: function() {
      return {
        goods: [],
        menuIconClass: [],
        listHeight: [],
        scrollY: 0,
        dropElem: null,
        selectFood: {} // 每次点击商品的时候都保存这个商品详细内容的对象
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    created: function() {
        // 创建特定的菜单图标类名
        this.menuIconClass = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

        // 这里在 vue 实例创建的时候 我们要利用vue-resource 发送一个ajax 请求 获取数据
        this.$http.get('/api/goods').then((response) => {
        // then的回调函数里面有一个参数 保存着数据
        // 这里将response 转换为一个 json对象
        response = response.body;
          if(response.errno === ERR_OK) {
            this.goods = response.data;
            this.$nextTick(() => {
              this.initBetScroll();
              this.calculateHeight();
            });
          }
        });
    },
    components: {
      'seller-icon': sellerIcon,
      'shop-cart': shopcart,
      'goods-ctrl': goodsctrl,
      'food-detail': foodDetail
    },
    methods: {
      initBetScroll: function() {
        this.menuScroll = new BetScroll(this.$refs.menuWrap, {
          click: true
        });
        this.foodsScroll = new BetScroll(this.$refs.foodsWrap, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      calculateHeight: function() {
          let foodList = this.$refs.foodsWrap.querySelectorAll('.food-list-hook');
          let tempHeight = 0;
          let len = foodList.length;

          this.listHeight.push(tempHeight);
          for (let i = 0; i < len; i++) {
            let curHeight = foodList[i].clientHeight;
            tempHeight += curHeight;
            this.listHeight.push(tempHeight);
          }
      },
      selectMenu: function(index, event) {
          if (!event._constructed) {
            return;
          }
          let foodsList = this.$refs.foodsWrap.querySelectorAll('.food-list-hook');
          this.foodsScroll.scrollToElement(foodsList[index], 300);
      },
      foodSelectClick: function(target) {
          // 父组件接收传过来的添加按钮dom 对象
          // 再将这个dom 对象传给购物车组件 让购物车组件在内部完成动画
          // 在父组件内部执行字组件的方法

          // 异步动画优化
          this.$nextTick(() => {
            this.$refs.shopcart.drop(target[0]);
          });
      },
      showDetail: function(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectFood = food;
        this.$refs.foodDetail.show();
      }
    },
    computed: {
      curIndex: function() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let curHeight = this.listHeight[i];
          let nextHeight = this.listHeight[i + 1];
          if (nextHeight && this.scrollY >= curHeight && this.scrollY < nextHeight) {
            return i;
          }
        }
        return 0;
      },
      selectGoods: function() {
        let foodList = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count !== undefined) {
              foodList.push(food);
            }
          });
        });
        return foodList;
      }
    },
    watch: {
      curIndex: function() {
        let menuList = this.$refs.menuWrap.querySelectorAll('.menu-item');
        this.menuScroll.scrollToElement(menuList[this.curIndex], 300);
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'

  .goods-wrap
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrap
      /* flex属性的三个值： 第一个表示是否等分，第二个表示内容不足时是否缩放，第三个表示占位 */
      flex: 0 0 80px
      /* 设置width 是为了兼容安卓浏览器 */
      width: 80px
      background-color: #f3f5f7
      .menu-item
       display: table
       padding: 0 12px
       width: 56px
       height: 54px
       line-height: 14px
       text-align: center
       &.current
          position: relative
          margin-top: -1px
          background-color: #fff
          z-index: 10
          font-weight: 700
          & .menu-text
            border-none()
       .menu-icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
      .menu-text
        display: table-cell
        width: 56px
        vertical-align: middle
        border-1px(rgba(7,17,27,0.1))
        font-size: 12px
    .foods-wrap
      flex: 1
      .foods-list-item ul
        padding: 0 18px
      .fodds-menu-title
        height: 26px
        line-height: 26px
        padding-left: 14px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,159)
        background-color: #f3f5f7
      & .food-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .food-photo
          flex: 0 0 57px
          margin-right: 10px
        .food-content
          flex: 1
          position: relative
          .food-name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .food-description
            height: 12px
            line-height: 12px
            font-size: 10px
            color: rgb(147,153,159)
          .food-extra
            margin-top: 12px
            height: 12px
            line-height: 12px
            font-size: 0
            & span
              display: inline-block
              height: 10px
              line-height: 10px
              font-size: 10px
              color: rgb(147,153,159)
              &:first-child
                margin-right: 12px
          .food-price
              & span
                height: 24px
                line-height: 24px
                font-weight: 700
              & .current-price
                  font-size: 14px
                  color: #F01414
              & .old-price
                  font-size: 10px
                  color: rgb(147,153,159)
                  text-decoration: line-through
          .goodsCtrl-wrap
              position: absolute
              right: 0
              bottom: -8px

</style>
