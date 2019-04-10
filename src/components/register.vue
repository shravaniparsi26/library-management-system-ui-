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
                  <v-toolbar-title>REGISTRATION</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" lazy-validation >
                      <v-text-field
                      v-model="r.userName"
                      label="name"
                      required
                       hint="enter username"
                      persistent-hint
                      :rules="userRules"
                    :validate-on-blur="true"
                      ></v-text-field>
                    <v-text-field
                      v-model="r.email"
                      :rules="nameRules"
                      label="mail"
                      required
                      hint="enter valid mail"
                      persistent-hint
                      :validate-on-blur="true"
                      
                    ></v-text-field>
                    <v-text-field
                      v-model="r.rollnumber"
                      label="rollnumber"
                      required
                    :rules="rollRules"
                    :validate-on-blur="true"
                     hint="enter rollnumber"
                      persistent-hint
                      ></v-text-field>
                    <v-text-field
                      type="password"
                      v-model="r.password"
                      :rules="passRules"
                      label="password"
                      required
                      hint="must have a capital,numeric and special char"
                      persistent-hint
                      :validate-on-blur="true"
                    ></v-text-field>
                    <v-text-field
                      type="password"
                      v-model="r.cpassword"
                      :rules="cpassRules"
                      label="confirm password"
                      required
                      hint="password and confirm password must be same"
                      persistent-hint
                      :validate-on-blur="true"
                    ></v-text-field>
                    
                       <v-flex xs12 class="text-xs-right">
    <v-btn
      color="primary"
      dark
      @click.stop="validate()"
    >
     REGISTER
    </v-btn>
    </v-flex>
    <router-link :to="'login'">Already a member?Login</router-link>
    <v-dialog
                    v-model="dialog"
                    width="500"
                    lazy
    >
      <v-card>
     <v-card-text>
         SUCCESSFULLY REGISTERED
    </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="log()"
          >
            LOGIN TO CONTINUE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
                    v-model="fail"
                    width="500"
                    lazy
    >
      <v-card>
     <v-card-text>
         FAILED TO REGISTER!
    </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="fail=false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
 
  data() {
    return {
      r:{
      email: "",
      password: "",
      userName:"",
      cpassword:"",
      rollnumber:"",
      },
      fail:false,

      nameRules: [
        v => !!v || "field is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      userRules: [
        v => !!v || "field is required",
       v => v.trim().length!= 0||"user name must be valid",
        
      ],
      passRules: [
        v => !!v || "field is required",
        v => /[A-Z]/.test(v) || " must contain capital,special char and number",
        // v => this.f2 ?/[a-z]/.test(v) || " must contain capital,special char and number":true,
        v => /[0-9]/.test(v) || " must contain capital,special char and number",
        v =>
          /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(v) ||
          " must contain capital,special char and number"
      ],
      cpassRules: [
        v => !!v || "field is required",
       v => v===this.r.password||"passwords must be same"
      ],
      rollRules: [
        v => !!v || "field is required",
         v => v.search(' ')==-1||"should not contain spaces",
        v => v.length==10||"roll number must contain 10 character",
        
      ],
     dialog: false
      
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.r.userName=this.r.userName.trim();
       this.$http.post("http://localhost:3000/api/Students", this.r, { headers: { "content-type": "application/json" } })
       .then(result => {
                    {this.dialog=true;}
                }, error => {
                  this.fail=true;
                    console.error(error);
                });
       
      } },
      log() {
     this.dialog=false;
     this.$router.push("/login");
    }
  },
 
};
</script>