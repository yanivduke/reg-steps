<template>
  <v-container fluid>
    <v-navigation-drawer
      v-model="drawer"
      right
      width=500
      absolute
    >
      <v-layout align-start justify-space-between row>
        <v-flex d-flex>
          <v-layout column>
            <v-flex d-flex>
              <v-card color="blue-grey" dark tile flat>
                <v-layout column>
                  <v-btn @click="initItems">init now</v-btn>
                  <v-flex d-flex md6>
                    <pos-items v-bind:items="items" v-bind:add="onItemClick"></pos-items>
                  </v-flex>
                </v-layout>
                <v-flex d-flex md6>
                  <pos-total v-bind:items="lineItems" v-bind:edit="toggleEdit" v-bind:remove="removeItem"></pos-total>
                </v-flex>
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
    </v-navigation-drawer>
    <v-layout row wrap>
      <v-flex d-flex>
        <h1>Point of Sale</h1>
        <v-layout column>
        <v-flex d-flex md6>
          <pos-total v-bind:items="lineItems" v-bind:edit="toggleEdit" v-bind:remove="removeItem"></pos-total>
        </v-flex>
        </v-layout>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>
<script>

import store from '../store'
import {idbKeyVal} from '../idbPromise'
import PosTotal from '../components/PosTotal'
import PosItems from '../components/PosItems'
export default {
  
  data: () => ({
    items: [],
    lineItems: [],
    drawer: true,
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. 
    Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, 
    explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, 
    alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
  }),
  name: 'pos',

  
  components: {
      'pos-total': PosTotal,
      'pos-items': PosItems
  },
  methods: {
      initItems: function () {
          fetch('/items.json', {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: "same-origin", // include, same-origin, *omit
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
        .then((resp) => resp.json().then((respJson) => {
          console.log("items is: ", this.items)
          console.log("fetch items: ", respJson)
          this.items = respJson;
          PosItems.items = this.items
        }))
        .catch(err => {
          console.log("fetch items fail: ", err)
        })
      },
      onItemClick: function(item) {
          var found = false;

          for (var i = 0; i < this.lineItems.length; i++) {
              if (this.lineItems[i].item === item) {
                  this.lineItems[i].numberOfItems++;
                  found = true;
                  break;
              }
          }

          if (!found) {
              this.lineItems.push({ item: item, numberOfItems: 1, editing: false });
          }
      },
      toggleEdit: function(lineItem) {
          lineItem.editing = !lineItem.editing;
      },
      removeItem: function(lineItem) {
          for (var i = 0; i < this.lineItems.length; i++) {
              if (this.lineItems[i] === lineItem) {
                  this.lineItems.splice(i, 1);
                  break;
              }
          }
      }
  }
}
</script>