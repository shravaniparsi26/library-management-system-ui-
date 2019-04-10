<template>
  <v-app>
      <v-content>
      <v-container>
    <h></h>
    <template>
  <v-data-table
    :headers="headers"
    :items="books"
    class="elevation-1"
  >
    <template v-slot:items="props">
     <td>{{ props.item.title }}</td>
       
        <td class="text-xs-right">{{ props.item.author }}</td>
        <td class="text-xs-right">{{ props.item.category }}</td>
        <td class="text-xs-right">{{ props.item.description}}</td>
        <td class="text-xs-right">{{ props.item.total_Number_Copies}}</td>
        <td class="text-xs-right">{{ props.item.copies_Issued}}</td>
    </template>
  </v-data-table>
</template>
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
   mounted() {
             let headers=new Headers( { "content-type": "application/json" });
     if(localStorage.accessToken==null||localStorage.accessToken==''){this.$router.push('/');}
      headers['Authorization']=localStorage.accessToken;
            this.$http.get("http://localhost:3000/api/books",{headers:headers}).then(result => {
                this.books = result.body;
            }, error => {
                console.error(error);
            });
        },
  data () {
      return {
        search: '',
        books:[],
        headers: [
          {
            text: 'BOOK TITLE',
            align: 'left',
            value: 'title',
            align:'left'
          },
          { text: 'AUTHOR', value: 'author', align: 'left', },
          { text: 'CATEGORY', value: 'category',align: 'left' },
          { text: 'DESCRIPTION', value: 'description',align: 'left' },
           { text: 'NO. OF COPIES', value: 'total_Number_Copies',align: 'left' },
          { text: 'COPIES ISSUED',value:'copies_Issued',align: 'left' },
          
        ],
       
      }
    }
  }
   

</script>