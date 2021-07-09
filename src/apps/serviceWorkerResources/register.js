import '../../plugins/logger.setup'
import Logger from 'js-logger'

Logger.debug('Loaded registering file');

if ('serviceWorker' in navigator) {
  Logger.debug('Registering service worker');
  navigator.serviceWorker.register('./src/apps/serviceWorker/index.js')
  .then(function(reg) {
    // registration worked
    Logger.debug('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    Logger.error('Registration failed with ' + error);
  });
}