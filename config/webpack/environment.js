const { environment } = require('@rails/webpacker')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

console.log(environment.loaders);
environment.loaders.delete('nodeModules');
environment.splitChunks();
console.log(environment.loaders.length);
// environment.plugins.append('BundleAnalyzer', new BundleAnalyzerPlugin);

module.exports = environment
