<template>
  <div class="main">
  <v-navigation-drawer :clipped="clipped" v-model="drawer" app  dark class="blue">
    <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">{{uname}}</div>
            <div class="body-1">welcome to online library</div>
          </v-flex>
        </v-layout>
      </v-img>
        
        <v-divider class="mt-5"></v-divider>
      <v-list class="pa-1">
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          @click="drawer = false"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content >
            <v-list-tile-title><v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <span v-on="on">{{item.title}}</span>
      </template>
      <span>{{item.tool}}</span>
    </v-tooltip></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>     
    <v-toolbar fixed app :clipped-left="clipped" color="blue" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" ></v-toolbar-side-icon>
      <v-toolbar-title><v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <span v-on="on">LIBRARY MANAGEMENT SYSTEM</span>
      </template>
      <span>Online library</span>
    </v-tooltip></v-toolbar-title>
      <v-spacer></v-spacer>
   <v-btn small flat outline @click="dialog=true" >
        <span>LOGOUT</span>
       <!-- <v-icon right>edit</v-icon> -->
      </v-btn>
    </v-toolbar>      
    <v-dialog v-model="dialog" width="500" lazy>
      <v-card>
     <v-card-text>
         Are u sure, u want to logout?
    </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="logout()"> yes</v-btn>
          <v-btn color="primary" flat @click="dialog=false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   </div>
   
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  methods:{
             logout(){
               this.dialog=false;
        localStorage.clear();
        this.$router.push("/");
        
  },
  },
  data () {
    return {
       items: [
          { title: 'Home', icon: 'dashboard' ,path:'/student/shome',tool:'browse books'},
          { title: 'Mybooks', icon: 'question_answer' ,path:'/student/mybooks',tool:'my books'},
          { title: 'Fine', icon: 'question_answer',path:'/student/fine',tool:'display fine' },
          { title: 'Profile', icon: 'question_answer',path:'/student/profile',tool:'my profile' }
        ],
        drawer: false,
        dialog:false,
        uname:localStorage.getItem('userName'),
        
    }
  },
  created(){
    console.log(this.uname);
    console.log(this.$store.state.userName);

    this.uname=localStorage.getItem('userName');
  },
   mounted(){
    console.log(this.uname);
  }
}

</script>
