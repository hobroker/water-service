const env = require("../../env.json");


module.exports = async (ctx, next) => {
	let url = ctx.request.url;

	let on_admin = !url.indexOf("/admin");
	if (on_admin && url.indexOf("/admin/login")) {
		if (ctx.isUnauthenticated()) {
			ctx.redirect("/admin/login");
		}
	}

	try {
		ctx.lang = ctx.cookies.get("lang") || "ro";
		ctx.$flow = {};

		await next();

		const status = ctx.status || 404;
		if (status === 404) {
			ctx.throw(404);
		}

	} catch (err) {

		console.log(
			err
		);

		ctx.status = err.statusCode || err.status || 500;

		if (ctx.status !== 404 && env.NODE_ENV !== "production") {
			console.log(
				err, url
			);
		}

		if (ctx.status === 404) {
			if (ctx.isAjax()) {
				ctx.body = {
					message: "Not found"
				};
				ctx.status = 404;
				ctx.app.emit("error", err, ctx);
			} else {
				await ctx.rend("pages/404");
			}
		} else {
			ctx.body = {
				data: err.data,
				message: err.message
			};

			ctx.status = err.status || 500;

			ctx.app.emit("error", err, ctx);
		}
	}
};

