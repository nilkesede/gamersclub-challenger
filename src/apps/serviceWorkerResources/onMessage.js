try {
  console.log('onMessage Resource')

  // ===
  // Definitions
  // ===
  const strategies = {}
  strategies[self.backgroundMessages.INIT_GOOGLE_ANALYTICS] = initAnalytics
  strategies[self.backgroundMessages.RELOAD_GC_TABS] = reloadGCTabs

  // ===
  // Handlers
  // ===
  self.browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const strategy = strategies[message.type]
    strategy && strategy(message, sender, sendResponse)
    return true
  })

  // ===
  // Strategies
  // ===
  function initAnalytics(message, sender, sendResponse) {
    self.browser.scripting.executeScript({
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

  function reloadGCTabs(message, sender, sendResponse){
    self.browser.tabs.query({ url: [
      "*://gamersclub.com.br/*",
      "*://csgo.gamersclub.gg/*"
    ]}, (tabs) => {
      tabs.forEach(tab => {
        self.browser.tabs.reload(tab.id)
      });
    })
  }

} catch (e) {
  console.error('[onMessage Resource] ERROR', e)
}
