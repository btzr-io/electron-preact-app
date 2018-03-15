#!/usr/bin/env node
'use strict'

// Modules
const { parseArgs } = require('./util.js')
const prompt = require('./prompt.js')
const buildApp = require('./build.js')

// Options
const input = process.argv.slice(2)
const args = input.slice(1)
const cmd = input[0]
const commands = {}
const listArgs = {
  app_name: 'name:',
  app_author: 'author:',
  app_repo: 'repository:',
}

// create command
commands['create'] = args => {
  if (args) {
    const parsedArgs = parseArgs(args, listArgs)
    const { app_name } = parsedArgs
    app_name && buildApp(app_name, parsedArgs)
  } else {
    prompt().then(options => {
      // Get options
      const { app_name } = options
      // Build app
      app_name && buildApp(app_name, options)
    })
  }
}

// Run command
commands[cmd] && commands[cmd](args)
