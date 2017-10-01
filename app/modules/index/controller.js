const getModel = require("../../helpers/util").getModel;

async function indexPage(ctx) {
	await ctx.rend("pages/home/home");
}

async function listPage(ctx) {

	await ctx.rend("pages/manage/list", {
		title: ctx.params.key
	});

}

async function updatePage(ctx) {
	const key = ctx.params.key;
	const id = ctx.params.id;
	const model = getModel(key);
	const fields = model._.fields;

	const data = (await model.where("id", id).fetch({
		columns: fields.map((i) => i.name)
	})).toJSON();

	for(let field of fields) {
		field.value = data[field.name];
	}

	await ctx.rend("pages/manage/update", {
		title: `Actualizare ${key} #${id}`,
		fields
	});

}

async function createPage(ctx) {
	const key = ctx.params.key;
	const model = getModel(key);
	const fields = model._.fields;

	await ctx.rend("pages/manage/create", {
		title: `Creare ${key}`,
		fields
	});

}

module.exports = {
	indexPage,
	listPage,
	updatePage,
	createPage
};
