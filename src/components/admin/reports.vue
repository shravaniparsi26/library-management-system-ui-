<template>
  <v-app>
   <v-content >
      <v-container>
         <h></h>
         <v-card color="blue lighten-2 dark" class="white--text">
                <v-card-title primary-title>
                  <div>
                    <div class="title">STATISTICS</div>
                  </div>
                </v-card-title>
</v-card>
<v-card>
 <v-container fluid grid-list-xl >
            <v-layout column wrap>
              <v-flex
                v-for="(value,key) in reports"
                :key="value"
              >

        <v-card  color="blue lighten-4">
          <v-card-text class="px-1"><b>{{key}}:{{value}}</b></v-card-text>
          
        </v-card>
     
      
    


              </v-flex></v-layout></v-container>
              
              <v-card
    class="mx-auto text-xs-center"
    color="blue"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">WEEKLY BOOK ISSUES STATISTICS</div>
    </v-card-text>

  </v-card>
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
   /* mounted() {
            this.$http.get("").then(result => {
                this.reports = result.body;
            }, error => {
                console.error(error);
            });
        },*/
  data () {
    return {
      reports:this.$store.state.reports,
       value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760
      ]
    }
  }
}
</script>