import '../plugins/window.setup'
import logger from 'js-logger'

import serializer from '@/apps/contentScripts/lobby/serializer'

import { gcSelectors } from '@/shared/extras/gc/selectors'
import { gcLevelsMap } from '@/shared/extras/gc/levels'
import { userAPI } from '@/shared/extras/gc/api'
import { gcAssetsUrls, gcUrls } from '@/shared/extras/gc/api/resources/urls'

import checkGCSelectors from '@/shared/tools/health/checkGCSelectors'

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

