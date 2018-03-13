#!/usr/bin/env node
'use strict'

// Path
const path = require('path')
const path_pwd = process.cwd()

// Cli-app
const prompt = require('./prompt.js')
const buildApp = require('./build.js')

// Options
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
    }
  })
}

// Run command
commands[cmd] && commands[cmd](args)
