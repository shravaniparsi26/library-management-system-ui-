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
              <v-flex >
<pre><b>UserName:   {{this.profile.userName}}</b></pre>
<v-divider></v-divider>
      </v-flex>
      <v-flex >
<pre><b>Roll number:   {{this.profile.rollnumber}}</b></pre>
<v-divider></v-divider>
      </v-flex>
      <v-flex >
<pre><b>Email:   {{this.profile.email}}</b></pre>
<v-divider></v-divider>
      </v-flex>

      </v-layout></v-container></v-card>
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
      
    profile:{}
   
    }
  },
   mounted() {
      
      let headers=new Headers( { "content-type": "application/json" });
      headers['Authorization']=localStorage.accessToken;
      
            this.$http.get("http://localhost:3000/api/Students/"+localStorage.userId,{headers: headers} ).then(result => {
                this.profile = result.body;
            }, error => {
                console.error(error);
            });
        },
}
</script>