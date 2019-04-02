import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import App from './App.vue'
import Vuex from 'vuex'
import { routes } from './routes';
import {store} from './store'
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueResource);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})