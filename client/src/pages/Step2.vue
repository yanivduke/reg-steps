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
import {STEP2_REQUEST} from '../store/actions/steps'
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
        //this.regtoken = store.state.regtoken
        console.log("state regtoken", store.state.regtoken);
        const { phone, email } = this
        this.$store.dispatch(STEP2_REQUEST, { phone, email, regtoken: store.state.regtoken})
        .then(() => {
          this.$router.push({ name: 'Step3' })
        })
        .catch(function(e) {
            console.log(e);
        })
    }
  },

}
</script>

<style scoped>

</style>