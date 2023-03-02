import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '../../utils/contentRunner'

import LobbiesModifier from '../../scripts/lobby/LobbiesModifier'
import FiltersModifier from '../../scripts/lobby/filtersModifier'
import MyLobbyModifier from '../../scripts/lobby/MyLobbyModifier'
import ChallengeListModifier from '../../scripts/lobby/ChallengeListModifier'
import PreMatchModifier from '../../scripts/lobby/PreMatchModifier'
import lobbyFilter from '../../scripts/lobby/lobbyFilter'

// ===
// Run
// ===
GCChallengerContentRunner.run('Lobby').then(() => {
  lobbyFilter.setup()

  new LobbiesModifier()
  new FiltersModifier()
  new MyLobbyModifier()
  new ChallengeListModifier()
  new PreMatchModifier()
})
