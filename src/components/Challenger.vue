<template>
  <div class="gcc-challenger">
    <button class="gcc-challenger__button"
      @click="handleButtonClick"
      :disabled="!isEnabled"
      :title="isEnabled ?  i18n.getMessage('automaticChallengeDescription') : i18n.getMessage('needMorePlayerToStartChallenging')">
      <span v-if="isChalleging">
        <span class="blink">
          <i class="fas fa-pause"></i>
          {{ i18n.getMessage('challeging') }}
        </span>
        <i class="fas fa-spinner rotating"></i>
      </span>
      <span v-else>
        <i class="fas fa-play" ></i>
        {{ i18n.getMessage('challenge') }}
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue, } from 'vue-class-component'
import { Ref, ref, watch } from 'vue'
import { gcSelectors } from '../scripts/lobby/gcSelectors'
import { cleanSelector } from '@/utils/StringUtils'
import { FULL_LOBBY_PLAYERS_NUMBER } from '@/utils/magicNumbers'
import lobbySerializer from '@/scripts/lobby/lobbySerializer'
import $ from 'jquery'
import Logger from 'js-logger'
import Lobby from "../scripts/lobby/domain/Lobby"

declare global {
  interface Window {
    chrome: any;
  }
}

let isEnabled: Ref<boolean>

@Options({
  components: {
  },

  props: {
    enabled: Boolean
  }
})
export default class Challenger extends Vue {
  private _isChalleging = false
  challengesIntervalId: number | undefined = undefined

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  enabled: boolean = false

  static CHALLENGES_INTERVAL_TIME = 500

  data(): any {
    isEnabled = ref(this.enabled)
    watch(isEnabled, this.onEnableChange.bind(this))

    return {
      isEnabled,
      i18n: window.chrome.i18n
    }
  }

  unmounted(): void {
    clearInterval(this.challengesIntervalId)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onEnableChange(newVal: any, oldVal: any): void {
    Logger.debug('Challenger onEnableChange', newVal, oldVal)
  }

  get isChalleging(): boolean {
    return this._isChalleging && isEnabled.value
  }

  set isChalleging(value: boolean) {
    this._isChalleging = value
  }

  handleButtonClick(): void {
    this.isChalleging = !this.isChalleging
    clearInterval(this.challengesIntervalId)

    if(this.isChalleging) {
      this.startChallengesInterval()
    }
  }

  reactToChallegingState(): void {
    if(this.isChalleging) {
      this.makeChallenges()
    } else {
      this.isChalleging = false
      clearInterval(this.challengesIntervalId)
    }
  }

  startChallengesInterval(): void {
    this.challengesIntervalId = setInterval(this.reactToChallegingState.bind(this), Challenger.CHALLENGES_INTERVAL_TIME)
  }

  makeChallenges(): void {
    const lobbies = $( gcSelectors.lobby ).get()
    Logger.debug(`Checking challenges for ${lobbies.length} lobbies`)

    lobbies.map((node) => {
      const { players, $el: $lobby, name: lobbyName } = lobbySerializer.serialize(node)
      const $challengeButton = $lobby?.find(gcSelectors.lobbies.bigChallengeButton)
      const isValidLobbyByFilters = !$lobby?.hasClass(cleanSelector(gcSelectors.extension.hidden)) && !$lobby?.hasClass(cleanSelector(gcSelectors.extension.lobbies.challenged))

      if(isValidLobbyByFilters && this.isChalleging && $challengeButton?.length && players?.length === FULL_LOBBY_PLAYERS_NUMBER) {
        Logger.debug(`Challeging ${lobbyName}`)
        $challengeButton.trigger('click')
        $lobby?.addClass(cleanSelector(gcSelectors.extension.lobbies.challenged))
      }
    })
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
