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
import { gcSelectors } from "../utils/gcSelectors";

export default defineComponent({
  name: "gcc-lobby-pinner",
  setup() {
    return {
      isPinned: ref(false),
      $lobby: ref(null),
    };
  },
  methods: {
    onClickHandler() {
      this.isPinned = !this.isPinned;
      if (!this.$lobby)
        this.$lobby = $(this.$el).closest(gcSelectors.lobbies.self);

      const pinnedClass =
        gcSelectors.extension.lobbies.pinned.cleaCSSSelector();

      if (this.isPinned) {
        this.$lobby.addClass(pinnedClass);
      } else {
        this.$lobby.removeClass(pinnedClass);
      }
    },
  },
});
</script>

<style lang="scss">
@use "sass:color";
@import "../styles/_variables.scss";
$fa-font-path: "../assets/fonts" !default;
$font-family: "Roboto Condensed", sans-serif;
@import "~@fortawesome/fontawesome-free/scss/regular.scss";
@import "~@fortawesome/fontawesome-free/scss/solid.scss";
@import "~@fortawesome/fontawesome-free/scss/fontawesome.scss";

// GC Overrride
.gcc-lobby-pinned {
  .gcc-lobby-pinner {
    opacity: 1;
  }

  .sala-card {
    position: relative;
  }
}

.lobby-room-list-item:hover {
  .gcc-lobby-pinner {
    opacity: 1;
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

  &:hover,
  &--pinned {
    color: $red;
  }
}
</style>