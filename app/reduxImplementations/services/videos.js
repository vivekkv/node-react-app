import { callApi } from 'utils/request';
import Promise from 'bluebird';
import { List } from 'immutable';

export function getVideos(product_id) {

    return () => {
        return new Promise((resolve, reject) => {

            callApi("videos?product_id=" + product_id, {
                method: "GET"
            }).then((response) => {

                if (response.completed && response.data.success) {

                    resolve({ 'videosList': List(response.data.data) });

                } else {

                    resolve();
                }

            });

        });
    }
}

export function getAllVideos() {

    return new Promise((resolve, reject) => {

        callApi("product/videos", {
            method: "GET"
        }).then((response) => {

            if (response.completed && response.data.success) {

                resolve({ 'lstAllVideos': List(response.data.data) });

            } else {

                resolve();
            }

        });

    });

}