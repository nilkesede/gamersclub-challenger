<template>
  <div class="gcc-challenger">
    <button
      class="gcc-challenger__button"
      @click="handleButtonClick"
      :disabled="!isEnabled"
      :title="tooltipMessage"
      :class="{ blink: isChalleging }"
    >
      <span v-if="isChalleging">
        <span>
          <i class="fas fa-pause"></i>
          {{ i18n.getMessage("challeging") }}
        </span>
        <i class="fas fa-spinner rotating"></i>
      </span>
      <span v-else>
        <i class="fas fa-play"></i>
        {{ i18n.getMessage("challenge") }}
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Ref, ref, watch } from "vue";
import { gcSelectors } from "@/apps/shared/extras/gc/selectors";
import { cleanSelector } from "@/apps/shared/core/settings/extensions/string.setup";
import { FULL_LOBBY_PLAYERS_NUMBER } from "@/apps/shared/extras/gc/api/resources/constants/magicNumbers";
import serializer from "@/apps/contentScripts/lobby/serializer";
import $ from "jquery";
import Logger from "js-logger";
import Analytics from "@/apps/shared/tools/analytics";
import { staticEvents } from "@/apps/shared/tools/analytics/events";

let isEnabled: Ref<boolean>;

@Options({
  components: {},

  props: {
    enabled: Boolean,
  },
})
export default class Challenger extends Vue {
  private _isChalleging = false;
  challengesIntervalId: number | undefined = undefined;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  enabled: boolean = false;

  static CHALLENGES_INTERVAL_TIME = 500;

  data(): any {
    isEnabled = ref(this.enabled);
    watch(isEnabled, this.onEnableChange.bind(this));

    return {
      isEnabled,
      i18n: window.browser.i18n,
    };
  }

  unmounted(): void {
    clearInterval(this.challengesIntervalId);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onEnableChange(newVal: any, oldVal: any): void {
    Logger.debug("Challenger onEnableChange", newVal, oldVal);
  }

  get isChalleging(): boolean {
    return this._isChalleging && isEnabled.value;
  }

  set isChalleging(value: boolean) {
    this._isChalleging = value;
  }

  handleButtonClick(): void {
    this.isChalleging = !this.isChalleging;
    clearInterval(this.challengesIntervalId);

    if (this.isChalleging) {
      this.startChallengesInterval();
      Analytics.sendEvent(staticEvents.START_AUTOMATIC_CHALLENGER);
    } else {
      Analytics.sendEvent(staticEvents.STOP_AUTOMATIC_CHALLENGER);
    }
  }

  reactToChallegingState(): void {
    const $matchModal = $(gcSelectors.preMatchModal.self);
    if (this.isChalleging && !$matchModal?.length) {
      this.makeChallenges();
    } else {
      this.isChalleging = false;
      clearInterval(this.challengesIntervalId);
    }
  }

  startChallengesInterval(): void {
    this.challengesIntervalId = setInterval(
      this.reactToChallegingState.bind(this),
      Challenger.CHALLENGES_INTERVAL_TIME
    );
  }

  makeChallenges(): void {
    const lobbies = $(gcSelectors.lobbies.self).get();
    Logger.debug(`👁️ Checking challenges for ${lobbies.length} lobbies`);

    lobbies.map((node) => {
      const {
        players,
        $el: $lobby,
        name: lobbyName,
      } = serializer.serialize(node);
      const $challengeButton = $lobby?.find(
        gcSelectors.lobbies.bigChallengeButton
      );
      const isValidLobbyByFilters =
        !$lobby?.hasClass(cleanSelector(gcSelectors.extension.hidden)) &&
        !$lobby?.hasClass(
          cleanSelector(gcSelectors.extension.lobbies.challenged)
        );

      if (
        isValidLobbyByFilters &&
        this.isChalleging &&
        $challengeButton?.length &&
        players?.length === FULL_LOBBY_PLAYERS_NUMBER
      ) {
        Logger.debug(`⚔️ Challeging ${lobbyName}`);
        $challengeButton.trigger("click");
        $lobby?.addClass(
          cleanSelector(gcSelectors.extension.lobbies.challenged)
        );
      }
    });
  }

  get tooltipMessage(): string {
    const { i18n } = window.browser;
    let message = i18n.getMessage("needMorePlayerToStartChallenging");

    if (isEnabled.value) {
      message = this.isChalleging
        ? i18n.getMessage("stopChalleging")
        : i18n.getMessage("automaticChallengeDescription");
    }

    return message;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@use "sass:color";
$blue: #247eb9;
$darkenBlue: #1e6a9b;
$gray: #484848;

.gcc-challenger {
  &__button {
    background: $blue;
    width: 100%;
    color: white;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background: $darkenBlue;
    }

    &:disabled {
      background: $gray;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  .fas {
    padding: 0 2px;
  }

  .fa-spinner {
    float: right;
  }
}
</style>
