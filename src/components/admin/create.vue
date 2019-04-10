<template>
  <v-app>
    <v-content>
        <v-container>
            <h></h>
            <v-card >
                <v-toolbar dark color="blue lighten-2">
                  <v-toolbar-title>ADD BOOK</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                     <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="b.title"
      :rules="titleRules"
      label="BookName"
      required
    ></v-text-field>

    <v-text-field
      v-model="b.total_Number_Copies"
      :rules="copyRules"
      label="copies"
      type="number"
      required
    ></v-text-field>
    <v-text-field
      v-model="b.author"
      :rules="authorRules"
      label="author"
      required
    ></v-text-field>
    <v-text-field
      v-model="b.category"
      :rules="categoryRules"
      label="catagory"
      required
    ></v-text-field>
    <v-textarea
        v-model="b.description"
        :rules="descriptionRules"
        
        label="Description"
        rows="5"
      ></v-textarea>
       <v-flex xs12 class="text-xs-right">
    <v-btn
      color="primary"
      dark
      @click.stop="validate()"
    >
     ADD BOOK
    </v-btn>
    </v-flex>
    <v-dialog
                    v-model="dialog"
                    width="500"
                    lazy
                    >
      <v-card>
     <v-card-text>
        BOOK ADDED
    </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog=false"
          >
          CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
                     </v-form>

                     
                </v-card-text>
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
  methods:{
      validate(){
         if (this.$refs.form.validate()) {
             this.dialog=true;
             this.b.title=this.b.title.trim();
             this.b.author=this.b.author.trim();
             this.b.description=this.b.description.trim();
             this.b.category=this.b.category.trim();
              let headers=new Headers( { "content-type": "application/json" });
      if(localStorage.accessToken==null||localStorage.accessToken==''){this.$router.push('/');}
      headers['Authorization']=localStorage.accessToken;
               this.$http.post("http://localhost:3000/api/books", this.b, { headers:headers }).then(result => {
                    {
                      this.dialog=true;
                      this.$refs.form.reset();
                    }
                }, error => {
                    console.error(error);
                });

         } 
      }
  },
  data () {
    return {
      b:{
        title:"",
        total_Number_Copies:"",
        author:"",
        category:"",
        description:"",
       
        },
         dialog:false,
       titleRules: [
        v => !!v || "field is required",
        v => v.trim().length!= 0||"title name must be valid",
        ],
         copyRules: [
        v => !!v || "field is required",
        v => v.length!=0||"must be number,not empty",
        ],
         authorRules: [
        v => !!v || "field is required",
        v => v.trim().length!= 0||"author name must be valid",
        ],
         categoryRules: [
        v => !!v || "field is required",
        v => v.trim().length!= 0||"category name must be valid",
        ],
         descriptionRules: [
        v => !!v || "field is required",
        v => v.trim().length!= 0||"description name must be valid",
        ],

    }
  }
}
</script>