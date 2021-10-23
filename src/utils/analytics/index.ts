import Logger from "js-logger"
import { getIdByAvatarUrl } from "../StringUtils"
import $ from 'jquery'
import { gcSelectors } from "../gcSelectors"
import { AnalyticsEvent } from "./types"


class AnalyticsManager {
  trackerName = 'gccAnalytics'

  setup(){
    const manifest = window.browser.runtime.getManifest()
    const userAvatarUrl = $(gcSelectors.loggedUser.avatar).attr('src')
    const userId = userAvatarUrl ? getIdByAvatarUrl(userAvatarUrl) : undefined

    window.ga && window.ga('create', {
      trackingId: 'UA-198107210-2',
      cookieDomain: 'auto',
      name: this.trackerName,
      userId,
    })

    this.set('appName', 'GamersClub Challenger')
    manifest && this.set('appVersion', manifest.version)
  }

  set(attribute: string, value: string) {
    window.ga && window.ga(`${this.trackerName}.set`, attribute, value)
  }

  send(attribute: string, body?: any) {
    window.ga && window.ga(`${this.trackerName}.send`, attribute, body)
  }

  sendEvent(event: AnalyticsEvent, callback?: any): void {
    Logger.log(`🔥 ${event.label}`, `Value: ${event.value}`)
    this.send('event', {
      eventCategory: event.category,
      eventAction: event.action,
      eventLabel: event.label,
      eventValue: Number.isInteger && Number.isInteger(event.value) ? event.value : undefined
    })
  }

  sendError(errorDescription: string, isFatalError = false) {
    Logger.error(errorDescription)
    this.send('exception', {
      'exDescription': errorDescription,
      'exFatal': isFatalError
    })
  }
}

export default new AnalyticsManager()