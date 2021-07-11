export interface AnalyticsEvent {
  tag: string,
  body?: any;
}

class AnalyticsManager {
  sendEvent(event: AnalyticsEvent, callback?: any): void {
    window.chrome.runtime.sendMessage({ type: 'SEND_ANALYTICS_EVENT', ...event }, callback);
  }
}

export default new AnalyticsManager()