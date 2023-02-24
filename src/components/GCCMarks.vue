<template>
  <div class="gcc-marks-wrapper">
    <span v-for="(mark, index) in marks"
    :key="mark"
    class="gcc-mark"
    :class="{
      'gcc-mark--selected': selectedMarks.includes(mark)
    }"
    @click="onClickAtMark(mark, index)"
    :title="mark">
      {{GCCMarkEmojiMap[mark]}}
      </span>
    <button v-if="enableAddButton" @click="toggleConfiguring">
      <i class="fas fa-add"></i>
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

const availableMarks = ['friendly', 'leader', 'cheater', 'toxic', 'smurf', 'on_fire']

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
      isConfiguring: ref(false),
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
        return this.isConfiguring ? availableMarks : this.selectedMarks
      },
    },

    selectedMarks() {
      return BrowserStorage.settings.custom?.playersMarks || []
    }
  },

  methods: {
    toggleConfiguring() {
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

    onClickAtMark(mark) {
      const playersMarksMap = BrowserStorage.settings.custom?.playersMarks
      const currentPlayerMarks = playersMarksMap[this.playerId] || []
      playersMarksMap[this.playerId] = currentPlayerMarks

      const markIndex = currentPlayerMarks.indexOf(mark)
      if(markIndex > -1){
        currentPlayerMarks.push(mark)
      } else {
        currentPlayerMarks.splice(markIndex, 1)
      }

      if(currentPlayerMarks.length === 0){
        playersMarksMap[this.playerId] = undefined // Prevents serialization on JSON to avoid unnecessary storage
      }

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

  &--selected {
    opacity: 1;
  }
}
</style>
