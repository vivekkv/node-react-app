import { callApi } from 'utils/request';
import Promise from 'bluebird';
import { List } from 'immutable';

export function getCategories() {

	return new Promise((resolve, reject) => {

		callApi("category", {
			method: "GET"
		}).then((response) => {

			if (response.completed && response.data.success) {

				resolve({ 'categoryList': List(response.data.data) });

			} else {

				resolve();
			}

		});

	});
}

export function getMetisMenu() {

	return new Promise((resolve, reject) => {

		callApi("category/getCategories", {
			method: "GET"
		}).then((response) => {

			if (response.completed && response.data.success) {
				resolve({ 'metisMenu': List(response.data.data) });

			} else {

				resolve();
			}

		});

	});

}