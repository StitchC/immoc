// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
// import router from './router';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

// 导入css 文件
import 'common/stylus/index.styl';

Vue.config.productionTip = false;
// 全局注册一个 vue-router
Vue.use(VueRouter);
// 全局注册一个 vue-resource
Vue.use(VueResource);

// 配置vue 路由的路径以及要切换的组件
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];

// 实例化vue 路由
const myRouter = new VueRouter({
  // routes是默认的参数名字 实例化路由必须要有这个参数
  routes: routes,
  // 修改vue 路由链接点击时的样式css 类名 默认为 router-link-active
  linkActiveClass: 'tab-active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: myRouter,
  render: h => h(App)
});

myRouter.push('/goods');
