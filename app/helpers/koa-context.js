const renderData = require("./render-data");

module.exports = (app) => {
	app.context.rend = async function (view, data = {}) {
		await this.render(view, await renderData(this, data));
	};

	app.context.validate = ctxValidate;

	app.context.$body = $body;
	app.context.$get = $get;

	app.context.isAjax = isAjax;
};


const Validator = require("koa-validate").Validator;

Validator.prototype.rowExists = function (model, attr, message = "") {
	let query = {};
	query[attr] = this.value;
	return model.where(query).fetch().then((res) => {
		if (!res) this.addError(message);
	});
};

async function ctxValidate(next) {
	const ctx = this;
	if (!ctx.errors) {
		await next();
		return;
	}
	let errors = {};
	ctx.errors.forEach((error) => {
		let key = Object.keys(error)[0];
		errors[key] = error[key];
	});
	ctx.status = 400;
	ctx.throw(400, {
		data: {
			errors
		}
	});
}

function $body(key) {
	return this.checkBody(key).value;
}

function $get(key) {
	return this.query[key];
}

function isAjax() {
	return this.request.get("X-Requested-With") === "XMLHttpRequest";
}