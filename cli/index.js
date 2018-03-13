#!/usr/bin/env node
'use strict'
const { spawn } = require('child_process')
const fs = require('fs-extra')
const path = require('path')
const path_pwd = process.cwd()
const path_root = path.resolve(__dirname, '../')
const path_bundle = path.resolve(path_root, 'bundle')
const path_bundle_temp = path.resolve(path_root, 'bundle_temp')

const input = process.argv.slice(2)
const args = input.slice(1)
const cmd = input[0]

const commands = {}

const replace = (str, search, remplacer) => str.replace(new RegExp(search, 'g'), remplacer)

const buildTemp = (app_name, options) => {
  fs.copySync(path_bundle, path_bundle_temp)
  updateAppData(options)
}

const updateAppData = options => {
  // Get options
  const { app_name, dev_name, dev_email, repo_user } = options
  // Update package.json
  const path_package = path.resolve(path_bundle_temp, 'package.json')
  const pack = require(path_package)
  // Update app_name
  let updatePackage = replace(JSON.stringify(pack), '{app_name}', app_name)
  // Update dev_name
  updatePackage = replace(updatePackage, '{dev_name}', dev_name)
  // Update dev_email
  updatePackage = replace(updatePackage, '{dev_email}', dev_email)
  // Update repo_user
  updatePackage = replace(updatePackage, '{repo_user}', repo_user)
  // Update package.jspon
  fs.writeJsonSync(path_package, JSON.parse(updatePackage), { spaces: '\t', EOL: '\n' })
}

const buildApp = (app_name, path_dist, options) => {
  buildTemp(app_name, options)
  fs.copySync(path_bundle_temp, path_dist)
  fs.removeSync(path_bundle_temp)
}

const prompt = () => {
  const inquirer = require('inquirer')

  const questions = [
    {
      type: 'input',
      name: 'app_name',
      message: 'App-name:',
    },
    {
      type: 'input',
      name: 'dev_name',
      message: 'Author:',
      default: () => 'John Doe',
    },

    {
      type: 'input',
      name: 'dev_email',
      message: 'Author-email:',
      default: () => 'user@email.com',
    },

    {
      type: 'input',
      name: 'repo_user',
      message: 'Github-username:',
      default: () => 'username',
    },
  ]

  return inquirer.prompt(questions)
}

// Dev command
commands['create'] = args => {
  const app_name = null
  prompt().then(options => {
    const { app_name } = options
    if (app_name) {
      // Build app
      const path_dist = path.resolve(path_pwd, app_name)
      console.log('Building app...')
      buildApp(app_name, path_dist, options)
      // Install app
      spawn('yarn', ['install'], { stdio: 'inherit', cwd: path_dist })
    }
  })
}

commands[cmd] ? commands[cmd](args) : console.log('Invalid command:', cmd)
