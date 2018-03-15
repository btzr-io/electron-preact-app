// Modules
const fs = require('fs-extra')
const { readFileSync, writeFileSync } = require('fs')
const { spawn } = require('child_process')
const { replace, replaceAll, removeProps } = require('./util.js')

// Paths
const path = require('path')
const path_pwd = process.cwd()
const path_root = path.resolve(__dirname, '../')
const path_bundle = path.resolve(path_root, 'bundle/source')
const path_bundle_temp = path.resolve(path_root, 'bundle_temp')
const path_package = path.resolve(path_bundle_temp, 'package.json')
const path_readme = path.resolve(path_bundle_temp, 'README.md')

const buildTemp = (app_name, options) => {
  fs.copySync(path_bundle, path_bundle_temp)
  updateAppData(options)
}

const buildApp = (app_name, options) => {
  // Get path of build
  const path_dist = path.resolve(path_pwd, app_name)
  // Log build process
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
  // Get props
  const props = {
    bugs: !options.app_repo,
    author: !options.app_author,
    homepage: !options.app_repo,
    repository: !options.app_repo,
  }
  // Get package.json
  let tempPackage = require(path_package)
  // Remove props
  tempPackage = removeProps(tempPackage, props)
  // Update options
  tempPackage = replaceAll(JSON.stringify(tempPackage), options)
  // Update package.json
  fs.writeJsonSync(path_package, JSON.parse(tempPackage), { spaces: '\t', EOL: '\n' })
  // Get get readme.md
  let tempReadme = readFileSync(path_readme, 'utf-8')
  // Update options
  tempReadme = replaceAll(tempReadme, options)
  // Update readme.md
  writeFileSync(path_readme, tempReadme)
}

module.exports = buildApp
