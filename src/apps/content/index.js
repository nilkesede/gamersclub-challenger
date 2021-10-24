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
import serializer from '../../scripts/lobby/serializer'

// ===
// Run
// ===
try {
  Logger.log('== 🚀 GamersClub Challenger is activated ==')

  const run = async (response) => {

    if(response === 'GA_FAILED') {
      Logger.error('GA HAS NOT STARTED')
    } else {
      Logger.debug('🟢 GA INITIALIZED')
    }

    const loggedPlayer = serializer.serializeLoggedPlayer()
    Analytics.setup(loggedPlayer)
    Analytics.set('title', 'Lobby')
    Analytics.send('pageview')

    await BrowserStorage.setup()
    lobbyFilter.setup()

    new LobbiesModifier()
    new FiltersModifier()
    new MyLobbyModifier()
    new ChallengeListModifier()
  }

  window.browser.runtime.sendMessage({ type: 'INIT_GOOGLE_ANALYTICS' }, run)

} catch (e) {
  Analytics.sendError(`[Content Script Lobby] ${e}`)
}
