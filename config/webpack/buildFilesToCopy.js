/* eslint-disable @typescript-eslint/no-var-requires */
const transformManifestToFirefox = require("./browser/firefox/transformManifest")
const transformManifestDevelopment = require("./transformManifest.development")

module.exports = function buildFilesToCopy(){
  let filesToCopy = [
    {
      from: 'src/shared/core/browser/languages',
      to: '_locales'
    },
    {
      from: 'src/assets',
      to: 'assets'
    },
    {
      from: 'src/apps/backgroundScripts',
      to: 'backgroundScripts'
    }
  ]

  if(process.env.BROWSER === 'firefox'){
    filesToCopy = filesToCopy.concat([
      {
        from: 'manifest.json',
        transform: (content) => {
          const devManifestBuffer = transformManifestDevelopment(content)
          return transformManifestToFirefox(devManifestBuffer)
        }
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
        transform: transformManifestDevelopment
      },
      {
        from: 'src/browser/chromium/background.js',
        to: 'background.js'
      },
    ])
  }

  return filesToCopy
}