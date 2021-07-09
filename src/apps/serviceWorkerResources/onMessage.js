try {
  console.log('onMessage Resource')

  const strategies = {}
  strategies[self.backgroundMessages.INIT_GOOGLE_ANALYTICS] = (message, sender, sendResponse) => {

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

  self.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const strategy = strategies[message.type]
    strategy && strategy(message, sender, sendResponse)
  })
} catch (e) {
  console.error('[onMessage Resource] ERROR', e)
}
