import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '@/apps/shared/tools/contentRunner'

import TeamsModifier from '@/apps/contentScripts/team/TeamModifier'
import GlobalModiFier from '@/apps/contentScripts/global/global.modifier'

// ===
// Run
// ===
GCChallengerContentRunner.run('Team').then(() => {
  new TeamsModifier()
  new GlobalModiFier()
})
