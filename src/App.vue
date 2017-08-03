<template>
  <v-app light>
    <v-navigation-drawer
      persistent
      clipped
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
          ripple
        >
          <v-list-tile-action>
            <svgicon :icon="item.icon" width="22"></svgicon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>


    <main id="top">
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </main>


    <v-footer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import './compiled-icons/pokeball'
  import './compiled-icons/pokemon_go'
  export default {
    data () {
      return {
        drawer: false,
        items: [
          { icon: 'pokeball', title: 'Pokédex', path: '/dex' },
          { icon: 'pokemon_go', title: 'Pokédex GO', path: '/' }
        ],
        miniVariant: false,
        title: 'Pokévue'
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
