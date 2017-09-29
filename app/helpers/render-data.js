const env = require("../../env.json");
const util = require("./util");

module.exports = async function (ctx, data = {}) {
	data.title = data.title || env.TITLE;
	data._ = {
		languages: util.languages
	};
	if (data.subtitle)
		data.title = `${data.title} | ${data.subtitle}`;
	if (ON_PROD) {
		data.$asset_prefix = ".min";
	}
	data.$_GET = ctx.query;
	data.$_POST = ctx.request;
	data.full_url = data.full_url || `http://${ctx.request.header.host}${ctx.request.url}`;
	data.ENV = env;

	data.__exposed = JSON.stringify({

	});

	return data;
};

