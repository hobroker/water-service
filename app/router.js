const glob = require("glob");
const compose = require("koa-compose");

module.exports.init = (app, debug = false) => {
	glob(__dirname + "/modules/**/routes.js", (err, res) => {
		if (err) {
			console.log("Routes initialization error!");
			return;
		}

		const stack = [];

		const routes = res.reduce((array, item) => {
			const router = require(item);
			array.push(router.routes(), router.allowedMethods());

			if (debug) {
				stack.push(router.stack.map((layer) => layer.path + ` (${layer.methods.join`,`})`));
			}

			return array;
		}, []);

		if (debug) {
			console.log("Routes:", JSON.stringify(stack, null, 2));
		}

		app.use(compose(routes));
	});
};



