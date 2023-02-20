// eslint-disable-next-line @typescript-eslint/no-var-requires
const transformManifestToFirefox = require("../src/browser/firefox/transformManifest")

module.exports = function buildFilesToCopy(){
  let filesToCopy = [
    {
      from: 'src/_locales',
      to: '_locales'
    },
    {
      from: 'src/assets',
      to: 'assets'
    },

    {
      from: 'src/apps/serviceWorkerResources',
      to: 'serviceWorkerResources'
    }
  ]

  if(process.env.browser === 'firefox'){
    filesToCopy = filesToCopy.concat([
      {
        from: 'manifest.json',
        transform: transformManifestToFirefox
      },
      {
        from: 'src/browser/firefox/background.js',
        to: 'background.js'
      },
    ])
  } else {
    filesToCopy = filesToCopy.concat([
      {
        from: 'manifest.json',
      },
      {
        from: 'src/browser/chromium/background.js',
        to: 'background.js'
      },
    ])
  }

  return filesToCopy
}