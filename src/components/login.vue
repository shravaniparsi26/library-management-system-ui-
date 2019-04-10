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
                      v-model="u.email"
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
      <v-dialog v-model="dialog" width="500" lazy>
      <v-card>
     <v-card-text>
         please enter correct login details
    </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog=false">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
  </v-app>
  
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      dialog:false,
      u:{
      email: "",
      password: "",
      },

      nameRules: [
        v => !!v || "field is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
     /* passRules: [
        v => !!v || "password is required",
        v => /[A-Z]/.test(v) || " must contain capital,special char and number",
        // v => this.f2 ?/[a-z]/.test(v) || " must contain capital,special char and number":true,
        v => /[0-9]/.test(v) || " must contain capital,special char and number",
        v =>
          /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(v) ||
          " must contain capital,special char and number"
      ]*/
      
    };
  },

  methods: {
    validate() {
       if (this.$refs.form.validate()) {
        
          
              this.$http.post("http://localhost:3000/api/Students/login", this.u, { headers: { "content-type": "application/json" } })
              .then(result => {
                console.log(result);
                    if(result.body.userId=='5caaf22cc82c9706c8d5c8dc'){
                      localStorage.setItem('auth', true);
                      localStorage.setItem('accessToken',result.body.id);
                      console.log("inadmin");
                      this.$store.state.userId=result.body.userId;
                      this.$store.state.accessToken=result.body.id;
                      this.$router.push("/admin/ahome");

                    }
                    else{
                      console.log("student");
                      localStorage.setItem('auth', true);
                      localStorage.setItem('userId',result.body.userId);
                      localStorage.setItem('accessToken',result.body.id);
                      this.$store.state.userId=result.body.userId;
                      this.$store.state.accessToken=result.body.id;
                      this.fetch((err, result) => {
                        if (err) throw err;
                        this.fetchData((er, status) => {
                          if (er) throw er;
                          this.fetchProfileData((errr, statuss) => {
                            if (errr) throw errr;
                            this.$router.push("/student/shome");
                          });
                        });
                      });
                    }
                }, error => {
                  this.dialog=true;
                });
               
            }
      
      },
      fetch(cb) {
                 this.$http.get("http://localhost:3000/api/books").then(result => {
                          this.$store.state.books = result.body;
                          cb(null,'success')
                      }, error => {
                        cb(error);
                         // console.log(error);
                      });
              },
    fetchData(cb){
                let headers=new Headers( { "content-type": "application/json" });
             headers['Authorization']=this.$store.state.accessToken;
             console.log(this.$store.state.userId);
                let url="http://localhost:3000/api/transactions?filter[include]=Book&filter[where][user_Id]="+this.$store.state.userId;
                 console.log(url);
                   this.$http.get(url,{headers:headers}).then(result => {
                     this.$store.state.mybooks = result.body;
                     this.$store.state.total_books=this.$store.state.mybooks.length;
                     cb(null, 'success');
                   }, error => {
                        cb(error);
                       console.log(error);
                   });
             },
    fetchProfileData(cb){
       let headers=new Headers( { "content-type": "application/json" });
               headers['Authorization']=localStorage.accessToken;
      
            this.$http.get("http://localhost:3000/api/Students/"+localStorage.userId,{headers: headers} ).then(result => {
                 localStorage.setItem('userName',result.body.userName);
                //  console.log(localStorage.userName);
                this.$store.state.userName = localStorage.getItem('userName');
                 console.log(this.$store.state.userName);
                this.$store.state.rollnumber = result.body.rollnumber;
                this.$store.state.email = result.body.email;
                cb(null, 'successs');
                //  this.$router.push("/student/shome");
            }, error => {
              cb(error);
                console.error(error);
            });
    },
  }   
};
</script>