import '../../plugins/observer.jquery'
import '@/utils/visibility.scss'

import TeamsModifier from '../../scripts/lobby/teamsModifier'
import FiltersModifier from '../../scripts/lobby/filtersModifier'

// ===
// Run
// ===
console.log('== GamersClub Challenger is activated ==')
new TeamsModifier()
new FiltersModifier()