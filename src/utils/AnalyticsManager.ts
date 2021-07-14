import Logger from "js-logger"
import { getIdByAvatarUrl } from "./StringUtils"
import $ from 'jquery'
import { gcSelectors } from "./gcSelectors"

export interface AnalyticsEvent {
  category: string
  label: string
  action: string
  value?: string | number
}

declare global {
  interface Window {
    ga: any
    chrome: any,
    userId: number | string
  }
}

class AnalyticsManager {
  trackerName = 'gccAnalytics'

  setup(){
    const manifest = window.chrome.runtime.getManifest()
    const userAvatarUrl = $(gcSelectors.loggedUser.avatar).attr('src')

    window.ga && window.ga('create', {
      trackingId: 'UA-198107210-2',
      cookieDomain: 'auto',
      name: this.trackerName,
      userId: userAvatarUrl ? getIdByAvatarUrl(userAvatarUrl) : undefined
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
    Logger.log(`🔥 ${event.label}`, event.value)
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