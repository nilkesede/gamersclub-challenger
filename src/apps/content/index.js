import '../../plugins/observer.jquery'
import '../../plugins/logger.setup'
import Logger from 'js-logger'
import '@/styles/main.scss'
import Analytics from '../../utils/AnalyticsManager'
import { backgroundMessages } from '../serviceWorkerResources/messages'

import LobbiesModifier from '../../scripts/lobby/LobbiesModifier'
import FiltersModifier from '../../scripts/lobby/filtersModifier'
import MyLobbyModifier from '../../scripts/lobby/MyLobbyModifier'
import ChallengeListModifier from '../../scripts/lobby/ChallengeListModifier'

// ===
// Run
// ===
try {
  Logger.log('== 🚀 GamersClub Challenger is activated ==')

  window.chrome.runtime.sendMessage({ type: 'INIT_GOOGLE_ANALYTICS' }, (response) => {

    if(response === 'GA_FAILED') {
      Logger.error('GA HAS NOT STARTED')
    } else {
      Logger.debug('🟢 GA INITIALIZED')
    }


    Analytics.setup()
    Analytics.set('title', 'Lobby')
    Analytics.send('pageview')

    new LobbiesModifier()
    new FiltersModifier()
    new MyLobbyModifier()
    new ChallengeListModifier()
  })

} catch (e) {
  Analytics.sendError(`[Content Script Lobby] ${e}`)
}
