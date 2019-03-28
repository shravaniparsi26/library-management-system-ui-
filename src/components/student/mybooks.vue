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
      :items="this.$store.state.mybooks"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
       
        <td class="text-xs-right">{{ props.item.author }}</td>
        <td class="text-xs-right">{{ props.item.issue }}</td>
        <td class="text-xs-right">{{ props.item.fine}}</td>
        <td class="text-xs-right">
          <v-btn small color="green lighten-2" :disabled='props.item.isreturn' @click="dialog=true">return</v-btn>
         
          </td>
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
      <template v-slot:footer>
      <td :colspan="headers.length">
        <strong>TOTAL BOOKS BORROWED:</strong>
      </td>
    </template>
    
    </v-data-table>
  </v-card>
</template>
<v-dialog v-model="dialog" width="500" lazy>
      <v-card>
     <v-card-text>
         do u want submit return request?
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
       
        this.dialog=false,
         this.suc=true
        
      }
  },
  data () {
      return {
        search: '',
        mybooks:[],
        dialog:false,
        suc:false,
        headers: [
          {
            text: 'BOOK TITLE',
            align: 'left',
            value: 'title'
          },
          { text: 'AUTHOR', value: 'author' ,align:'right'},
          { text: 'ISSUE DATE', value: 'issue' ,align:'right'},
          { text: 'FINE', value: 'fine',align:'right' },
          { text: 'ACTION',align:'right' ,value:''},
          
        ],
        
      }
    },
     /* mounted() {
            this.$http.get("").then(result => {
                this.mybooks = result.body;
            }, error => {
                console.error(error);
            });
        },*/
}
</script>