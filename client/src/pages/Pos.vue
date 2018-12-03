<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex d-flex xs12 order-xs5>
        <v-layout column>
          <v-flex d-flex>
            <v-card color="blue-grey" dark tile flat>
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-card color="brown" dark tile flat>
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import store from '../store'
import {idbKeyVal} from '../idbPromise'

export default {
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. 
    Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, 
    explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, 
    alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
  }),
  name: 'pos',
  
  methods: {
     
  },  
}
</script>