import { callApi } from 'utils/request';
import Promise from 'bluebird';
import { List } from 'immutable';

export function getSuitableFor(product_id) {

    return () => {
        return new Promise((resolve, reject) => {

            callApi("suitableFor?product_id=" + product_id, {
                method: "GET"
            }).then((response) => {

                if (response.completed && response.data.success) {

                    resolve({ 'suitableForList': List(response.data.data) });

                } else {

                    resolve();
                }

            });

        });
    }
}