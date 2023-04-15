import 'tilt.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import GCChallengerContentRunner from '@/apps/shared/tools/contentRunner'
import PostMatchModifier from '@/apps/contentScripts/match/extensions/postMatch/PostMatchModifier'

// ===
// Run
// ===
GCChallengerContentRunner.run('Match').then(() => {
  new PostMatchModifier()
})
