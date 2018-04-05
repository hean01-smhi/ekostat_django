const fs = require('fs');
const glob = require('glob');
const path = require('path'); 

const msgPath = path.resolve(__dirname, '../ekostat/ui/build/messages');
const srcPath = path.resolve(__dirname, '../ekostat/ui/src/lang');
const buildPath = path.resolve(__dirname, '../ekostat/ui/build/lang');

const defaultMessages = {};

glob.sync(`${msgPath}/**/*.json`).forEach((file) => {
	JSON.parse(fs.readFileSync(file, 'utf8')).forEach((message) => {
		 defaultMessages[message.id] = message.defaultMessage;
	});
});


if (!fs.existsSync(buildPath)) {
	fs.mkdirSync(buildPath);
}

glob.sync(`${srcPath}/**/*.json`).forEach((file) => {
	const messages = Object.assign(defaultMessages, JSON.parse(fs.readFileSync(file, 'utf8')));
	fs.writeFileSync(path.resolve(buildPath, path.basename(file)), JSON.stringify(messages, null, 2), 'utf8');
});
