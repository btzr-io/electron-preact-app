// Modules
const fs = require('fs-extra')
const { spawn } = require('child_process')
const { getPackage, replaceAll } = require('./util.js')

// Paths
const path = require('path')
const path_root = path.resolve(__dirname, '../')
const path_bundle = path.resolve(path_root, 'bundle')
const path_bundle_temp = path.resolve(path_root, 'bundle_temp')
const path_package = path.resolve(path_bundle_temp, 'package.json')

const buildTemp = (app_name, options) => {
  fs.copySync(path_bundle, path_bundle_temp)
  updateAppData(options)
}

const buildApp = (app_name, path_dist, options) => {
  console.log('\n Building app... \n')
  // Build temp bundle
  buildTemp(app_name, options)
  // Copy bundle source
  fs.copySync(path_bundle_temp, path_dist)
  // Remove temp bundle
  fs.removeSync(path_bundle_temp)
  // Install app
  spawn('yarn', ['install'], { stdio: 'inherit', cwd: path_dist })
}

const updateAppData = options => {
  // Get options
  const { app_name, dev_name, dev_email, repo_user } = options
  const dictionary = { ...options }
  // Update package.json
  const tempPackage = getPackage(path_package)
  // Update options
  let updatePackage = replaceAll(tempPackage, dictionary)
  // Update package.jspon
  fs.writeJsonSync(path_package, JSON.parse(updatePackage), { spaces: '\t', EOL: '\n' })
}

module.exports = buildApp
