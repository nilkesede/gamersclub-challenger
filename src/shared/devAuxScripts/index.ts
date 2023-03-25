import '../../plugins/window.setup'
import logger from 'js-logger'
import serializer from '@/apps/contentScripts/lobby/serializer'
import { gcSelectors } from '../gc/selectors'
import { gcLevelsMap } from '../gc/levels'
import { userAPI } from '../gc/api'
import { gcAssetsUrls, gcUrls } from '../gc/api/resources/urls'
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

