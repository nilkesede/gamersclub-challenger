

const extensionId = 'contatogcchallenger@gmail.com'

module.exports = function transformManifestToFirefox(content){
  const manifest = JSON.parse(content.toString())

  /**
   * Deleting Chrome Properties
   */
  //delete manifest.host_permissions
  delete manifest.background.service_worker

  /**
   * Adding Firefox Properties
   */
  Object.assign(manifest, {
    browser_specific_settings: {
      gecko: {
        id: extensionId
      }
    },
    background: {
      scripts: ["background.js", "serviceWorkerResources/messages.js", "serviceWorkerResources/onMessage.js"]
    },
  })

  /**
   * Renaming Firefox Properties
   */
  manifest.web_accessible_resources.map((resource) => {
    resource.extension_ids = [extensionId]
    delete resource.extensions
    return resource
  })

  // Copy Plugin needs a Buffer
  return Buffer.from(JSON.stringify(manifest))
}