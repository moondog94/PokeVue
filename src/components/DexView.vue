<template>
<div id="dex">
    <v-layout id="filter" class="my-3" row>
        <v-flex xs8 offset-xs2>
            <v-expansion-panel expand>
                <v-expansion-panel-content>
                    <div slot="header">Filter</div>
                    <v-card>
                        <v-card-text class="grey lighten-3">
                          <v-container fluid>
                            <v-layout row wrap>
                              <v-flex xs7 offset-xs2>
                                <v-select label="Select Generation"
                                          :items="gens"
                                          v-model="genFilter"
                                          multiple
                                          chips
                                          max-height="200"
                                          hint="Choose which generation to filter"
                                          persistent-hint
                                          ></v-select>
                              </v-flex>
                              <v-flex xs7 offset-xs2>
                                <v-select label="Select Type"
                                          :items="types"
                                          v-model="typeFilter"
                                          multiple
                                          chips
                                          max-height="200"
                                          hint="Choose which types to filter"
                                          persistent-hint
                                          ></v-select>
                              </v-flex>
                              <v-flex xs7 offset-xs2>
                                <v-select label="Sort By"
                                          :items="sorts"
                                          v-model="sorting"
                                          single-line
                                          bottom
                                          hint="Choose sorting method"
                                          persistent-hint></v-select>
                              </v-flex>
                              <v-flex x3>
                                <v-switch :label="ascend ? 'Ascending' : 'Descending'" v-model="ascend"></v-switch>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>
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
                        <v-flex xs4 sm2 v-for="(pokemon, index) in filteredDex" :key="index">
                            <v-card flat tile class="grey">
                                <v-card-media :src="getImage(pokemon)" height="125px"></v-card-media>
                                <v-card-title>{{ pokemon.species }}</v-card-title>
                                <v-card-actions>
                                  <v-btn flat :to="`dex/${pokemon.num}`">More info</v-btn>
                                </v-card-actions>
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
      pokedex: Object.values(pokedex),
      gens: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
      genFilter: [],
      types: ['Normal', 'Grass', 'Water', 'Fire', 'Electric', 'Rock', 'Ground', 'Psychic', 'Poison', 'Flying', 'Ghost', 'Dark', 'Steel', 'Dragon', 'Ice', 'Fairy', 'Fighting', 'Bug'],
      typeFilter: [],
      sorts: ['Alphabetical', 'Numerical', 'Weight', 'Height', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed', 'HP'],
      sorting: 'Numerical',
      ascend: true
    }
  },
  computed: {
    filteredDex () {
      var vm = this
      var gen = this.genFilter
      var types = this.typeFilter

      if (gen.length === 0) {
        gen = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
      }

      if (types.length === 0) {
        types = ['Normal', 'Grass', 'Water', 'Fire', 'Electric', 'Rock', 'Ground', 'Psychic', 'Poison', 'Flying', 'Ghost', 'Dark', 'Steel', 'Dragon', 'Ice', 'Fairy', 'Fighting', 'Bug']
      }

      return this.pokedex.filter(function (pokemon) {
        return gen.includes(pokemon.gen)
      }).filter(function (pokemon) {
        return pokemon.types.some(function (type, index, array) {
          return types.includes(type)
        })
      }).sort(function (a, b) {
        switch (vm.sorting) {
          case 'Alphabetical':
            return vm.ascend ? a.species.localeCompare(b.species) : b.species.localeCompare(a.species)
          case 'Weight':
            return vm.ascend ? a.weightkg - b.weightkg : b.weightkg - a.weightkg
          case 'Height':
            return vm.ascend ? a.heightm - b.heightm : b.heightm - a.heightm
          case 'Attack':
            return vm.ascend ? a.baseStats.atk - b.baseStats.atk : b.baseStats.atk - a.baseStats.atk
          case 'Defense':
            return vm.ascend ? a.baseStats.def - b.baseStats.def : b.baseStats.def - a.baseStats.def
          case 'Sp. Attack':
            return vm.ascend ? a.baseStats.spa - b.baseStats.spa : b.baseStats.spa - a.baseStats.spa
          case 'Sp. Defense':
            return vm.ascend ? a.baseStats.spd - b.baseStats.spd : b.baseStats.spd - a.baseStats.spd
          case 'Speed':
            return vm.ascend ? a.baseStats.spe - b.baseStats.spe : b.baseStats.spe - a.baseStats.spe
          case 'HP':
            return vm.ascend ? a.baseStats.hp - b.baseStats.hp : b.baseStats.hp - a.baseStats.hp
          default: // By Number
            return vm.ascend ? a.num - b.num : b.num - a.num
        }
      })
    }
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
<style scoped lang="stylus">
 
</style>
