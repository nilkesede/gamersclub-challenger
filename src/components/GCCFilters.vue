<template>
  <div class="gcc-filters-wrapper">

  </div>
</template>

<script lang="ts">
import { Options, Vue, } from 'vue-class-component'
import { Ref, ref, watch } from 'vue'
import { gcSelectors } from '../utils/gcSelectors'
import { cleanSelector } from '@/utils/StringUtils'
import { FULL_LOBBY_PLAYERS_NUMBER } from '@/utils/magicNumbers'
import serializer from '@/scripts/lobby/serializer'
import $ from 'jquery'
import Logger from 'js-logger'
import Analytics from '@/utils/analytics'
import { staticEvents } from '@/utils/analytics/events'
import KDRFilter from 'KDRFilter.vue'
import LobbyNameFilter from 'LobbyNameFilter.vue'

@Options({
  components: {
    KDRFilter,
    LobbyNameFilter
  },

  props: {
    enabled: Boolean
  }
})
export default class Challenger extends Vue {
  data(): any {
    return {}
  }
}

</script>

<style scoped lang="scss">

</style>