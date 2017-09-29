const env = require("./env");
const ON_PRODUCTION = (process.env.NODE_ENV || env.NODE_ENV) === "production";

const plugins = {};

if (ON_PRODUCTION) {
	plugins.autoprefixer = {
		browsers: [
			">0%"
		]
	};
	plugins["postcss-pxtorem"] = {
		propList: ["font", "font-size"],
	};
}

module.exports = {
	plugins
};

