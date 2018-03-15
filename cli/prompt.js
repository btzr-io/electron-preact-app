const inquirer = require('inquirer')

const prompt = () => {
  const questions = [
    {
      type: 'input',
      name: 'app_name',
      message: 'app_name:',
    },
    {
      type: 'input',
      name: 'app_author',
      message: 'app_author:',
      default: () => 'name',
    },
    /* Disable repository for now...
    {
      type: 'input',
      name: 'app_repo',
      message: 'app_repo:',
      default: () => 'repository',
    },
    */
  ]
  return inquirer.prompt(questions)
}

module.exports = prompt
