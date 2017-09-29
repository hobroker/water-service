async function indexPage(ctx) {
	await ctx.rend("pages/home/home");
}

module.exports = {
	indexPage
};
