#!/usr/bin/env node
'use strict'

// Modules
const { parseArgs, parseFlags } = require('./util.js')
const buildApp = require('./build.js')

// Options
const input = process.argv.slice(2)
const opts = input.slice(1)
const cmd = input[0]
const flags = []

// Get args / flags
const args = opts.filter(item => {
  if (item && item.substring(0, 2) == '--') flags[flags.length] = item
  else return true
})

const listArgs = {
  app_name: 'name:',
  app_author: 'author:',
  app_repo: 'repository:',
}

const listFlags = {
  flag_all: '--all',
  flag_git: '--git',
  flag_github: '--github',
}

const commands = {
  create(args, flags) {
    if (args) {
      const parsedFlags = parseFlags(flags, listFlags)
      const parsedArgs = parseArgs(args, listArgs)
      const { app_name } = parsedArgs
      app_name && buildApp(app_name, parsedArgs, parsedFlags)
    }
  },
}

// Run command
commands[cmd] && commands[cmd](args, flags)
