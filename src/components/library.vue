<template>
  <div class="app" >
   <v-container fill-height class="mt-5">
         <v-layout align-center justify-center>
    <v-flex>
        <v-sheet
          class="pa-5 ma-50 "
          color="blue"
          height="250"
          dark>
<p class="text-md-center mt-5" style="font-style: italic;font-size: 30px;">LIBRARY MANAGEMENT SYSTEM</p>
</v-sheet>
</v-flex>
    </v-layout>
    </v-container>
 
    <v-layout align-center justify-center >
   <v-btn color="info" large  @click="login()">LOGIN</v-btn>
   <v-btn color="info" large  @click="register()">SIGN UP</v-btn>
    </v-layout>
   
   
  </div>
</template>

<script>


export default {
  name: 'app',
  methods:{
    login(){
      this.$router.push('/login')
    },
    register(){
      this.$router.push('/register')
    },
  },
  /*created(){
    localStorage.auth=false;
  }*/
}
</script>

<style>

.app{
  margin:0;
  padding: 0;
  
}
</style>