function stringEndsWithAny(string, suffixes) {
	return suffixes.some(function (suffix) {
		return string.endsWith(suffix);
	});
}

function getKey() {
	return window.location.pathname.split('/model/')[1];
}

export {
	stringEndsWithAny,
	getKey
};
