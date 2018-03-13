#!/usr/bin/env node
'use strict'
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const pwd = process.cwd()
const path_root = path.resolve(__dirname, '../')
const path_bundle = path.resolve(path_root, 'bundle')
const path_bundle_temp = path.resolve(path_root, 'bundle_temp')

const cmd = process.argv[2]
const arg = process.argv[3]
const commands = {}

function duplicate(dir_name, path_bundle) {
  const path_dist = path.resolve(pwd, dir_name)
  // Make dist directory
  spawn('mkdir', [dir_name], { stdio: 'inherit' })
  // Set new path
  process.chdir(path_dist)
  // Copy bundle source
  spawn('cp', ['-r', '.', path_bundle], { stdio: 'inherit' })
}

const buildTemp = app_name => {
  process.chdir(path_root)
  duplicate('bundle_temp', path_bundle)
  process.chdir(path_bundle_temp)
  updateAppName(app_name)
}

const updateAppName = app_name => {
  // Update package.json
  const path_package = path.resolve(path_root, 'package.json')
  const pack = require(path_package)
  const updatePackage = JSON.stringify(pack).replace('{name}', app_name)
  fs.writeFileSync(path_package, updatePackage)
}

const buildApp = dir_name => {
  buildTemp(app_name)
  process.chdir(pwd)
  duplicate(dir_name, path_bundle_temp)
}

// Dev command
commands.create = app_name => {
  const path_dist = path.resolve(pwd, name)
  if (app_name) {
    // Build app
    console.log('Building app...')
    buildApp(app_name)
    // Install app
    process.chdir(path_dist)
    spawn('yarn', ['install'], { stdio: 'inherit' })
  } else {
    console.log('Missign argument: application name')
  }
  // Run command
  commands[cmd] && commands[cmd](arg)
}
