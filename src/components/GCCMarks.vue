<template>
  <div class="gcc-marks-wrapper" :key="componentKey">
    <span v-for="(mark, index) in marks"
    :key="mark"
    class="gcc-mark"
    :class="{
      'gcc-mark--selected': selectedMarks().includes(mark)
    }"
    @click="onClickAtMark(mark, index)"
    :title="mark">
      {{GCCMarkEmojiMap[mark]}}
      </span>
    <button v-if="enableAddButton"
      @click="toggleConfiguring"
      class="gcc-marks__configure-button" :class="{
        'gcc-marks__configure-button--is-configuring': isConfiguring
      }">
      <i class="fas" :class="{
        'fa-eye': !isConfiguring && !isSaving,
        'fa-check': isConfiguring && !isSaving,
        'fa-spinner': isSaving,
        'rotating': isSaving
      }"></i>
    </button>
  </div>
</template>

<script>
import tippy, { sticky } from "tippy.js";
import { createApp } from "@vue/runtime-dom";
import { ref } from "vue";
import { defineComponent } from "vue";
import BrowserStorage from '@/utils/storage'
import { GCCMarkEmojiMap } from '@/utils/GCCMarkEmojiMap'

const availableMarks = ['friendly', 'leader', 'on_fire', 'cheater', 'smurf', 'newbie', 'toxic', 'tilted']

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
        return this.isConfiguring ? availableMarks : this.selectedMarks()
      },
    },
  },

  methods: {
    selectedMarks() {
      return BrowserStorage.settings.custom?.playersMarks[this.playerId] || []
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
      const playersMarksMap = BrowserStorage.settings.custom?.playersMarks
      const currentPlayerMarks = playersMarksMap[this.playerId] || []
      playersMarksMap[this.playerId] = currentPlayerMarks

      const markIndex = currentPlayerMarks.indexOf(mark)
      if(markIndex > -1){
        currentPlayerMarks.splice(markIndex, 1)
      } else {
        currentPlayerMarks.push(mark)
      }

      if(currentPlayerMarks.length === 0){
        playersMarksMap[this.playerId] = undefined // Prevents serialization on JSON to avoid unnecessary storage
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

  &--selected {
    opacity: 1;
  }
}

.gcc-marks__configure-button {
  color: white;
  transition: background-color 0.2s ease-in-out;
  margin: 0;

  &:hover {
    background: $blue;
  }

  &--is-configuring {
    margin-left: 5px;
    border: 0.3px dashed $green;

    &:hover {
      background: $green;
    }
  }
}
</style>
