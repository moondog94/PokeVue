<template>
  <v-app id="pokevue-app" light>
    <!-- NAV DRAWER START -->
    <v-navigation-drawer
      persistent
      v-model="drawer"
    >    
    </v-navigation-drawer>

    <!-- TOOLBAR START -->
    <v-toolbar class="yellow">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>PokéVue</v-toolbar-title>
    </v-toolbar>

    <!-- MAIN START -->
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>

    <!-- FOOTER START -->
    <v-footer class="red">
      <span>© {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
