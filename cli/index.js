#!/usr/bin/env node
'use strict'
const { spawn } = require('child_process')
const fs = require('fs-extra')
const path = require('path')
const path_pwd = process.cwd()
const path_root = path.resolve(__dirname, '../')
const path_bundle = path.resolve(path_root, 'bundle')
const path_bundle_temp = path.resolve(path_root, 'bundle_temp')
const path_package = path.resolve(path_bundle_temp, 'package.json')

const { getPackage, replaceAll } = require('./util.js')

const buildTemp = (app_name, options) => {
  fs.copySync(path_bundle, path_bundle_temp)
  updateAppData(options)
}

const buildApp = (app_name, path_dist, options) => {
  console.log('\n Building app... \n')
  buildTemp(app_name, options)
  fs.copySync(path_bundle_temp, path_dist)
  fs.removeSync(path_bundle_temp)
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

// Cli
const input = process.argv.slice(2)
const args = input.slice(1)
const cmd = input[0]
const commands = {}

// create command
commands['create'] = args => {
  const app_name = null
  prompt().then(options => {
    const { app_name } = options
    if (app_name) {
      // Build app
      const path_dist = path.resolve(path_pwd, app_name)
      buildApp(app_name, path_dist, options)
      // Install app
      spawn('yarn', ['install'], { stdio: 'inherit', cwd: path_dist })
    }
  })
}

// Run command
commands[cmd] && commands[cmd](args)
