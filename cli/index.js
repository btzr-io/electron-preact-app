#!/usr/bin/env node
'use strict'
const { spawn } = require('child_process')
const path = require('path')
const root = path.resolve(__dirname, '../')
const cmd = process.argv[2]
const commands = {}

// Dev command
commands['dev'] = () => {
  process.chdir(root)
  spawn('yarn', ['dev'], { stdio: 'inherit' })
}

// Run command
commands[cmd] && commands[cmd]()
