import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '@/shared/contentRunner'

GCChallengerContentRunner.pageName = 'devPicksAndBans'
const run = () => {
}

GCChallengerContentRunner.preRun('GA_FAILED', run, run)