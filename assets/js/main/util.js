function stringEndsWithAny(string, suffixes) {
	return suffixes.some(function (suffix) {
		return string.endsWith(suffix);
	});
}

export {
	stringEndsWithAny
};
