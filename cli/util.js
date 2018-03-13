// Modules
const path = require('path')

const replace = (str, search, remplacer) => str.replace(new RegExp(search, 'g'), remplacer)

const replaceAll = (str, dictionary) => {
  let newString = str
  Object.entries(dictionary).map(([key, value]) => {
    newString = replace(newString, `{${key}}`, value)
  })
  return newString
}

const getPackage = path_package => {
  console.log(path_package)
  return JSON.stringify(require(path_package))
}

module.exports = { getPackage, replace, replaceAll }
