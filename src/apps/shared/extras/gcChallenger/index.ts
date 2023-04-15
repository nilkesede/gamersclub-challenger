import '@/apps/shared/core/settings/main.setup'
import logger from 'js-logger'

import serializer from '@/apps/contentScripts/lobby/serializer'

import { gcSelectors } from '@/apps/shared/extras/gc/tools/selectors'
import { gcLevelsMap } from '@/apps/shared/extras/gc/tools/levels'
import { userAPI } from '@/apps/shared/extras/gc/api'
import { gcAssetsUrls, gcUrls } from '@/apps/shared/extras/gc/api/resources/urls'

import checkGCSelectors from '@/apps/shared/tools/health/checkGCSelectors'

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

