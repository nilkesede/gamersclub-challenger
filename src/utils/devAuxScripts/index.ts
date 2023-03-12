import '../../plugins/window.setup'
import logger from 'js-logger'
import serializer from '../../scripts/lobby/serializer'
import { gcSelectors } from '../gcSelectors'
import { gcLevelsMap } from '../gc/levels'
import { userAPI } from '../gcAPI'
import { gcAssetsUrls, gcUrls } from '../gcUrls'
import checkGCSelectors from './checkGCSelectors'

window.gcChallenger = {
  gc: {
    selectors: gcSelectors,
    levels: gcLevelsMap,
    api: {
      user: userAPI,
      resources: {
        urls: gcUrls,
        assets: gcAssetsUrls
      },
    },
  },
  api: {
    serializer,
    logger,
    health: {
      checkGCSelectors
    },
  }
}

