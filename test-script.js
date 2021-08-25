const shell = require('shelljs');

console.log('Olá mundo!');

const result = shell.exec('git diff --name-only test-script..main', {
  silent: true,
});

console.log(result.stdout.split('\n'));
