try {
  console.log('Initializing Service worker')
  self.chrome ? (self.browser = self.chrome) : void 0

  // eslint-disable-next-line no-undef
  importScripts('serviceWorkerResources/messages.js')

  // eslint-disable-next-line no-undef
  importScripts('serviceWorkerResources/onMessage.js')

} catch (e) {
  console.error('Service worker has failed', e)
}