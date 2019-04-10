<template>
  <v-app>
   <v-content >
      <v-container>
         <h></h>
         <v-card color="blue lighten-2 dark" class="white--text">
                <v-card-title primary-title>
                  <div>
                    <div class="title">STATISTICS</div>
                  </div>
                </v-card-title>
</v-card>
<v-card>
 <v-container fluid grid-list-xl >
            <v-layout column wrap>
              <v-flex>

        <v-card  color="blue lighten-4">
          <v-card-text class="px-1"><b>TOTAL BOOKS:{{value1}}</b></v-card-text>
          
        </v-card>
      </v-flex>
      <v-flex>

        <v-card  color="blue lighten-4">
          <v-card-text class="px-1"><b>TOTAL FINE:{{value2}}</b></v-card-text>
          
        </v-card>
      </v-flex>
     
      </v-layout>
      </v-container>
</v-card>
              
              
      </v-container>
     
   </v-content>
  </v-app>
</template>

<script>

import h from './hadmin.vue';
export default {
  name: 'App',
  components: {
    h
  },
    mounted() {
           let amount=0;
         let headers=new Headers( { "content-type": "application/json" });
     if(localStorage.accessToken==null||localStorage.accessToken==''){this.$router.push('/');}
      headers['Authorization']=localStorage.accessToken;
            this.$http.get("http://localhost:3000/api/transactions?filter[where][isReturned]=false",{headers:headers})
            .then(result => {
                this.books=result.body;
                 this.books.forEach((item) => {
                   console.log(item);
                amount+=item.fine;
                  
                });
                console.log(amount);
                console.log(this.books.length);
                this.value2=amount;
                this.value1=this.books.length;
            }, error => {
                console.error(error);
            });  
        },
  data () {
    return {
    value1:0,
    value2:0,
    books:[]
    }
  }
}
</script>