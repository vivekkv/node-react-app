import 'whatwg-fetch';
import Promise from 'bluebird';
import { logError } from './errorLog';
import { serviceBase } from './apiConfig';
import { getToken, unAuthorizeUser } from './authRegistry';
import { showLoader, hideLoader } from './notification';

export function callApi(url, options) {

	url = serviceBase + url;
	return httpRequest(url, addAuthorizationHeader(options))
}

export function httpRequest(url, options) {

	try {

		return new Promise((resolve, reject) => {

			showLoader();

			fetch(url, options)
				.then((response) => {
					if (response.status == 200 || response.status == 201) {

						parseJSON(response).then((data) => {

							let result = { completed: true, response, data, statusCode: response.status  };
							resolve(result);

							hideLoader();
						});

					} else if (response.status == 401) {

						alert("Your token has expired ! You must login again to continue");
						unAuthorizeUser();

						window.location = "/";
						let result = { completed: false, response, data: null };
						resolve(result);
						hideLoader();

					} else {

						let result = { completed: false, response };
						resolve(result);
						hideLoader();
					}
				})
				.catch((err, a) => {

					let result = { completed: false, error: err };
					resolve(result);
					hideLoader();
					
				});
		});
	} catch (e) {

		logError(e);
	}
}

function parseJSON(response) {

	return new Promise((resolve) => {

		if (!response.json) {

			resolve()
		} else {

			try {

				response.json().then((data) => {

					resolve(data);

                }).catch((e) => {

                    resolve();

                });
                
			} catch (e) {
				resolve();
			}
		}

	})
}

function checkStatus(response) {

	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;

	throw error;
}

function addAuthorizationHeader(options) {

	// options = options || {};
	// let token = getToken();

	// if (options.headers && token) {

	// 	options.headers.Authorization = token;

	// } else if (token) {

	// 	options.headers = {
	// 		Authorization: token
	// 	}
	// }

	return options;
}