import { callApi } from 'utils/request';
import Promise from 'bluebird';
import { List }  from 'immutable';

export function getImages(product_id) {

    return () => { 
        return new Promise((resolve, reject) => {

            callApi("images?product_id=" + product_id, {
                method: "GET"
            }).then((response) => {
    
                if (response.completed && response.data.success) {
    
                    resolve({ 'imagesList': List(response.data.data) });
    
                } else {
    
                    resolve();
                }
    
            });
    
        });
    }
}

export function getAllImages() {

    return new Promise((resolve, reject) => {

        callApi("product/images", {
            method: "GET"
        }).then((response) => {

            if (response.completed && response.data.success) {

                resolve({ 'lstAllImages': List(response.data.data) });

            } else {

                resolve({ 'lstAllImages': List([]) });
            }

        });

    });

}