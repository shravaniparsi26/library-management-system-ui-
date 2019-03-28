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
      v-for="item in items"
                :key="item.title"
      color="blue lighten-2"
      large
    >
      <v-card class="elevation-2">
        <v-card-title class="headline">{{item.title}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-progress-circular :value="item.value/100"></v-progress-circular>
         {{item.value}}
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
     items:[
       {title:'Total issued books',value:'670'},
        {title:'updated fine amount',value:'3000'}
     ]
      }
    },
     /* mounted() {
            this.$http.get("").then(result => {
                this.items = result.body;
            }, error => {
                console.error(error);
            });
        },*/

 
}
</script>

