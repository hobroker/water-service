function getModel(key) {
	const models = {
		test: 'Test'
	};

	return require(`../models/${models[key]}`);

}

module.exports = {
	getModel
};
