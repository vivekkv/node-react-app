export function setItem(name, value) {

    localStorage.setItem(name, value);
}

export function getItem(name) {

    return localStorage.getItem(name);
}

export function remove(name) {

    localStorage.removeItem(name);
}   