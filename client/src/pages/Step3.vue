<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex d-flex>
        <v-card flat>
          <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
          <v-form @submit.prevent="step3">
            <v-card-text>
              <v-text-field v-model="city" prepend-icon="location_city" name="city" label="city" type="text"></v-text-field>
              <v-text-field v-model="address" prepend-icon="not_listed_location" name="address" label="address" type="text"></v-text-field>
              <v-text-field v-model="zipcode" prepend-icon="local_post_office" name="zipcode" label="zipcode" type="text"></v-text-field>
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
import {STEP3_REQUEST} from '../store/actions/steps'
import {idbKeyVal} from '../idbPromise'

export default {
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    city: '',
    address: '',
    zipcode: ''
    
  }),
  name: 'page-step3',
  
  methods: {
    step3: function () {
        //this.regtoken = store.state.regtoken
        console.log("state regtoken", store.state.regtoken);
        const { city, address, zipcode } = this
        this.$store.dispatch(STEP3_REQUEST, { city, address, zipcode, regtoken: store.state.regtoken})
        .then(() => {
          this.$router.push({ name: 'Step4' })
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