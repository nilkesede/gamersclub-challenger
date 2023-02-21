
module.exports = function transformManifestToDevelopment(content){
  const manifest = JSON.parse(content.toString())


  if(process.env.NODE_ENV === 'development'){
    manifest.content_scripts.forEach((contentScript) => {
      contentScript.css = []
    })
  }

  // Copy Plugin needs a Buffer
  return Buffer.from(JSON.stringify(manifest))
}