module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    name: 'compare-api',
    msTileColor: '#062175',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/sw.js',
      swDest: './mysw.js',
      
    }
  }
}