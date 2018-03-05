import { callApi } from 'utils/request';
import Promise from 'bluebird';
import { List } from 'immutable';

export function getAttachments(product_id) {

    return () => {
        return new Promise((resolve, reject) => {

            callApi("attachments?product_id=" + product_id, {
                method: "GET"
            }).then((response) => {

                if (response.completed && response.data.success) {

                    resolve({ 'attachmentList': List(response.data.data) });

                } else {

                    resolve();
                }

            });

        });
    }
}