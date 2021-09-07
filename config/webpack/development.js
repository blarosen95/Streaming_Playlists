process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

// const os = require('os');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// environment.plugins.append(
//     'BundleAnalyzer',
//     new BundleAnalyzerPlugin()
// )

module.exports = environment.toWebpackConfig()