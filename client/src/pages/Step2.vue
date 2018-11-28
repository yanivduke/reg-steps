<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex d-flex>
        <v-card flat>
          <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
          <v-form @submit.prevent="step2">
            <v-card-text>
              <v-text-field v-model="phone" prepend-icon="phone" name="phone" label="phone" type="text"></v-text-field>
              <v-text-field v-model="email" prepend-icon="email" name="email" label="email" type="text"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary">Next <v-icon dark right>check_circle</v-icon></v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
</template>

<script>
import store from '../store'
import {POSTBACK_REQUEST, STEP2_REQUEST} from '../store/actions/steps'
import {idbKeyVal} from '../idbPromise'

export default {
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    phone: '',
    email: '',
  }),
  name: 'page-step2',
  
  methods: {
    step2: function () {
        //console.log("button pushed");
        const { phone, email } = this
        this.$store.dispatch(STEP2_REQUEST, { phone, email }
        ).then((res) => {
            idbKeyVal.set('osAuth', 'reg-token', res.data
            )
            .then(() => {
            this.$router.push({ name: 'Step2' })
            })
            
        }).catch(function(e) {
            console.log(e);
        })
    },
    
  },
  created() {
    idbKeyVal.get('osAuth', 'reg-token')
      .then((token) => {
        if(token!=undefined){
          console.log(token)
          this.$store.dispatch(POSTBACK_REQUEST, {regtoken: token})
          .then((res)=>{
            console.log("step in store: " ,store.getters.step)
            if(store.getters.step>0){
              this.isPostBack = true;
            } else {
              this.isPostBack = false;
            }
          })
          
       
        } else {
            this.isPostBack = false;
        }
        console.log(store.getters.step)
      })
  },

}
</script>

<style scoped>

</style>