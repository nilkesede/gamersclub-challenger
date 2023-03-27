import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '@/apps/shared/tools/contentRunner'

import GlobalModifier from '@/apps/contentScripts/global/global.modifier'


// ===
// Run
// ===
GCChallengerContentRunner.run('GLOBAL_SCRIPTS', true).then(() => {
  new GlobalModifier()
})
