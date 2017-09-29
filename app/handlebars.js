const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const helpers = require("handlebars-helpers")();

handlebars.registerHelper(require("handlebars-layouts")(handlebars));
handlebars.registerHelper("repeat", require("handlebars-helper-repeat"));
handlebars.registerHelper("debug", debugHelper);
handlebars.registerHelper("concat", concatHelper);

// handlebars-helpers
[].forEach((key) => handlebars.registerHelper(key, helpers[key]));

let partials = {};
let partialDirectories = ["layouts", "pages", "partials"];
partialDirectories.forEach((directory) => walkSync(`${__dirname}/views/${directory}/`).forEach((file) =>
	partials[file] = readFile(file).replace(/\r?\n|\r|\t/g, " ").replace(/ +/g, " ").trim()
));

handlebars.registerPartial(partials);

function debugHelper() {
	console.log(arguments);
}

function concatHelper() {
	let outStr = "";
	for (let arg in arguments) {
		if (arguments.hasOwnProperty(arg) && typeof arguments[arg] !== "object") {
			outStr += arguments[arg];
		}
	}
	return outStr;
}

function readFile(file) {
	file = path.join(__dirname + "/views/", file + ".hbs");
	return fs.readFileSync(file, "utf8");
}

function walkSync(dir, filelist = []) {
	let files = fs.readdirSync(dir);
	files.forEach(function (file) {
		if (fs.statSync(dir + file).isDirectory())
			filelist = walkSync(dir + file + "/", filelist);
		else
			filelist.push(dir.split("views/")[1] + file.split(".hbs")[0]);
	});
	return filelist;
}

module.exports = handlebars;
