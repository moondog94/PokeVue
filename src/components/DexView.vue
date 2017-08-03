<template>
<div id="dex">
    <v-layout id="filter" class="my-3" row>
        <v-flex xs8 offset-xs2>
            <v-expansion-panel expand>
                <v-expansion-panel-content>
                    <div slot="header">Filter</div>
                    <v-card>
                        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-waypoint @waypoint-in="inHandler"
                    @waypoint-out="outHandler"></v-waypoint>
        </v-flex>
    </v-layout>
    <v-layout class="my-3" row>
        <v-flex xs10 offset-xs1 fill-height>
            <v-card>
                <v-container fluid grid-list-xl>
                    <v-layout row wrap>
                        <v-flex xs4 sm2 v-for="(val, key, index) in pokedex" :key="index">
                            <v-card flat tile class="grey">
                                <v-card-media :src="getImage(val)" height="125px"></v-card-media>
                                <v-card-title>{{ val.species }}</v-card-title>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
    <v-fab-transition>
      <v-btn class="mb-4" secondardy fixed dark fab bottom right v-show="displayBtn" v-scroll-to="'#top'">
          <v-icon dark>arrow_upward</v-icon>
      </v-btn>
    </v-fab-transition>
</div>
</template>

<script>
import { BattlePokedex as pokedex } from '../data/pokedex'
const zpad = require('zpad').amount(3)
export default {
  data () {
    return {
      displayBtn: false,
      pokedex
    }
  },
  computed: {
  },
  methods: {
    getImage (val) {
      var id = zpad(val.num) + ''

      if (val.num === 802) {
        return 'https://www.serebii.net/art/th/802.png'
      }

      if (val.formeTag) {
        id += '_' + val.formeTag
      }

      return `http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`
    },
    inHandler () {
      this.displayBtn = false
    },
    outHandler () {
      this.displayBtn = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
