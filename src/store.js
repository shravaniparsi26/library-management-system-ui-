import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export const store=new Vuex.Store({
    state:{
        book:[
                {
                  title:'operating system',
                  author:'abc',
                  cat:'cs',
                  des:'abc'
                },
                {
                  title:'computer networks',
                  author:'def',
                  cat:'cs',
                  des:'def'
                },
                {
                  title:'c programing',
                  author:'dennis ritche',
                  cat:'IT',
                  des:'lkj'
                },
                {
                  title:'java',
                  author:'james gosling',
                  cat:'IT',
                  des:'fgldijgdf'
                },
                {
                 title:'mechanics',
                  author:'hjk',
                  cat:'mechanical',
                  des:'jdslwlkfjw'
                },
                {
                 title:'construction management',
                  author:'gsdk',
                  cat:'civil',
                  des:'jlojdwiwej'
                },
                {
                 title:'ethics',
                  author:'fopw',
                  cat:'h&s',
                  des:'iohlojl'
                },
                {
                  title:'android',
                  author:'hjegf',
                  cat:'IT',
                  des:'cdk.;fer'
                },
                {
                  title:'ios',
                  author:'ifhoe',
                  cat:'cs',
                  des:'ifppwif'
                },
                {
                 title:'flat',
                  author:'heofw',
                  cat:'IT',
                  des:'euofiwufop'
                }
            
        ],
        mybooks: [
            {
              title:'operating system',
              author:'abc',
             issue:'12-10-12',
             fine:'40',
             isreturn:true
            },
            {
              title:'computer networks',
              author:'def',
             issue:'12-10-12',
             fine:'40', isreturn:true
            },
            {
              title:'c programing',
              author:'dennis ritche',
             issue:'12-10-12',
             fine:'40', isreturn:false
            },
            {
              title:'java',
              author:'james gosling',
             issue:'12-10-12',
             fine:'40', isreturn:false
            },
            {
             title:'mechanics',
              author:'hjk',
            issue:'12-10-12',
             fine:'40',isreturn:false
            },
            {
             title:'construction management',
              author:'gsdk',
             issue:'12-10-12',
             fine:'40',isreturn:false
            },
            {
             title:'ethics',
              author:'fopw',
             issue:'12-10-12',
             fine:'40',isreturn:false
            },
            {
              title:'android',
              author:'hjegf',
            issue:'12-10-12',
             fine:'40',isreturn:false
            },
            {
              title:'ios',
              author:'ifhoe',
             issue:'12-10-12',
             fine:'40',isreturn:true
            },
            {
             title:'flat',
              author:'heofw',
             issue:'12-10-12',
             fine:'40',isreturn:false
            }
          ],
          fine: [
            {
              title:'operating system',
              
             issue:'12-10-12',
             fine:'40'
            },
            {
              title:'computer networks',
             
             issue:'12-10-12',
             fine:'40'
            },
            {
              title:'c programing',
             
             issue:'12-10-12',
             fine:'40'
            },
            {
              title:'java',
              
             issue:'12-10-12',
             fine:'40'
            },
            {
             title:'mechanics',
             
            issue:'12-10-12',
             fine:'40'
            },
            {
             title:'construction management',
             
             issue:'12-10-12',
             fine:'40'
            },
            {
             title:'ethics',
             
             issue:'12-10-12',
             fine:'40'
            },
            {
              title:'android',
             
            issue:'12-10-12',
             fine:'40'
            },
            {
              title:'ios',
             
             issue:'12-10-12',
             fine:'40'
            },
            {
             title:'flat',
             issue:'12-10-12',
             fine:'40'
            }
          ],
          profile: {
              NAME:'',
              ROLLNO:'',
              MAIL:'',
             BOOKSBORROWED:'',
              RETURNED:'',
               FINE:'',
           
          },
          reports: {
            TOATAL_BOOKS:'',
            TOTAL_MEMBERS:'',
            TOTAL_FINE:'',
            
            
         
          },

        
    },
   /* mutations: {
        setl (state) {
          // mutate state
          n = Object.values(b)
        }
      }*/
});