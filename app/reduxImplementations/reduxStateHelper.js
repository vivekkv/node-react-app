import Promise from 'bluebird';
import _ from 'lodash';

export function buildNewState(currentState, items) {

    if (Array.isArray(items)) {

        items.forEach((item) => {

            currentState = currentState.set(item.name, item.value)
        });

    } else {

        for(let i in items) {

            currentState = currentState.set(i, items[i])
        }
    }

    return currentState;
}


export function bindInputChange(callbacks, name, value) {

    return new Promise((resolve, reject) => {

        let newState = [];

        if (typeof name == "object") {

            for (var i in name) {

                newState.push({
                    'name': i,
                    'value': name[i]
                })
            }

            resolve(newState);

        } else {

            if (callbacks && callbacks.length > 0) {

                let callbackLength = callbacks.length;
                let iterator = 0;

                Promise.each(callbacks, function (promise) {

                    if (typeof promise == "object") {

                        for (const item in promise) {

                            newState.push({
                                'name': item,
                                'value': promise[item]
                            });
                        }

                        iterator++;

                        if (iterator == callbackLength) {

                            newState.push({ 'name': name, 'value': value });

                            resolve(newState);
                        }


                    } else {

                        promise().then((data) => {

                            for (const item in data) {

                                newState.push({
                                    'name': item,
                                    'value': data[item]
                                });
                            }

                            iterator++;

                            if (iterator == callbackLength) {

                                newState.push({ 'name': name, 'value': value });

                                resolve(newState);
                            }
                        });
                    }

                });

            } else {

                newState.push({ 'name': name, 'value': value });
                resolve(newState);
            }
        }
    })
}

export function copyObjectToArray(object) {

    let items = [];

    for (let i in object) {

        items.push({
            'name': i,
            'value': object[i]
        });
    }

    return items;
}

export function addItemToFormList(item, formList, isNewItem) {

    if (!isNewItem) {

        let existingItem = _.find(formList, (i) => { return i.Id == item.Id });
        _.extend(existingItem, item);

    } else {

        formList.push(item)
    }

    return formList;
}
export function bindInput(callbacks, name, value, showLoaderIco) {
    
        return new Promise((resolve, reject) => {
    
            if (showLoaderIco != false)
                showLoader();
                
            let newState = [];
    
            if (typeof name == "object") {
    
                for (var i in name) {
    
                    newState.push({
                        'name': i,
                        'value': name[i]
                    })
                }
    
                hideLoader();
                resolve(newState);
                
            } else {
    
                if (callbacks && callbacks.length > 0) {
    
                    let callbackLength = callbacks.length;
                    let iterator = 0;
    
                    if (showLoaderIco != false)
                        showLoader();
    
                    Promise.each(callbacks, function (promise) {
                        promise().then((data) => {
    
                            for (const item in data) {
    
                                newState.push({
                                    'name': item,
                                    'value': data[item]
                                });
                            }
    
                            iterator++;
    
                            if (iterator == callbackLength) {
    
                                newState.push({ 'name': name, 'value': value });
    
                                resolve(newState);
                            }
                        });
    
                        if (showLoaderIco != false)
                            hideLoader();
                    });
    
                } else {
    
                    newState.push({ 'name': name, 'value': value });
                    resolve(newState);
                }
            }
        })
    }
    