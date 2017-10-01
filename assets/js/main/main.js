import * as util from "./util"
import list from "./components/list"

(() => {
	const $table = $("#jsgrid");

	if($table.length)
		list($table);

})();

