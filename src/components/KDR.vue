<template>
  <div class="gcc-kdr-wrapper" @click="onClickToSeeMore">
    <div class="gcc-kdr" :class="{
      'gcc-kdr--god': 1.5 <= kdrValue,
      'gcc-kdr--above': 1.2 <= kdrValue && kdrValue < 1.5,
      'gcc-kdr--below': kdrValue < 1
    }">{{kdrValue}}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import tippy, { sticky } from 'tippy.js'
import { createApp } from '@vue/runtime-dom'
import GCCPlayerStatsComparator from './GCCPlayerStatsComparator.vue'
import { userAPI } from '../utils/gcAPI'
import { ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent ({
  // value!: number
  // _kdrValue!:number
  // playerId!: string
  // tippyInstance: any = null
  // toFetchData = false

  props: {
    tippyInstance: {
      type: Object,
      required: false,
      default: null
    },
    value: {
      type: Number,
      required: false
    },
    playerId: {
      type: String,
      required: true
    },
    toFetchData: {
      type: Boolean,
      default: false,
      required: false
    },
  },

  setup(props): any {
    return {
      tip: ref(props.tippyInstance)
    }
  },

  created(){
    if(this.toFetchData){
      userAPI.boxMatchesHistory(this.playerId!)
      .then((data) => {
        const kdrStat = data.stat.find((stat) => stat.stat === 'KDR')
        if(typeof kdrStat?.value !== 'undefined') {
          this._kdrValue = parseFloat(kdrStat.value)
        }
      })
    }
  },

  unmounted(){
    this.tippyInstance?.destroy()
    this.tip?.destroy()
  },

  computed: {
    kdrValue: {
      set(value: number){
        this._kdrValue = value
      },
      get() {
        return typeof this.value !== 'undefined' ? this.value : this._kdrValue;
      },
    }
  },

  methods: {
    onClickToSeeMore(){
      if(this.tippyInstance){
        this.tippyInstance.show()
      } else {
        const playerId = this.playerId
        this.tip.value = tippy(this.$el, {
          placement: process.env.NODE_ENV === 'development' ? 'right' : 'auto',
          plugins: [ sticky ],
          allowHTML: true,
          sticky: true,
          animation: false,
          maxWidth: 'none',
          interactive: true,
          appendTo: document.body,
          content: `<div id="gcc-tippy-content-${playerId}">Loading...</div>`,
          trigger: 'click',
          showOnCreate: true,
          onShow(instance: any) {
            const container = document.createElement('div')
            createApp(GCCPlayerStatsComparator, { playersIds: [ playerId ] }).mount(container)
            instance.setContent(container)
          }
        })
      }

    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @use "sass:color";
  @import '../styles/_variables.scss';
  $backgroundOpacity: 0.5;
  $popperBg: #23394d;
  $darkenBlue: #1e6a9b;

  $meetBg: rgba($twitterBlue, 0.5);
  $belowBg: rgba(#000000, 0.2);
  $aboveBg: $youtubeRed;
  $godBgFallback: rgb(63,94,251);
  $godBg: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

  .gcc-kdr-wrapper {
    position: relative;

    &:hover {
      .gcc-stats-trigger {
        display: block;
      }
    }
  }

  .gcc-stats-trigger {
    text-align: center;
    // display: none;
    display: none;
    height: 10px;
    color: white;
    width: 100%;
    position: absolute;
    top: -10px;
  }

  .gcc-kdr {
    background-color: $meetBg;
    color: white;
    padding: 2px 5px;
    font-size: 10px;
    width: 100%;
    text-align: center;
    border: 1px solid black;
    font-weight: 700;

    &:hover {
      box-shadow: 1px 1px 10px 1px $darkenBlue;
      cursor: pointer;
    }

    &:active {
      box-shadow: 1px 1px 10px 1px black inset;
    }

    &--god {
      background: $godBgFallback;
      background: $godBg;
    }

    &--above {
      background-color: $aboveBg;
    }

    &--below {
      background-color: $belowBg;
    }
  }
</style>
