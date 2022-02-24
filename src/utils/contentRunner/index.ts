import '../../plugins/window.setup'
import '../../plugins/logger.setup'
import '../../plugins/observer.jquery'

import '@/styles/main.scss'


import Logger from "js-logger"
import Analytics from '../analytics'
import BrowserStorage from '../storage'

import '../devAuxScripts'

import serializer from '../../scripts/lobby/serializer'

class GCChallengerContentRunner {
  pageName = ''

  async preRun(response: string, resolve: any, reject: any) {
    try {
      if(!response || response === 'GA_FAILED') {
        Logger.error(`GA HAS NOT STARTED ON ${this.pageName}`)
      } else {
        Logger.debug(`🟢 GA INITIALIZED ON ${this.pageName}`)
      }

      const loggedPlayer = serializer.serializeLoggedPlayer()
      Analytics.setup(loggedPlayer)
      Analytics.set('title', this.pageName)
      Analytics.send('pageview')

      await BrowserStorage.setup()

      resolve()
    } catch (e) {
      reject?.(e)
      Analytics.sendError(`[Content Script Lobby] ${e}`)
    }
  }

  run(pageName: string): Promise<any> {
    this.pageName = pageName

    return new Promise((resolve, reject) => {
      try {
        Logger.log(`== 🚀 GamersClub Challenger is activated on ${pageName} ==`)

        if(Analytics.isAlive()){
          this.preRun('GA_INITIALIZED', resolve, reject)
        } else {
          window.browser.runtime.sendMessage({ type: 'INIT_GOOGLE_ANALYTICS' }, (response: string) => {
            this.preRun(response, resolve, reject)
          })
        }

      } catch (e) {
        reject(e)
        Analytics.sendError(`[Content Script Lobby] ${e}`)
      }
    })
  }

}

export default new GCChallengerContentRunner()