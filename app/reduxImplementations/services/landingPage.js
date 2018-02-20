import { callApi } from 'utils/request';
import Promise from 'bluebird';
import { List }  from 'immutable';

export function getLandingPageContent(type) {

    return new Promise((resolve, reject) => {

        callApi("landingPage?type=" + type, {
            method: "GET"
        }).then((response) => {

            debugger
            if (response.completed && response.data.success) {

                resolve({ 'lstLandingPage': List(response.data.data) });

            } else {

                resolve();
            }

        });

    });
}

export function getLatestProducts() {

    return new Promise((resolve, reject) => {

        callApi("landingPage/latestProduts", {
            method: "GET"
        }).then((response) => {

            if (response.completed && response.data.success) {

                resolve({ 'lstLatestProducts': List(response.data.data) });

            } else {

                resolve();
            }

        });

    });
}

export function getProductVideos() {

    return new Promise((resolve, reject) => {

        callApi("landingPage/getProductVideos", {
            method: "GET"
        }).then((response) => {

            if (response.completed && response.data.success) {

                resolve({ 'lstLastestVideos': List(response.data.data) });

            } else {

                resolve();
            }

        });

    });
}