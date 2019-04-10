import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(VueResource);

export const store=new Vuex.Store({
    state:{
          userId:"",
          accessToken:"",
          userName:"",
          rollnumber:"",
          email:"",
         TOTAL_BOOKS:0,
         TOTAL_MEMBERS:0,
         TOTAL_FINE:0,
         books:[],
         mybooks:[],
         total_mybooks:0
            },
            
});