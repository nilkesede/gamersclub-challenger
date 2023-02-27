<template>
  <div class="gcc-marks-wrapper" :key="componentKey">
    <span v-for="(value, key) in marks"
      :key="key"
      class="gcc-mark"
      :class="{
        'gcc-mark--selected': value
      }"
      @click="onClickAtMark(key)"
      :title="key">
      {{GCCMarkEmojiMap[key]}}
    </span>
      <i
        v-if="enableAddButton"
        @click="toggleConfiguring"
        title="tags"
        class="fas gcc-marks__configure-button" :class="{
        'gcc-marks__configure-button--is-configuring': isConfiguring,
        'fa-tags': !isConfiguring && !isSaving,
        'fa-check': isConfiguring && !isSaving,
        'fa-spinner': isSaving,
        'rotating': isSaving
      }"></i>
  </div>
</template>

<script>
import tippy, { sticky } from "tippy.js";
import { createApp } from "@vue/runtime-dom";
import { ref } from "vue";
import { defineComponent } from "vue";
import BrowserStorage from '@/utils/storage'
import { GCCMarkEmojiMap } from '@/utils/GCCMarkEmojiMap'

const availableMarks = {
  'friendly': false,
  'leader': false,
  'on_fire': false,
  'cheater': false,
  'smurf': false,
  'newbie': false,
  'toxic': false,
  'tilted': false
}

const GCCMarkComponent = defineComponent({
  props: {
    tippyInstance: {
      type: Object,
      required: false,
      default: null,
    },
    enableAddButton: {
      type: Boolean,
      required: false,
      default: false
    },
    playerId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    return {
      tip: ref(props.tippyInstance),
      componentKey: ref(0),
      isConfiguring: ref(false),
      isSaving: ref(false),
      GCCMarkEmojiMap
    };
  },

  unmounted() {
    this.tippyInstance?.destroy();
    this.tip?.destroy();
  },

  computed: {
    marks: {
      get() {
        return this.isConfiguring ? this.buildAvailableMarks() : this.selectedMarks()
      },
    },
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
      return player && player.marks ? player.marks : {}
    },

    async toggleConfiguring() {
      if(this.isConfiguring) {
        this.isSaving = true
        await BrowserStorage.updateSettings()
      }
      this.isSaving = false
      this.isConfiguring = !this.isConfiguring
    },

    onClickToSeeMore() {
      if (this.tippyInstance) {
        this.tippyInstance.show();
      } else {
        const playerId = this.playerId;
        this.tip = tippy(this.$el, {
          placement: "bottom",
          plugins: [sticky],
          allowHTML: true,
          sticky: true,
          animation: false,
          maxWidth: "none",
          interactive: true,
          appendTo: document.body,
          content: `<div id="gcc-tippy-content-${playerId}">Loading...</div>`,
          trigger: "click",
          showOnCreate: true,
          onShow(instance) {
            const container = document.createElement("div");
            createApp(GCCMarkComponent, {
              marks: ['friendly', 'leader', 'cheater', 'toxic', 'smurf', 'on_fire'],
              playerId
            }).mount(container);
            instance.setContent(container);
          },
        });
      }
    },

    async onClickAtMark(mark) {
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

      this.componentKey++
    }
  },
});

export default GCCMarkComponent
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@use "sass:color";
@import "../styles/_variables.scss";

.gcc-mark {
  opacity: 0.5;
  cursor: pointer;
  font-size: 24px;
  filter: grayscale(100%);

  &--selected, &:hover {
    opacity: 1;
    filter: brightness(100%);
  }
}

.gcc-marks__configure-button {
  color: white;
  transition: color 0.2s ease-in-out;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    color: $orange;
  }

  &--is-configuring {
    &:hover {
      color: $green;
    }
  }
}
</style>
