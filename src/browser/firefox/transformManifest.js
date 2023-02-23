

const extensionId = 'contatogcchallenger@gmail.com'

module.exports = function transformManifestToFirefox(content){
  const manifest = JSON.parse(content.toString())

  /**
   * Deleting Chrome Properties
   */
  //delete manifest.host_permissions
  delete manifest.background.service_worker

  /**
   * Override Firefox Properties
   */
  Object.assign(manifest, {
    browser_specific_settings: {
      gecko: {
        id: extensionId,
        strict_min_version: "109.0"
      }
    },
    background: {
      scripts: ["background.js", "serviceWorkerResources/messages.js", "serviceWorkerResources/onMessage.js"]
    },
  })

  /**
   * Mixing Firefox Properties
   */
  manifest.web_accessible_resources.map((resource) => {
    resource.extension_ids = [extensionId]
    delete resource.extensions
    return resource
  })

  manifest.permissions.push('activeTab')

  // Copy Plugin needs a Buffer
  return Buffer.from(JSON.stringify(manifest))
}