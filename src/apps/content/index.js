import '../../plugins/observer.jquery'
import '../../plugins/logger.setup'
import Logger from 'js-logger'
import '@/styles/main.scss'

import LobbiesModifier from '../../scripts/lobby/LobbiesModifier'
import FiltersModifier from '../../scripts/lobby/filtersModifier'
import MyLobbyModifier from '../../scripts/lobby/MyLobbyModifier'
import ChallengeListModifier from '../../scripts/lobby/ChallengeListModifier'

// ===
// Run
// ===
Logger.log('== GamersClub Challenger is activated ==')

window.chrome.runtime.sendMessage({type: 'INIT_GOOGLE_ANALYTICS'}, (response) => {
  Logger.debug('GA RESPONSE', response)
  window.chrome.runtime.getBackgroundPage((backgroundPage) => {
    Logger.debug('gtag', backgroundPage.gtag)
  })

  new LobbiesModifier()
  new FiltersModifier()
  new MyLobbyModifier()
  new ChallengeListModifier()
})

