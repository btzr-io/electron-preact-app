// Modules
const path = require('path')

// Remplace a word from a string
const replace = (str, search, remplacer) => str.replace(new RegExp(search, 'g'), remplacer)

// Remplace a list of words from a string
const replaceAll = (str, dictionary) => {
  let newString = str
  Object.entries(dictionary).map(([key, value]) => {
    newString = replace(newString, `{${key}}`, value)
  })
  return newString
}

// Remove props from a object
const removeProps = (obj, props) => {
  Object.entries(props).map(([key, value]) => {
    value && delete obj[key]
  })
  return obj
}

// Parse Cli args
const parseArgs = (args, list) => {
  const parsedArgs = {}
  Object.entries(list).map(([key, value], index) => {
    parsedArgs[key] = args[index] ? replace(args[index], value, '') : null
  })
  return parsedArgs
}

module.exports = { replace, replaceAll, removeProps, parseArgs }
