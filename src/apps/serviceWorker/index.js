import '../../plugins/logger.setup'
import Logger from 'js-logger'

Logger.log('Teste service worker')

window.chrome.runtime.onInstalled.addListener(event => {
  try {
    Logger.debug('Installed!')
    window.chrome.scripting.executeScript({
      file: './ga.js'
    })
  } catch (e) {
    console.error('onInstalled has failed')
  }

})

window.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  Logger.log('aoooo')
})


window.chrome.action.onClicked.addListener((tab) => {
  window.chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      document.body.style.backgroundColor = 'red';
    }
  });
});