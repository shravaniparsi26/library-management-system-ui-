<template>
  <v-app>
    <v-content >
      <v-container>
         <h></h>
        </v-container>
         <v-container text-xs-center>
       <v-flex xs12 sm6 offset-sm3>
        <v-card dark color="primary">
          <v-card-text class="px-0">STUDENT DETAILS</v-card-text>
        </v-card>
      </v-flex>
      </v-container>
      <div class="search" v-show="su">
    <v-form ref="form" lazy-validation >
      <v-text-field
       
        class="mx-3"
        
        label="enter student rollno"
        prepend-inner-icon="search"
        outline
        :rules="searchRules"
        v-model="studentrollno"
      ></v-text-field>    
      
                   <v-flex xs12 class="text-xs-center">
                    <v-btn flat color="blue" @click="searchbar()" outline>SEARCH</v-btn>
                    </v-flex> 
    </v-form>
   
  </div>
        <div class="details" v-show="d">
        <v-card dark color="primary" class="ma-2">
          <v-card-text class="px-0">
             <p > NAME:<span class="ml-5"><b>{{name}}</b></span></p>
        </v-card-text>
              <v-divider></v-divider>
         <v-card-text class="px-0">
            <p> ROLL NO:<span class="ml-4"><b>{{rollno}}</b></span></p>
        </v-card-text>
              <v-divider></v-divider>
               <v-card-text class="px-0">
            <p> MAIL:<span class="ml-5"><b>{{mail}}</b></span></p>
        </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                   <v-flex xs12 class="text-xs-center">
                    <v-btn flat color="white" @click="proceed()" outline>PROCEED</v-btn>
                     <v-btn flat color="white" @click="cancel()" outline>CANCEL</v-btn>
                    </v-flex>
         
        </v-card-actions>
        </v-card>
        </div>
        <div class="return" v-show="r">
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
      item-key="book_Id"
      :search="search"
      v-model="selected"
    >
      <template v-slot:items="props">
        <td>{{ props.item.Book.title }}</td>
        <td class="text-xs-left">{{ props.item.issued_Date }}</td>
        <td class="text-xs-left">{{ props.item.fine}}</td>
        <td class="text-xs-left">
          <v-btn small color="red lighten-2"  @click="dialog=true,id=props.item.Book.id">clear</v-btn>
         </td>
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    </v-card>
    <v-flex xs12 class="text-xs-center">
                     <v-btn flat color="blue" outline="" @click="back()">GO BACK</v-btn>
                    </v-flex>
</template>
        </div>
     <v-dialog v-model="dialog" width="500" lazy>
      <v-card>
     <v-card-text>
        Are you sure you want to clear fine?
    </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="pay()"> yes</v-btn>
          <v-btn color="primary" flat @click="dialog=false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="suc" width="500" lazy>
      <v-card>
     <v-card-text>
          success
    </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="refresh()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  data(){
      return{
          su:true,
          d:false,
          r:false,
         
        id:'',
        s:{
        user_Id:'',
         bookIds:[],
         },
        studentrollno:'',
        mybooks:[],
        search: '',
         dialog:false,
        suc:false,
        fail:false,
        message:'',
        amount:0,
        name:'ha',
        rollno:'ha',
        mail:'hjs',
        selected:[],
        fines:[],
         pagination: {
        sortBy: 'fine'
      },
        headers: [
          {
            text: 'BOOK TITLE',
            align: 'left',
            value: 'Book.title',
            align:'left'
          },
          { text: 'ISSUE DATE', value: 'issued_Date' ,align:'left'},
          { text: 'FINE', value: 'fine',align:'left' },
          { text: 'ACTION' ,value:'isReturned',align:'left'},
          
        ],
        searchRules: [
        v => !!v || "enter roll number",
      ],
      }
  },
  methods:{
      searchbar(){
          if (this.$refs.form.validate()) {
         
           let headers=new Headers( { "content-type": "application/json" });
     if(localStorage.accessToken==null||localStorage.accessToken==''){this.$router.push('/');}
      headers['Authorization']=localStorage.accessToken;
      let url = "http://localhost:3000/api/Students?filter[where][rollnumber]="+this.studentrollno;
      console.log(url);
          this.$http.get(url, {headers:headers})
              .then(result => {
                console.log(result);
               this.su=false;
                this.name=result.body[0].userName;
                this.rollno=result.body[0].rollnumber;
                this.mail=result.body[0].email;
                this.s.user_Id=result.body[0].id;
                this.d=true;
                

                
               }, error => {
                  console.log(error);
                });

          }
      },
      proceed(){
          let headers=new Headers( { "content-type": "application/json" });
     if(localStorage.accessToken==null||localStorage.accessToken==''){this.$router.push('/');}
      headers['Authorization']=localStorage.accessToken;
           this.$http.get("http://localhost:3000/api/transactions?filter[include]=Book&filter[where][user_Id]="+this.s.user_Id+"&getfine=true", {headers:headers})
              .then(result => {
                this.d=false
                this.mybooks=result.body;
                this.mybooks.forEach((item,index,array)=>{
                 console.log(item);
                 if(item.fine!=0 && item.isReturned==false){
                   this.fines.push(item);
                 }
               })
                 this.r=true

                
               }, error => {
                  console.log(error);
                });

      },
      cancel(){
          this.su=true
          this.d=false
          this.$refs.form.reset()
      },
      clear(){
        this.dialog=true;
       
      },
      back(){
          this.su=true
          this.r=false
          this.$refs.form.reset()
      },
      pay(){
        
          this.s.bookIds[0]=this.id;
          let headers=new Headers( { "content-type": "application/json" });
     if(localStorage.accessToken==null||localStorage.accessToken==''){this.$router.push('/');}
      headers['Authorization']=localStorage.accessToken;
          this.$http.post("http://localhost:3000/api/transactions/returnWithFine",this.s, {headers:headers})
              .then(result => {
               this.dialog=false;
                this.suc=true;
                
               }, error => {
                  console.log(error);
                });

      },
      refresh(){
          
          this.r=false;
         this.fetchData((err, status) => {
            if(err) console.log(err);
            else {
              console.log("mybooks"+this.mybooks);
              this.suc=false; 
              this.r=true;
            }
          });
      },
      fetchData(cb){
         let headers=new Headers( { "content-type": "application/json" });
         if(localStorage.accessToken==null||localStorage.accessToken==''){this.$router.push('/');}
      headers['Authorization']=localStorage.accessToken;
          this.$http.get("http://localhost:3000/api/transactions?filter[include]=Book&filter[where][isReturned]=false&filter[where][user_Id]="+this.s.user_Id+"&getfine=true", this.studentrollno, {headers:headers})
              .then(result => {
                this.suc=false; 
                this.mybooks=result.body;
                this.fines = [];
                 this.mybooks.forEach((item,index,array)=>{
                 console.log(item);
                 if(item.fine!=0 && item.isReturned==false){
                   this.fines.push(item);
                 }
                 cb(null, 'successs');
               })
                
               }, error => {
                  console.log(error);
                  cb('err');
                });
      }
     
    }
  }
  
  
</script>
