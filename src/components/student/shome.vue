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
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
       
        <td class="text-xs-right">{{ props.item.author }}</td>
        <td class="text-xs-right">{{ props.item.cat }}</td>
        <td class="text-xs-right">{{ props.item.des}}</td>
         <td class="text-xs-right"><v-btn small color="green"  @click="dialog=true">request</v-btn></td>

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
  mounted(){
   console.log('wiu');
    },
 data () {
      return {
      
        search: '',
        dialog:false,
        suc:false,
        books:this.$store.state.book,
        headers: [
          {
            text: 'BOOK TITLE',
            align: 'left',
            value: 'title'
          },
          { text: 'AUTHOR', value: 'author' },
          { text: 'CATEGORY', value: 'cat' },
          { text: 'DESCRIPTION', value: 'des' },
          { text: 'ACTION',value:'' },
          ],
       
      }
 },
 methods:{
   request(){
     this.dialog=false,
     this.suc=true
   }
 },
 /* mounted() {
            this.$http.get("").then(result => {
                this.books = result.body;
            }, error => {
                console.error(error);
            });
        },*/
}
</script>