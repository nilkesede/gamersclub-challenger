import '../../plugins/observer.jquery'
import '../../plugins/logger.setup'
import Logger from 'js-logger'

import '@/styles/main.scss'

import TeamsModifier from '../../scripts/lobby/teamsModifier'
import FiltersModifier from '../../scripts/lobby/filtersModifier'
import MyLobbyModifier from '../../scripts/lobby/MyLobbyModifier'


// ===
// Run
// ===
Logger.log('== GamersClub Challenger is activated ==')
new TeamsModifier()
new FiltersModifier()
new MyLobbyModifier()