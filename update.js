var exec = require('child_process').exec;
var pkg = require('./package.json');
var deps = [];
for (var key in pkg.dependencies) {
	deps.push(key);
}
var command = "npm i --save " + deps.join(' ');
console.log('command : ' + command);
exec(command);