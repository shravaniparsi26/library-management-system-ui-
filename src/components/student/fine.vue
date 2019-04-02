<template>
  <v-app>
    <v-content >
      <v-container>
         <h></h>
         <v-container text-xs-center>
       <v-flex xs12 sm6 offset-sm3>
        <v-card dark color="primary">
          <v-card-text class="px-0">FINES</v-card-text>
        </v-card>
      </v-flex>
      </v-container>
        <template>
  <v-card>
    <v-card-title>
    books
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
      :items="fines"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.Book.title }}</td>
        <td class="text-xs-right">{{ props.item.issued_Date }}</td>
        <td class="text-xs-right">{{ props.item.fine}}</td>
         <td class="text-xs-right"><v-btn small color="blue lighten-2" @click="id=props.item.book_Id,dialog=true">return</v-btn></td>
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
      <template v-slot:footer>
      <td :colspan="headers.length">
        <strong>TOTAL FINE:{{amount}}</strong>
      </td>
    </template>
    </v-data-table>
  </v-card>
</template>
<v-dialog v-model="dialog" width="500" lazy>
      <v-card>
     <v-card-text>
         do u want to submit return request?
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
         book return request sent successfully
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
   methods:{
      request(){
        this.dialog=false;
       let t={
          user_Id:this.$store.state.userId,
          book_Id:this.id
        };
         let headers=new Headers( { "content-type": "application/json" });
      headers['Authorization']=this.$store.state.accessToken;
         this.$http.post("http://localhost:3000/api/transactions/return",t,{headers:headers}).then(result => {
                this.suc=true;
                this.$router.push("/student/mybooks");
            }, error => {
              this.message=error.body.error.message;
              this.fail=true;
                console.error(error);
            });
        // this.suc=true
        
      }
  },
   mounted() {
           let headers=new Headers( { "content-type": "application/json" });
      headers['Authorization']=this.$store.state.accessToken;
          let url="http://localhost:3000/api/transactions?filter[include]=Book&filter[where][user_Id]="+this.$store.state.userId;
            this.$http.get(url,{headers:headers}).then(result => {
                this.mybooks = result.body;
                console.log(this.mybooks);
               this.mybooks.forEach((item,index,array)=>{
                 console.log(item);
                 if(item.fine!=0){
                   this.fines.push(item);
                 }
               })
                this.fines.forEach((item) => {
                this.amount+=item.fine;
                  
                });
            }, error => {
                console.error(error);
            });
        },
  data () {
      return {
        fines:[],
        id:'',
        mybooks:[],
        search: '',
         dialog:false,
        suc:false,
        fail:false,
        message:'',
        amount:0,
        headers: [
          {
            text: 'BOOK TITLE',
            align: 'left',
            value: 'Book.title',
            align:'left'
          },
          { text: 'ISSUE DATE', value: 'issued_Date' ,align:'left'},
          { text: 'FINE', value: 'fine',align:'left' },
          { text: 'ACTION',align:'left',value:'' },
          
        ],
       
        
      }
  }
}
</script>