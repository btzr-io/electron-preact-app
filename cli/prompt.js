const inquirer = require('inquirer')

const prompt = () => {
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

module.exports = prompt
