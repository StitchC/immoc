<template>
  <div class="goodsCtrl-template">
    <transition name="btn-move">
      <div class="goods-decrease"  v-show="food.count > 0" v-on:click.stop.prevent="decreaseGoods">
          <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <transition name="num-move">
      <div class="goods-count" v-show="food.count > 0">{{food.count}}</div>
    </transition>
    <div class="goods-add icon-add_circle" v-on:click.stop.prevent="addGoods($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addGoods: function(event) {
        if(!event._constructed) {
          // 每次点击就会触发父组件给字组件绑定的自定义事件
          return;
        }
        if(this.food.count === undefined) {
          // 要vue 对一个不存在的数据对象进行双向数据绑定需要用 vue.set 这个全局方法设置这个对象
          // 这个方法需要三个参数
          // 需要被添加属性的对象、 被添加的属性名、 初始化（可忽略）
          Vue.set(this.food, 'count', 1);
        }else {
          this.food.count++;
          console.log('this food.count has exist');
        }
        // 触发动画
        this.$emit('foodselect', [event.target]);
      },
      decreaseGoods: function() {
          if(this.food.count > 0) {
            this.food.count--;
          }
      }
    },
    watch: {
      food: function(val, oldVal) {
        console.log(val);
      }
    }
  };
</script>

<style lang="stylus">
  .goodsCtrl-template
    font-size: 0
    .goods-decrease
      display: inline-block
      height: 24px
      line-height: 24px
      padding: 6px
      font-size: 24px
      color: rgb(0,160,220)
      transform: translate3d(0,0,0)
      &.btn-move-enter
        transform: translate3d(24px,0,0)
      &.btn-move-enter-active
        transition: all .4s linear
      &.btn-move-leave-active
        transition: all .4s linear
      &.btn-move-enter-to
        opactiy: 1
        transform: translate3d(0,0,0) rotate(180deg)
      &.btn-move-leave-to
        opactive: 0
        transform: translate3d(24px,0,0) rotate(-180deg)
    .goods-count
      display: inline-block
      vertical-align: top
      height: 24px
      line-height: 24px
      padding: 6px
      color: rgb(147,153,159)
      font-size: 10px
      transition: all .5s linear
      &.num-move-enter,
      &.num-move-leave
        opacity: 0
    .goods-add
      display: inline-block
      height: 24px
      line-height: 24px
      padding: 6px
      font-size: 24px
      color: rgb(0,160,220)
</style>
