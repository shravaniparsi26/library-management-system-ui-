<template>
  <v-app >
    <div class="login" >
      <v-content >
    <v-toolbar color="blue" dark>
    <v-toolbar-title>LIBRARY MANAGEMENT SYSTEM</v-toolbar-title>
  </v-toolbar>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="blue">
                  <v-toolbar-title>LOGIN</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" lazy-validation >
                    <v-text-field
                      v-model="u.user"
                      :rules="nameRules"
                      label="mail"
                      required
                      hint="enter valid mail"
                      persistent-hint
                      :validate-on-blur="true"
                      
                    ></v-text-field>

                    <v-text-field
                      type="password"
                      v-model="u.password"
                      :rules="passRules"
                      label="password"
                      required
                      hint="must have a capital,numeric and special char"
                      persistent-hint
                      :validate-on-blur="true"
                      @keyup.enter="validate"
                    ></v-text-field>
                    
                    <v-flex xs12 class="text-xs-right">
                    <v-btn dark color="blue" @click="validate" >LOG IN</v-btn>
                    </v-flex>
                   <router-link :to="'register'">Not a member?sign up</router-link>
                  </v-form>
                </v-card-text>
                
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      
    </div>
  </v-app>
  
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      u:{
      user: "",
      password: "",
      },

      nameRules: [
        v => !!v || "field is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passRules: [
        v => !!v || "password is required",
        v => /[A-Z]/.test(v) || " must contain capital,special char and number",
        // v => this.f2 ?/[a-z]/.test(v) || " must contain capital,special char and number":true,
        v => /[0-9]/.test(v) || " must contain capital,special char and number",
        v =>
          /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(v) ||
          " must contain capital,special char and number"
      ]
      
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        sessionStorage.auth = true;
       // this.$http.post('http://localhost/3000/api/Students/login',this.u).then(response=>{if( ){this.$router.push("/admin/ahome")}else{this.$router.push("/student/shome")}});
        if(this.u.user==='admin@admin.com'&&this.u.password==='Password123@')
        {this.$router.push("/admin/ahome");}
        else{
        this.$router.push("/student/shome");
              /* this.$http.post("https://httpbin.org/post", this.input, { headers: { "content-type": "application/json" } })
              .then(result => {
                if(result.===){

                    this.$router.push("/student/shome");
                }, error => {
                    console.error(error);
                });*/
            }
      } 
      }
    }
  
};
</script>