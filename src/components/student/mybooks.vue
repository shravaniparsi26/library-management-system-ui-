<template>
  <v-app>
    <v-content >
      <v-container>
         <h></h>
         <v-container text-xs-center>
       <v-flex xs12 sm6 offset-sm3>
        <v-card dark color="primary">
          <v-card-text class="px-0">MY BOOKS</v-card-text>
        </v-card>
      </v-flex>
      </v-container>
        <template>
  <v-card>
    <v-card-title>
      MY BOOKS
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
      :items="mybooks"
      :search="search"
       class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.Book.title }}</td>
       
        <td class="text-xs-left">{{ props.item.Book.author }}</td>
        <td class="text-xs-left">{{ props.item.issued_Date }}</td>
        <td class="text-xs-left">{{ props.item.fine}}</td>
        <td class="text-xs-left">
          <v-btn small color="green lighten-2" :disabled='props.item.isReturned' @click="dialog=true,id=props.item.book_Id">return<span v-if="props.item.isReturned">ed</span></v-btn>
         
          </td>
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
      <template v-slot:footer>
      <td :colspan="headers.length">
        <strong>TOTAL BOOKS BORROWED:{{total_books}}</strong>
      </td>
    </template>
    
    </v-data-table>
  </v-card>
</template>
<v-dialog v-model="dialog" width="500" lazy>
      <v-card>
     <v-card-text>
        Are you sure you want to return?
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
         returned successfully
    </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="refresh()">OK</v-btn>
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
  methods:{
      request(){
        this.dialog=false;
        let t={
          user_Id:this.$store.state.userId,
          book_Id:this.id
        }
        console.log("return req obj"+t);
         console.log("return req obj"+JSON.stringify(t));
         let headers=new Headers( { "content-type": "application/json" });
      headers['Authorization']=this.$store.state.accessToken;
        this.$http.post("http://localhost:3000/api/transactions/return",t,{headers:headers}).then(result => {
                this.suc=true;
               
            }, error => {
              this.message=error.body.error.message;
              this.fail=true;
                //console.error(error);
            });
        // this.suc=true
        
      },
      refresh(){
        this.suc=false; 
        this.fetchData();
      },
      fetchData(){
         let headers=new Headers( { "content-type": "application/json" });
          headers['Authorization']=localStorage.accessToken;
         let url="http://localhost:3000/api/transactions?filter[include]=Book&filter[where][user_Id]="+localStorage.userId+"&getfine=true";
          console.log(url);
            this.$http.get(url,{headers:headers}).then(result => {
             
              this.mybooks = result.body;
             this.mybooks.forEach((item,index,array)=>{
                 if(item.isReturned==false){
                   this.total_books+=1;
                 }
               })
            }, error => {
                console.error(error);
            });
      }
  },
  data () {
      return {
        search: '',
        mybooks:[],
        dialog:false,
        suc:false,
        fail:false,
        message:'',
        id:'',
        total_books:0,
        headers: [
          {
            text: 'BOOK TITLE',
            value: 'Book.title',
            align:'left'
          },
          { text: 'AUTHOR', value: 'Book.author' ,align:'left'},
          { text: 'ISSUE DATE', value: 'issued_Date' ,align:'left'},
          { text: 'FINE', value: 'fine',align:'left' },
          { text: 'ACTION' ,value:'isReturned',align:'left'},
          
        ],
        
      }
    },
      mounted() {
         this.fetchData();
        },
}
</script>