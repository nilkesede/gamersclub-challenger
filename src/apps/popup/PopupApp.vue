<template>
  <div class="gcc-big-logo-wrapper">
    <div class="big-logo-store"></div>
    <span id="app-title">GAMERSCLUB CHALLENGER</span>
    <span class="love-link"
      title="Made with love by fans"
      target="_blank">
        <i class="fas fa-heart love"></i>
    </span>
  </div>

  <div class="settings-wrapper">
    <ul class="settings-list">
      <li
        class="settings-option"
        v-for="option in lobbyOptions" :key="option.label">
        <label class="settings-option__label" :for="option.name">
          <input type="checkbox" :id="option.name" class="settings-option__option-input settings-option__input--checkbox" v-model="option.value" @input="onChangeCheckbox($event, option.name, !option.value)">
          {{ i18n.getMessage(`settingsOption__${option.name}`) }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { GCCOptionsKey } from '@/utils/storage/types';
import { ref } from 'vue'
import { Options, Vue, } from 'vue-class-component'
import BrowserStorage from '../../utils/storage'

let updateTriggerHolder: ReturnType<typeof setTimeout>;

@Options({})
export default class KDR extends Vue {
  data(): any {
    const { options } = BrowserStorage.settings;
    const { i18n } = window.browser;
    const showLobbiesKDR = ref(typeof options?.showLobbiesKDR !== 'undefined' ? options.showLobbiesKDR : true);
    const showMyLobbyKDR = ref(typeof options?.showMyLobbyKDR !== 'undefined' ? options.showMyLobbyKDR : true);
    const showChallengeListKDR = ref(typeof options?.showChallengeListKDR !== 'undefined' ? options.showChallengeListKDR : true);
    const enableKDRFilter = ref(typeof options?.enableKDRFilter !== 'undefined' ? options.enableKDRFilter : true);
    const enableNameFilter = ref(typeof options?.enableNameFilter !== 'undefined' ? options.enableNameFilter : true)
    const enable3DGCCardEffect = ref(typeof options?.enable3DGCCardEffect !== 'undefined' ? options.enable3DGCCardEffect : true)
    const enablePlayerProgress = ref(typeof options?.enablePlayerProgress !== 'undefined' ? options.enablePlayerProgress : true)
    const enableAutoReady = ref(typeof options?.enableAutoReady !== 'undefined' ? options.enableAutoReady : true)

    return {
      i18n,
      lobbyOptions: [
        { value: showLobbiesKDR, name: 'showLobbiesKDR'},
        { value: showMyLobbyKDR, name: 'showMyLobbyKDR'},
        { value: showChallengeListKDR, name: 'showChallengeListKDR'},
        { value: enableKDRFilter, name: 'enableKDRFilter'},
        { value: enableNameFilter, name: 'enableNameFilter'},
        { value: enable3DGCCardEffect, name: 'enable3DGCCardEffect'},
        { value: enablePlayerProgress, name: 'enablePlayerProgress'},
        { value: enableAutoReady, name: 'enableAutoReady'}
      ]
    }
  }

  onChangeCheckbox(event: any, name:string, value: boolean): void {
    clearTimeout(updateTriggerHolder);
    updateTriggerHolder = setTimeout(() => {
      BrowserStorage.settings.options ||= {}
      BrowserStorage.settings.options[name as GCCOptionsKey] = value;
      BrowserStorage.updateSettings().then(() => {
        window.browser.runtime.sendMessage({ type: 'RELOAD_GC_TABS' })
      })
    }, 1500)

  }
}
</script>

<style lang="scss">
  $fa-font-path: '../../assets/fonts' !default;
  $font-family: 'Roboto Condensed', sans-serif;
  @import '~@fortawesome/fontawesome-free/scss/regular.scss';
  @import '~@fortawesome/fontawesome-free/scss/solid.scss';
  @import '~@fortawesome/fontawesome-free/scss/fontawesome.scss';

  .gcc-big-logo-wrapper {
    position: relative;
    text-align: center;

    &:hover {
      .love {
        -webkit-transform: scale(.9);
        -moz-transform: scale(.9);
        transform: scale(.9);
        display: inline-block;

        -webkit-animation: love .5s infinite linear alternate-reverse;
        -moz-animation: love .5s infinite linear alternate-reverse;
        animation: love .5s infinite linear alternate-reverse;
      }
    }

    .big-logo-store {
      width: 50px;
      height: 50px;
      background: url('../../assets/logo_500.png') no-repeat;
      background-size: contain;
      display: inline-block;
      vertical-align: top;
      margin-right: 10px;
    }

    #app-title {
      color: wheat;
      font-size: 30px;
    }

    .gcc-short-description {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      background: #ffffff;
      font-family: $font-family;
      padding: 5px;
    }
  }

  .love {
    -webkit-transition: love 0.3s ease-in-out;
    -moz-transition: love  0.3s ease-in-out;
    transition: love 0.3s ease-in-out;
  }

  .love-link {
    text-align: center;
    width: 30px;
    display: inline-block;
    outline: 0;
    color: red;
    vertical-align: super;
  }

  .settings-wrapper {
    width: 600px;
    height: auto;
    padding: 5px;
    color: white;
  }

  .settings-list {
    list-style: none;
    padding-left: 10px;
  }

  .settings-option {
    margin-top: 5px;

    &__label {
      font-size: 20px;
      color: slategray;
      font-family: $font-family;
      cursor: pointer;
      display: block;
      width: 100%;
    }
  }


  @-webkit-keyframes love {
    to {
      -webkit-transform: scale(1.2);
    }
  }

  @-moz-keyframes love {
    to {
      -moz-transform: scale(1.2);
    }
  }

  @keyframes love {
    to {
      transform: scale(1.2);
    }
  }
</style>