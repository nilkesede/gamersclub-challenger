import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '@/apps/shared/tools/contentRunner'
import PlayerProfileModifier from '@/apps/contentScripts/player/extensions/profile/PlayerProfileModifier'

// ===
// Run
// ===
GCChallengerContentRunner.run('Player').then(() => {
  new PlayerProfileModifier()
})
