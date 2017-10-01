const bookshelf = require("../helpers/db").bookshelf;

const Test = bookshelf.Model.extend({
	tableName: "tb_test",
	hasTimestamps: true
});

Test.Validator = require("koa-validate").Validator;

Test._ = {
	columns: [
		{
			name: "id",
			title: "ID",
			align: "center",
			width: 10
		}, {
			name: "name",
			title: "Name",
			align: "left"
		}
	],
	fields: [
		{
			name: "name",
			title: "Name"
		}
	]
};

module.exports = bookshelf.model("Test", Test);