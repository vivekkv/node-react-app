import { callApi } from 'utils/request';
import Promise from 'bluebird';
import { List }  from 'immutable';

export function getLandingPageContent(type) {

    return new Promise((resolve, reject) => {

        callApi("landingPage?type=" + type, {
            method: "GET"
        }).then((response) => {

            if (response.completed && response.data.success) {

                resolve({ 'lstLandingPage': List(response.data.data) });

            } else {

                resolve();
            }

        });

    });
}