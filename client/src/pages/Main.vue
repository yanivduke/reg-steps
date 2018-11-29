<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex d-flex>
        <v-card flat>
          <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
          <v-form @submit.prevent="step1">
            <v-card-text>
              <v-text-field v-model="firstname" prepend-icon="name" name="firstname" label="first name" type="text"></v-text-field>
              <v-text-field v-model="lastname" prepend-icon="name" name="lastname" label="last name" type="text"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="button" v-show="isPostBack" @click="continueStep" color="secondary">Continue <v-icon dark right>check_circle</v-icon></v-btn>
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
import {POSTBACK_REQUEST, STEP1_REQUEST} from '../store/actions/steps'
import {idbKeyVal} from '../idbPromise'

export default {
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    firstname: '',
    lastname: '',
    isPostBack: false
  }),
  name: 'component-name',
  props: {
    prop1: String,
    prop2: {
      type: String,
      required: false
    }
  },
  
  methods: {
    continueStep: function() {
      this.$router.push({ name: 'Step' + store.getters.step })
    },
    
    
    step1: function () {
        console.log("button pushed");
        const { firstname, lastname } = this
        this.$store.dispatch(STEP1_REQUEST, { firstname, lastname }
        ).then((res) => {
          idbKeyVal.set('osAuth', 'reg-token', res.data )
          .then(() => {
            this.$router.push({ name: 'Step2' })
          })
          
        }).catch(function(e) {
          console.log(e);
        })
      },
    func2() {

    }
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
              store.state.regtoken = token
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