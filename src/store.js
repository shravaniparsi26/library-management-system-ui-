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
            TOTAL_BOOKS:0,
            TOTAL_MEMBERS:0,
            TOTAL_FINE:0,
            books:[],
            mybooks:[],
            total_mybooks:0
             },
             mutations: {
              fetch(state) {
                 this.$http.get("http://localhost:3000/api/books").then(result => {
                          state.books = result.body;
                      }, error => {
                         // console.log(error);
                      });
              },
              fetchData(state){
                let headers=new Headers( { "content-type": "application/json" });
             headers['Authorization']=this.$store.state.accessToken;
                let url="http://localhost:3000/api/transactions?filter[include]=Book&filter[where][user_Id]="+this.$store.state.userId;
                 console.log(url);
                   this.$http.get(url,{headers:headers}).then(result => {
                     state.mybooks = result.body;
                     state.total_books=state.mybooks.length;
                   }, error => {
                      // console.log(error);
                   });
             }
            }
      
});