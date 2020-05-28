
const getLocalStorage = () => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./db');
    }
    return localStorage
}

module.exports = {
    getLocalStorage
}
   