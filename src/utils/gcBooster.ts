import $ from 'jquery'
import { gcSelectors } from "./gcSelectors"

class GamersClubBooster {
  static EXTENSION_ID = 'dahnmmlhchpmmlgebpkpaofbefjdlpin'

  private isBoosterIntalled(): boolean {
    return $( gcSelectors.booster.buttonsContainer ).length > 0
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