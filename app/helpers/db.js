const Bookshelf = require("bookshelf");
const Knex = require("knex");
const koaValidate = require("koa-validate");
const env = require("../../env.json");

const knex = Knex({
	client: "mysql",
	connection: env.DB_CONNECTION,
	searchPath: "knex,public",
	debug: 0
});

const bookshelf = Bookshelf(knex);
bookshelf.plugin("registry");
bookshelf.plugin("pagination");

bookshelf.Model.Validator = koaValidate.Validator;

module.exports = {knex, bookshelf};
