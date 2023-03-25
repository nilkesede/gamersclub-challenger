import $ from 'jquery'
import { gcSelectors } from "@/shared/extras/gc/selectors"

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

  removeKdrElement(playerNode: any) {
    const $boosterKDR = playerNode.find(gcSelectors.booster.kdr)
    if($boosterKDR?.length) {
      $boosterKDR.remove()
    }
  }
}

export default new GamersClubBooster()