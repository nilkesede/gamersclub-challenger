import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '@/apps/shared/tools/contentRunner'
import PreMatchModifier from '@/apps/contentScripts/lobby/extensions/preMatch/PreMatchModifier'

// ===
// Run
// ===
GCChallengerContentRunner.run('Live Match').then(() => {
  new PreMatchModifier()
})
