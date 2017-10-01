const getModel = require("../../helpers/util").getModel;

async function list(ctx) {
	const key = ctx.params.key;
	const model = getModel(key);

	ctx.body = {
		data: await model.fetchAll()
	};
}
async function del(ctx) {
	const key = ctx.params.key;
	const id = ctx.params.id;
	const model = getModel(key);

	await model.where({id}).destroy();

	ctx.body = {};
}

async function columns(ctx) {
	const model = getModel(ctx.params.key);

	ctx.body = {
		data: model._.columns
	};
}

module.exports = {
	list,
	del,
	columns
};
