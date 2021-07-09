try {
  console.log('Initializing Service worker')

  // eslint-disable-next-line no-undef
  importScripts('serviceWorkerResources/messages.js')

  // eslint-disable-next-line no-undef
  importScripts('serviceWorkerResources/onMessage.js')



  // chrome.runtime.onInstalled.addListener(event => {
  //     console.debug('Installed!')
  // })




// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: () => {
//       document.body.style.backgroundColor = 'red';
//     }
//   });
// });

} catch (e) {
  console.error('Service worker has failed', e)
}