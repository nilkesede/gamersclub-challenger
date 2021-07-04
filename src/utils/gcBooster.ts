import $ from 'jquery'
import { gcSelectors } from "./gcSelectors"

declare global {
  interface Window {
    chrome: any;
    gtag: any;
  }
}

class GamersClubBooster {
  static EXTENSION_ID = 'dahnmmlhchpmmlgebpkpaofbefjdlpin'

  private isBoosterIntalled(): boolean {
    return $( gcSelectors.booster.forcedLobbyCreationButton ).length > 0
  }

  isInstalled(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isBoosterIntalled() ? resolve(true) : reject();
      }, 400)
    })
  }
}

export default new GamersClubBooster()