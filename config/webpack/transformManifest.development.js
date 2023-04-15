
module.exports = function transformManifestToDevelopment(content){
  const manifest = JSON.parse(content.toString())


  if(process.env.NODE_ENV === 'development'){
    manifest.content_scripts.forEach((contentScript) => {
      contentScript.css = []
    })

    manifest.content_scripts.push({
      "matches": [
        "*://localhost/devPreMatch*",
      ],
      "js": [
        "js/chunk-vendors.js",
        "js/chunk-common.js",
        "js/devPreMatch.js"
      ],
      "run_at": "document_end"
    })

    manifest.content_scripts.push({
      "matches": [
        "*://localhost/devLiveMatch*",
      ],
      "js": [
        "js/chunk-vendors.js",
        "js/chunk-common.js",
        "js/devLiveMatch.js"
      ],
      "run_at": "document_end"
    })

    manifest.web_accessible_resources.forEach((webResource) => {
      webResource.matches.push("*://localhost/*")
    })
    manifest.host_permissions.push("<all_urls>")
  }

  // Copy Plugin needs a Buffer
  return Buffer.from(JSON.stringify(manifest))
}