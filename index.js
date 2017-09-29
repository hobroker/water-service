console.time("Time to start the app");

const app = new (require("koa"))();
const views = require("koa-views");
const session = require("koa-session");
const notifier = require("node-notifier");

// eslint-disable-next-line no-unused-vars
const logger = require("koa-logger");

const env = require("./env.json");
const router = require("./app/router");
const passport = require("./app/helpers/passport");


global.ON_PROD = env.NODE_ENV === "production";

require("koa-validate")(app);
require("./app/handlebars");
require("./app/helpers/koa-context")(app);

app.keys = env.KEYS;
app.proxy = true;

app
	.use(session({}, app))
	.use(views(__dirname + "/app/views", {
		extension: "hbs",
		map: {hbs: "handlebars"}
	}))
	// .use(logger())
	.use(require("koa-body")({
		multipart: true,
		urlencoded: true,
		formLimit: 10 * 1024 * 1024
	}))
	.use(passport.initialize())
	.use(passport.session())
	.use(require("./app/middlewares/request"));

router.init(app, 0);

app.use(require("koa-static")("./public"));

app.listen(env.PORT);

console.timeEnd("Time to start the app");
console.log(`Listening on :${env.PORT}`);

notifier.notify({
	title: "nodemon",
	message: `app listening on ${env.PORT}!`,
	sound: false
});


