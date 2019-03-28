<template>
  <v-app>
      <v-content>
      <v-container>
    <h></h>
    <template>
  <v-data-table
    :headers="headers"
    :items="this.$store.state.book"
    class="elevation-1"
  >
    <template v-slot:items="props">
     <td>{{ props.item.title }}</td>
       
        <td class="text-xs-right">{{ props.item.author }}</td>
        <td class="text-xs-right">{{ props.item.cat }}</td>
        <td class="text-xs-right">{{ props.item.des}}</td>
        <td class="text-xs-right">{{ props.item.copies}}</td>
        <td class="text-xs-right"><v-btn small color="red lighten-2">delete</v-btn></td>
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
  /* mounted() {
            this.$http.get("").then(result => {
                this.book = result.body;
            }, error => {
                console.error(error);
            });
        },*/
  data () {
      return {
        search: '',
        book:[],
        headers: [
          {
            text: 'BOOK TITLE',
            align: 'left',
            value: 'title'
          },
          { text: 'AUTHOR', value: 'author', align: 'right', },
          { text: 'CATEGORY', value: 'cat',align: 'right' },
          { text: 'DESCRIPTION', value: 'des',align: 'right' },
           { text: 'NO. OF COPIES', value: 'copies',align: 'right' },
          { text: 'ACTION',align: 'right' },
          
        ],
       
      }
    }
  }
   

</script>