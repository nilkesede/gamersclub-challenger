<template>
  <div class="gcc-marks-wrapper" :key="componentKey" v-if="marks" :class="{
    'gcc-marks-wrapper--is-configuring': isConfiguring,
  }">
    <span v-for="(value, key) in marks"
      :key="key"
      class="gcc-mark"
      :class="{
        'gcc-mark--selected': value
      }"
      @click="onClickAtMark(key)"
      :title="i18n.getMessage(`playerMark__${key}`)">
      {{GCCMarkEmojiMap[key]}}
    </span>
      <i
        v-if="enableAddButton"
        @click="toggleConfiguring"
        :title="tagsTitle"
        class="fas gcc-marks__configure-button" :class="{
        'fa-tags': !isConfiguring && !isSaving,
        'fa-check': isConfiguring && !isSaving,
        'fa-spinner': isSaving,
        'rotating': isSaving
      }">
        <span v-if="isConfiguring" class="gcc-marks__configure-button-label">{{ tagsTitle }}</span>
      </i>
  </div>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import BrowserStorage from '@/apps/shared/tools/storage'
import { GCCMarkEmojiMap } from '@/apps/shared/tools/streaker/GCCMarkEmojiMap'
import AnalyticsManager from "@/apps/shared/tools/analytics";
import { dynamicEvents } from "@/apps/shared/tools/analytics/events";

const availableMarks = {
  'friendly': false,
  'leader': false,
  'onFire': false,
  'cheater': false,
  'smurf': false,
  'newbie': false,
  'toxic': false,
  'tilted': false
}

const GCCMarkComponent = defineComponent({
  props: {
    enableAddButton: {
      type: Boolean,
      required: false,
      default: false
    },
    playerId: {
      type: String,
      required: true,
    },
    playerName: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    return {
      componentKey: ref(0),
      isConfiguring: ref(false),
      isSaving: ref(false),
      GCCMarkEmojiMap,
      i18n: window.browser.i18n
    };
  },

  computed: {
    marks: {
      get() {
        return this.isConfiguring ? this.buildAvailableMarks() : this.selectedMarks()
      },
    },

    tagsTitle(){
      const { i18n } = window.browser
      return this.isConfiguring ? i18n.getMessage('playerMarksSave') : i18n.getMessage('playerMarksEdit')
    }
  },

  methods: {
    buildAvailableMarks() {
      const player = BrowserStorage.settings.custom?.players[this.playerId]
      for(let mark in availableMarks){
        availableMarks[mark] = !!(player && player.marks && player.marks[mark])
      }
      return availableMarks
    },

    selectedMarks() {
      const player = BrowserStorage.settings.custom?.players[this.playerId]

      if(!this.enableAddButton){
        const marksKeys = player && player.marks ? Object.keys(player.marks) : undefined
        const filteredMarks = marksKeys?.length ? {} : undefined
        if(marksKeys?.length){
          filteredMarks[marksKeys[0]] = player.marks[marksKeys[0]]
        }
        return filteredMarks
      }
      return player && player.marks ? player.marks : {}
    },

    async toggleConfiguring() {
      if(this.isConfiguring) {
        this.isSaving = true

        if(this.playerName){
          const playersMap = BrowserStorage.settings.custom?.players || {}
          const currentPlayer = playersMap[this.playerId] || {}
          currentPlayer.name = this.playerName
        }

        await BrowserStorage.updateSettings()
      }
      this.isSaving = false
      this.isConfiguring = !this.isConfiguring
    },

    async onClickAtMark(mark) {
      if(this.isConfiguring){
        const playersMap = BrowserStorage.settings.custom?.players || {}
        const currentPlayer = playersMap[this.playerId] || {}
        const currentPlayerMarks = currentPlayer && currentPlayer.marks ? currentPlayer.marks : {}

        playersMap[this.playerId] = currentPlayer
        currentPlayer.marks = currentPlayerMarks

        if(currentPlayerMarks[mark]){
          delete currentPlayerMarks[mark]
          availableMarks[mark] = false
        } else {
          currentPlayerMarks[mark] = true
          availableMarks[mark] = true
        }

        AnalyticsManager.sendEvent(dynamicEvents({ value: mark }).TOGGLE_PLAYER_MARK);
        this.componentKey++
      }
    }
  },
});

export default GCCMarkComponent
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@use "sass:color";
@import "@/apps/shared/core/styles/_variables.scss";

.gcc-marks-wrapper {
  display: inline-block;

  &--is-configuring {
    .gcc-marks__configure-button:hover {
      color: $green;
    }

    .gcc-mark--selected {
      cursor: pointer !important;
    }
  }
}

.gcc-mark {
  opacity: 0.5;
  cursor: pointer;
  font-size: 22px;
  filter: grayscale(100%);
  margin-left: 2px;

  &:hover {
    opacity: 0.8;
    filter: brightness(70%);
  }

  &--selected {
    cursor: help;
    opacity: 1;
    filter: brightness(100%) !important;
  }
}

.gcc-marks__configure-button {
  color: white;
  transition: color 0.2s ease-in-out;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    color: $blue;
  }

  .gcc-marks__configure-button-label {
    padding-left: 5px;
    font-family: Poppins, sans-serif;
  }
}
</style>
