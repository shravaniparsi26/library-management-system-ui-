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
      v-model="b.bookname"
      :rules="nameRules"
      label="BookName"
      required
    ></v-text-field>

    <v-text-field
      v-model="b.copies"
      :rules="nameRules"
      label="copies"
      required
    ></v-text-field>
    <v-text-field
      v-model="b.author"
      :rules="nameRules"
      label="author"
      required
    ></v-text-field>
    <v-text-field
      v-model="b.catagory"
      :rules="nameRules"
      label="catagory"
      required
    ></v-text-field>
    <v-textarea
        v-model="b.description"
        :rules="nameRules"
        
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
              /* this.$http.post(" ", this.b, { headers: { "content-type": "application/json" } }).then(result => {
                    if(this.response===){this.dialog=true;}
                }, error => {
                    console.error(error);
                });*/

         } 
      }
  },
  data () {
    return {
      b:{
        bookname:"",
        copies:"",
        author:"",
        catagory:"",
        description:"",
        dialog:false,},
       nameRules: [
        v => !!v || "field is required",
        
      ],
    }
  }
}
</script>