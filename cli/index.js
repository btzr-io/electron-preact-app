#!/usr/bin/env node
'use strict'
const { spawn } = require('child_process')
const fs = require('fs-extra')
const path = require('path')
const path_pwd = process.cwd()
const path_root = path.resolve(__dirname, '../')
const path_bundle = path.resolve(path_root, 'bundle')
const path_bundle_temp = path.resolve(path_root, 'bundle_temp')

const cmd = process.argv[2]
const arg = process.argv[3]
const commands = {}

const buildTemp = app_name => {
  fs.copySync(path_bundle, path_bundle_temp)
  updateAppName(app_name)
}

const updateAppName = app_name => {
  const replace = (str, search, remplacer) => str.replace(new RegExp(search, 'g'), remplacer)
  // Update package.json
  const path_package = path.resolve(path_bundle_temp, 'package.json')
  const pack = require(path_package)
  const updatePackage = replace(JSON.stringify(pack), '{name}', app_name)
  fs.writeJsonSync(path_package, JSON.parse(updatePackage), { spaces: '\t', EOL: '\n' })
}

const buildApp = (app_name, path_dist) => {
  buildTemp(app_name)
  fs.copySync(path_bundle_temp, path_dist)
  fs.removeSync(path_bundle_temp)
}

// Dev command
commands['create'] = app_name => {
  if (app_name) {
    // Build app
    const path_dist = path.resolve(path_pwd, app_name)
    console.log('Building app...')
    buildApp(app_name, path_dist)
    // Install app
    spawn('yarn', ['install'], { stdio: 'inherit', cwd: path_dist })
  } else {
    console.log('Missign argument: application name')
  }
}

commands[cmd] ? commands[cmd](arg) : console.log('Invalid command:', cmd)
