import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '@/apps/shared/tools/contentRunner'
import PreMatchModifier from '@/apps/contentScripts/lobby/extensions/preMatch/PreMatchModifier'

GCChallengerContentRunner.pageName = 'devPreMatch'
const run = () => {
  new PreMatchModifier()
}

GCChallengerContentRunner.preRun('GA_FAILED', run, run)