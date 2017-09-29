const passport = require("koa-passport");
const _ = require("lodash");
const LocalStrategy = require("passport-local").Strategy;

let users = [
	{
		id: 1,
		username: "admin",
		password: "123qwe"
	}
];

const getUser = (opts) => {
	return _.find(users, opts);
};

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = getUser({id: id});
		done(null, user);
	} catch (err) {
		done(err);
	}
});

passport.use(new LocalStrategy({
		usernameField: "username",
		passwordField: "password"
	},
	async (username, password, done) => {
		let user = getUser({username, password});
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	}
));

module.exports = passport;

