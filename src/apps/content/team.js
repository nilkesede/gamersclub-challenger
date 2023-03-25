import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '@/shared/contentRunner'

import TeamsModifier from '@/scripts/team/TeamModifier'
import GlobalModiFier from '@/scripts/global/GlobalModifier'

// ===
// Run
// ===
GCChallengerContentRunner.run('Team').then(() => {
  new TeamsModifier()
  new GlobalModiFier()
})
