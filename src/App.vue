<template>
  <div id="app">
    <!-- 父组件向字组件传递信息 -->
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view v-bind:seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  // 导入header组件
  import header from 'components/header/header.vue';

  // 定义一个请求码的常量
  const ERR_OK = 0;
  export default {
    data() {
      return {
        // seller 对象的数据是通过 vue-resource 获取内容的
        seller: {}
      };
    },
    // created 是vue 实例的生命钩子 表示在vue 实例创建的时候要做些什么
    created() {
      // 这里在 vue 实例创建的时候 我们要利用vue-resource 发送一个ajax 请求 获取数据
      this.$http.get('/api/seller').then((response) => {
          // then的回调函数里面有一个参数 保存着数据
          // 这里将response 转换为一个 json对象
          response = response.body;
          if(response.errno === ERR_OK) {
            this.seller = response;
          }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus">
  @import "./common/stylus/mixin.styl"

  #app .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1))
  .tab .tab-item
    flex: 1
    text-align: center
  .tab .tab-item a
    display: block
    font-size: 14px
    color: rgb(77,85,93)
  .tab .tab-item .tab-active
    color: rgb(240,20,20)
</style>
