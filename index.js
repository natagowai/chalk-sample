var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var GitHubApi   = require('github');
var _           = require('lodash');
var git         = require('simple-git')();
var touch       = require('touch');
var fs = require('fs');

var files = require('./lib/files');

clear();
console.log(
	chalk.yellow(
		figlet.textSync('Ginit', { horizontalLayout: 'full' })
	)
);

if (files.directoryExists('.git')) {
	console.log(chalk.red('Already a git repository'));
	process.exit();
}


// The next thing we need to do is create a function which will prompt the user for their Github credentials.
// We can use Inquirer for this. The module includes a number of methods for various types of prompts, 
// which are roughly analogous to HTML form controls. In order to collect the user’s Github username and password, 
// we’re going to use the input and password types respectively.
getGithubCredentials(function(){
	console.log(arguments);
  });

function getGithubCredentials(callback) {
	var questions = [
	  {
		name: 'username',
		type: 'input',
		message: 'Enter your Github username or e-mail address:',
		validate: function( value ) {
		  if (value.length) {
			return true;
		  } else {
			return 'Please enter your username or e-mail address';
		  }
		}
	  },
	  {
		name: 'password',
		type: 'password',
		message: 'Enter your password:',
		validate: function(value) {
		  if (value.length) {
			return true;
		  } else {
			return 'Please enter your password';
		  }
		}
	  }
	];
  
	inquirer.prompt(questions).then(callback);
  }