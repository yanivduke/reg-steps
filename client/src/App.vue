<template>
  <v-app>
    
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="offtop"></v-toolbar-side-icon>
      <v-container>
        <v-layout align-start justify-center row class="ontop">
          <v-avatar 
            :tile=false
            size=110
            color="grey lighten-4"
          >
            <img src="/img/service2.png" alt="avatar">
          </v-avatar>
        </v-layout>
      </v-container>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      left
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>account_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-container mt-5>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-container>

      

    <v-footer app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>

<style>
  .ontop
  {
    z-index: 100;
  }
  .offtop
  {
    z-index: 0;
  }
</style>

