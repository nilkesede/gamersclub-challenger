<template>
  <i
    class="fas fa-thumbtack gcc-lobby-pinner"
    :class="{
      'fa-light': !isPinned,
      'fa-solid': isPinned,
      'gcc-lobby-pinner--pinned': isPinned,
    }"
    @click="onClickHandler"
  ></i>
</template>

<script>
import { ref, defineComponent } from "vue";
import $ from "jquery";
import { gcSelectors } from "@/apps/shared/extras/gc/tools/selectors";

const maxSlotsLenght = 3;
const pinnedClass = gcSelectors.extension.lobbies.pinned;
const cleanPinnedClass = pinnedClass.cleanCSSSelector();
const slotsRange = [...Array(maxSlotsLenght).keys()];

export default defineComponent({
  name: "gcc-lobby-pinner",
  setup() {
    return {
      isPinned: ref(false),
      lobby: ref(null),
      pinnedSlot: ref(null),
    };
  },
  methods: {
    onClickHandler() {
      this.isPinned = !this.isPinned;
      if (!this.lobby)
        this.lobby = $(this.$el).closest(gcSelectors.lobbies.self);

      if (this.isPinned && this.isEnabled()) {
        this.pinnedSlot = this.buildSlotIndex();
        this.lobby.addClass(
          `${cleanPinnedClass} ${cleanPinnedClass}--slot-${this.pinnedSlot}`
        );
      } else {
        this.isPinned = false;
        this.lobby.removeClass(
          `${cleanPinnedClass} ${cleanPinnedClass}--slot-${this.pinnedSlot}`
        );
      }
    },

    isEnabled() {
      return $(pinnedClass).length < maxSlotsLenght;
    },

    buildSlotIndex() {
      const slot = slotsRange.find((slotNumber) => {
        const length = $(`${pinnedClass}--slot-${slotNumber}`).length;
        return length === 0;
      });
      return slot;
    },
  },
});
</script>

<style lang="scss">
@use "sass:color";
@import "@/apps/shared/core/styles/_variables.scss";
@import "~@fortawesome/fontawesome-free/scss/regular.scss";
@import "~@fortawesome/fontawesome-free/scss/solid.scss";
@import "~@fortawesome/fontawesome-free/scss/fontawesome.scss";

$pinnedSlots: 3;
$slotWidth: 400px;
$initalLeftSlotSalt: 331px;

@for $i from 0 through $pinnedSlots {
  .gcc-pinned-lobby--slot-#{$i} {
    left: $slotWidth * $i + $initalLeftSlotSalt;
  }
}

// GC Overrride
.gcc-pinned-lobby {
  position: fixed;
  bottom: 0;
  z-index: 2;

  .gcc-lobby-pinner {
    opacity: 1;
  }

  .sala-card {
    position: relative;
    box-shadow: 0 0 20px 14px black;
  }
}

.lobby-room-list-item {
  transition: top 0.3s ease-in-out;

  &:hover {
    .gcc-lobby-pinner {
      opacity: 1;
    }
  }
}

.gcc-lobby-pinner {
  transform: rotate(45deg);
  position: absolute;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;

  &:hover,
  &--pinned {
    color: $red;
  }
}
</style>