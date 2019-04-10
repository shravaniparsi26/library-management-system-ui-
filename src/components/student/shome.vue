<template>
  <v-app>
    <v-content >
      <v-container>
         <h></h>
         <v-container text-xs-center>
       <v-flex xs12 sm6 offset-sm3>
        <v-card dark color="primary">
          <v-card-text class="px-0">BROWSE BOOKS</v-card-text>
        </v-card>
      </v-flex>
      </v-container>
      <template>
  <v-card>
    <v-card-title>
      <b>Browse books</b>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="books"
      :search="search"
       class="elevation-1"
      
    >
    <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
       
        <td class="text-xs-left">{{ props.item.author }}</td>
        <td class="text-xs-left">{{ props.item.category }}</td>
        <td class="text-xs-left">{{ props.item.description}}</td>
        <td class="text-xs-left"><v-btn small color="green"  @click="id=props.item.id,dialog=true">request</v-btn></td>

      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>
      <v-dialog v-model="dialog" width="500" lazy>
      <v-card>
     <v-card-text>
         do u want to continue to request?
    </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="request()"> yes</v-btn>
          <v-btn color="primary" flat @click="dialog=false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog v-model="suc" width="500" lazy>
      <v-card>
     <v-card-text>
         book request sent successfully
    </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="suc=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="fail" width="500" lazy>
      <v-card>
     <v-card-text>
        {{message}}
    </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="fail=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      
        search: '',
        id:'',
        dialog:false,
        suc:false,
        books:[],
        fail:false,
        message:'',
        headers: [
          {
            text: 'BOOK TITLE',
            align: 'left',
            value: 'title',
            align:'left'
          },
          { text: 'AUTHOR', value: 'author',align:'left' },
          { text: 'CATEGORY', value: 'category',align:'left' },
          { text: 'DESCRIPTION', value: 'description',align:'left' },
          { text: 'ACTION',value:'',align:'left', sortable: false },
          ],
       
      }
 },
 methods:{
   request(){
     this.dialog=false;
     let d=new Date();
     let t={user_Id:this.$store.state.userId,
            book_Id:this.id,
            issued_Date:Date.now(),
            return_By_This_Date:d.setDate(d.getDate() + 7)
     };
      let headers=new Headers( { "content-type": "application/json" });
      headers['Authorization']=this.$store.state.accessToken;
    
      this.$http.post("http://localhost:3000/api/transactions",t,{headers:headers}).then(result => {
                this.suc=true;
               

            }, error => {
              this.message=error.body.error.message;
              this.fail=true;
                console.error(error);
            });
    
   }
 },
 mounted() {
            this.$http.get("http://localhost:3000/api/books").then(result => {
                this.books = result.body;
            }, error => {
                console.error(error);
            });
            this.$store.state.userName=localStorage.userName;
            console.log(this.$store.state.userName);
 },
}
</script>