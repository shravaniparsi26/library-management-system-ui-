<template>
  <v-app>
    <v-content >
      <v-container>
         <h></h>
         <v-container text-xs-center>
       <v-flex xs12 sm6 offset-sm3>
        <v-card dark color="blue">
          <v-card-text class="px-0">WELCOME ADMIN</v-card-text>
        </v-card>
      </v-flex>
      </v-container>
     
<template>
  <v-timeline>
    <v-timeline-item
      color="blue lighten-2"
      large
    >
      <v-card class="elevation-2">
        <v-card-title class="headline">{{this.title1}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-progress-circular :value="this.value1"></v-progress-circular>
         {{this.value1}}
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item
     color="blue lighten-2"
      large
      right=true
    >
       <v-card class="elevation-2">
        <v-card-title class="headline">{{this.title2}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-progress-circular :value="this.value2"></v-progress-circular>
         {{this.value2}}
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>


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
 
    data() {
      return{
       title1:'Total issued Copies',
       value1:0,
        title2:'updated fine amount',
        value2:0,
        books:[]
     
      }
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
                this.$store.state.TOTAL_FINE=amount;
                this.$store.state.TOTAL_BOOKS=this.books.length;
            }, error => {
                console.error(error);
            });
        },

 
}
</script>

