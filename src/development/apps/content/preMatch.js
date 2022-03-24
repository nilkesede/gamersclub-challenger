import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '../../../utils/contentRunner'
import PreMatchModifier from '../../../scripts/preMatch/PreMatchModifier'

GCChallengerContentRunner.pageName = 'devPreMatch'
GCChallengerContentRunner.preRun('GA_FAILED').finally(() => {
  new PreMatchModifier()
})