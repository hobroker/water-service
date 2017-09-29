const exposed = window.__ex__;
delete window.__ex__;

function getExposed(key) {
	return exposed[key];
}

export {
	getExposed
};
