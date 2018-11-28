<template>
  <v-container fluid grid-list-sm>
    <v-layout justify-center row>
      <v-flex xs10 sm8 md6 lg4>
        <v-form @submit.prevent="login">
          <v-toolbar>
            <v-toolbar-title>Please enter your credentials</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field v-model="username" prepend-icon="person" name="username" label="username" type="text"></v-text-field>
            <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {AUTH_REQUEST} from '../store/actions/auth'

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        console.log("button pushed");
        const { username, password } = this
        this.$store.dispatch(AUTH_REQUEST, { username, password }
        ).then(() => {
          this.$router.push({ name: 'Main' })
        }).catch(function(e) {
          console.log(e);
        })
      }
    }
  }
</script>
