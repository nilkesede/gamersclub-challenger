<template>
  <div class="gcc-stats-wrapper">
    <i v-if="isLoading" class="fas fa-spinner rotating"></i>
    <div v-if="!isLoading && stats">
      <pre>{{ JSON.stringify(stats, null, 2) }}</pre>
    </div>
    <p v-if="!isLoading && !stats">ERROR</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ref, Ref } from 'vue'
import { GCPlayerStats } from '../scripts/lobby/domain/GCPLayerStats'

@Options({
  props: {
    value: Number,
    playerId: String,
    tippyInstance: Object,
  }
})
export default class GCCStats extends Vue {
  playerId!: string
  tippyInstance!: any
  isLoading = ref(true)
  stats: Ref<GCPlayerStats | null> = ref(null)

  data(): any {
    return {}
  }

  mounted() {
    this.fetchPlayerStats()
  }

  fetchPlayerStats() {
    fetch(`https://gamersclub.com.br/api/box/history/${this.playerId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.stats.value = data
        this.isLoading.value = false
      })
      .catch((err) => { console.log('errooou', err) })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";
</style>
