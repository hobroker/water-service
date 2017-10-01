import "jsgrid";
import "jsgrid/css/jsgrid.css";
import "jsgrid/css/theme.css";
import {getKey} from '../util';

const key = getKey();

function jsgrid($table) {

	getColumns()
		.then((columns) => {
			initGrid($table, columns);
		})

}

function initGrid($table, columns) {

	const fields = [...columns, {
		type: "control",
		modeSwitchButton: false,
		editButton: true
	}];

	$table.jsGrid({
		fields,
		width: "100%",
		height: "75vh",
		onDataLoaded: controlRedirect,
		onRefreshed: controlRedirect,
		editing: false,
		sorting: true,
		filtering: false,
		paging: false,
		autoload: true,

		controller: {
			loadData: () => {
				let d = $.Deferred();
				$.ajax({
					url: `/api/list/${key}`,
					dataType: "json"
				}).done(function (response) {
					d.resolve(response.data);
				});
				return d.promise();
			},
			deleteItem: (item) => {
				return $.ajax({
					type: "DELETE",
					url: `/api/delete/${key}/${item.id}`
				});
			}
		}
	});
}

function getColumns() {
	return new Promise((resolve) => {
		$.ajax({
			url: `/api/columns/${key}`,
			dataType: "json"
		}).done(function (response) {
			resolve(response.data)
		});
	})
}

function controlRedirect() {
	$(".jsgrid-edit-button").click(function () {
		let id = $(this).closest("tr").find("td:first-child").text();
		window.location.href = `/model/${key}/update/${id}`;
	});
}

export default jsgrid;
