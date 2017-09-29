const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const notifier  = require("node-notifier");
const browserSync = require("browser-sync");
const cache = require("gulp-cached");

const env = require("./env.json");


function browserSyncTask(cb) {
	browserSync({
		proxy: `http://localhost:${env.PORT}`,
		port: 7002,
		open: 0,
		notify: 1
	}, function callback() {
		gulp.watch("./public/css/main.css", function() {

			gulp.src("./public/css/**/*.css")
				.pipe(cache("css"))
				.pipe(browserSync.stream());
		});

		cb();
	});
}

function nodemonTask() {
	const daemon = nodemon({
		script: "./index.js",
		watch: [
			"app/**/*",
			"env.json",
			"index.js"
		],
		ignore: [
			"node_modules"
		],
		ext: "js hbs json"
	});

	daemon
		.on("restart", () => {
			console.warn("Application has restarted!");
		})
		.on("crash", () => {
			notifier.notify({
				"title": "nodemon",
				"message": "Application has crashed!"
			});
			console.warn("Application has crashed!\n");
			daemon.emit("restart", 10);
		});
}

/* Tasks */
gulp.task("nodemon", nodemonTask);
gulp.task("browser-sync", browserSyncTask);

gulp.task("default", ["nodemon", "browser-sync"], (cb) => {
	cb();
});

