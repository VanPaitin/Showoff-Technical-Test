const { environment } = require('@rails/webpacker')
const dotenv = require('dotenv')
const webpack = require('webpack')
const typescript =  require('./loaders/typescript')

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env'
]
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true })
})

environment.plugins.prepend('Environment', new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))))
environment.loaders.prepend('typescript', typescript)

module.exports = environment
