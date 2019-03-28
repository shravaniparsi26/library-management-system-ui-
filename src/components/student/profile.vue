<template>
  <v-app>
    <v-content >
      <v-container>
         <h></h>
         <v-container text-xs-center>
       <v-flex xs12 sm12 >
        <v-card dark color="primary">
          <v-card-text class="px-0">MY PROFILE</v-card-text>
        </v-card>
      </v-flex>
      </v-container>
        <v-card>
 <v-container fluid grid-list-xl >
            <v-layout column wrap>
              <v-flex 
                v-for="(value, key) in profile"
                :key="value"
               
              >
<p><b>{{key}}      {{value}}</b></p>
<v-divider></v-divider>
      </v-flex></v-layout></v-container></v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import h from './hstudent.vue';

export default {
  name: 'App',
  components: {
    h
  },
  data () {
    return {
      
    profile:this.$store.state.profile
   
    }
  },
   /* mounted() {
            this.$http.get("").then(result => {
                this.books = result.body;
            }, error => {
                console.error(error);
            });
        },*/
}
</script>