import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '@/apps/shared/tools/contentRunner'

import LobbiesModifier from '@/apps/contentScripts/lobby/extensions/lobbies/LobbiesModifier'
import FiltersModifier from '@/apps/contentScripts/lobby/extensions/filters/filtersModifier'
import MyLobbyModifier from '@/apps/contentScripts/lobby/extensions/myLobby/MyLobbyModifier'
import ChallengeListModifier from '@/apps/contentScripts/lobby/extensions/challengeList/ChallengeListModifier'
import PreMatchModifier from '@/apps/contentScripts/lobby/extensions/preMatch/PreMatchModifier'
import lobbyFilter from '@/apps/contentScripts/lobby/extensions/filters/lobbyFilter'

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
