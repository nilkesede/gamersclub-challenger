import '../../plugins/window.setup'
import '../../plugins/logger.setup'
import '../../plugins/observer.jquery'
import '@/styles/main.scss'

import Logger from 'js-logger'
import Analytics from '../../utils/analytics'
import BrowserStorage from '../../utils/storage'

import LobbiesModifier from '../../scripts/lobby/LobbiesModifier'
import FiltersModifier from '../../scripts/lobby/filtersModifier'
import MyLobbyModifier from '../../scripts/lobby/MyLobbyModifier'
import ChallengeListModifier from '../../scripts/lobby/ChallengeListModifier'
import lobbyFilter from '../../scripts/lobby/lobbyFilter'

// ===
// Run
// ===
try {
  Logger.log('== 🚀 GamersClub Challenger is activated ==')

  window.browser.runtime.sendMessage({ type: 'INIT_GOOGLE_ANALYTICS' }, async (response) => {

    if(response === 'GA_FAILED') {
      Logger.error('GA HAS NOT STARTED')
    } else {
      Logger.debug('🟢 GA INITIALIZED')
    }

    Analytics.setup()
    Analytics.set('title', 'Lobby')
    Analytics.send('pageview')

    // window.browser.storage.sync.clear()
    await BrowserStorage.setup()
    lobbyFilter.setup()

    new LobbiesModifier()
    new FiltersModifier()
    new MyLobbyModifier()
    new ChallengeListModifier()
  })

} catch (e) {
  Analytics.sendError(`[Content Script Lobby] ${e}`)
}
