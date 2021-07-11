try {
  console.log('onMessage Resource')

  const strategies = {}
  strategies[self.backgroundMessages.INIT_GOOGLE_ANALYTICS] = initAnalytics
  strategies[self.backgroundMessages.SEND_ANALYTICS_EVENT] = sendAnalyticsEvent

  console.log('self.chrome.runtime.getBackgroundPage', JSON.stringify(self.chrome.runtime))
  self.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const strategy = strategies[message.type]
    strategy && strategy(message, sender, sendResponse)
  })

  function initAnalytics(message, sender, sendResponse) {
    self.chrome.scripting.executeScript({
      files: ['serviceWorkerResources/ga.js'],
      target: { tabId: sender.tab.id, allFrames: true }
    })
      .then(() => {
        console.log('GA_INITIALIZED')
        sendResponse('GA_INITIALIZED')
      })
      .catch((e) => {
        console.log('GA_FAILED', e)
        sendResponse('GA_FAILED')
      })
  }

  function sendAnalyticsEvent(message, sender, sendResponse){
    self.chrome.runtime.getBackgroundPage((backgroundWindow) => {
      console.log('sendAnalyticsEvent', backgroundWindow.gtag)
    })
  }
} catch (e) {
  console.error('[onMessage Resource] ERROR', e)
}
