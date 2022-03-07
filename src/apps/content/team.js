import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '../../utils/contentRunner'

import TeamsModifier from '../../scripts/team/TeamModifier'

// ===
// Run
// ===
GCChallengerContentRunner.run('Team').then(() => {
  new TeamsModifier()
})
