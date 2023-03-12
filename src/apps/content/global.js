import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '../../utils/contentRunner'

import GlobalModifier from '../../scripts/global/GlobalModifier'


// ===
// Run
// ===
GCChallengerContentRunner.run('GLOBAL_SCRIPTS', true).then(() => {
  new GlobalModifier()
})
