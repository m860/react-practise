var fsExtra = require("fs-extra");
var fs = require("fs");
var path = require("path");
var argv = require('yargs')
	.usage('usage: $0 <TARGET_FOLDER> [options]')
	.alias('u', 'url')
	.alias('n', 'name')
	.demandOption(['u', 'n'])
	.help("h")
	.alias('h', 'help')
	.argv;


var targetFolder;
if (argv._.length >= 1) {
	targetFolder = argv._[0];
}

console.log('target path = ' + targetFolder);

if (!fsExtra.pathExistsSync(targetFolder)) {
	fsExtra.mkdirsSync(targetFolder);
}

//copy
console.log('copying .babelrc')
fsExtra.copySync(path.join(__dirname, '.babelrc'), path.join(targetFolder, '.babelrc'), {overwrite: true});
console.log('copying .eslintrc')
fsExtra.copySync(path.join(__dirname, '.eslintrc'), path.join(targetFolder, '.eslintrc'), {overwrite: true});
console.log('copying package.json')
fsExtra.copySync(path.join(__dirname, 'package.json'), path.join(targetFolder, 'package.json'), {overwrite: true});
console.log('copying webpack.config.js')
fsExtra.copySync(path.join(__dirname, 'webpack.config.js'), path.join(targetFolder, 'webpack.config.js'), {overwrite: true});
console.log('copying src/')
fsExtra.copySync('./src', path.join(targetFolder, 'src'), {overwrite: true});

//replace url & name
console.log('replacing name & url')
var fileStr = fs.readFileSync(path.join(targetFolder, 'package.json'), 'utf8');
fileStr = fileStr.replace(/\$\{name\}/g, argv.name);
fileStr = fileStr.replace(/\$\{url\}/g, argv.url);
fs.writeFileSync(path.join(targetFolder, 'package.json'), fileStr);
console.log('init success');


