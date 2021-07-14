try {
  console.log('Initializing Service worker')

  // eslint-disable-next-line no-undef
  importScripts('serviceWorkerResources/messages.js')

  // eslint-disable-next-line no-undef
  importScripts('serviceWorkerResources/onMessage.js')

} catch (e) {
  console.error('Service worker has failed', e)
}