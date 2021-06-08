<template>
  <div class="gcc-challenger-filter">
    <vue-button-spinner
      :is-loading="isChalling"
      :disabled="isMissingPlayers"
      :status="status">
      <span>DESAFIAR</span>
    </vue-button-spinner>
  </div>
</template>

<script lang="ts">
import { Options, Vue, } from 'vue-class-component'
import { ref, watch } from 'vue'
import { gcSelectors } from '../scripts/lobby/gcSelectors'
import { cleanSelector } from '@/utils/StringUtils'
import VueButtonSpinner from 'vue-button-spinner'

@Options({
  components: {
    VueButtonSpinner,
  },

  props: {
  }
})
export default class KDR extends Vue {

  data(): any{
    return {
      isChalling: false,
      isMissingPlayers: false
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";

  .gcc-kdr-filter {
    color: white;
  }


</style>
