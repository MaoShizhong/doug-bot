const { User } = require('./users/User.js');

class Storage {
    static localStorage;

    static initialise() {
        Storage.connectLocalStorageToFolder();
        Storage.readJSONIntoUserArray();
    }

    static connectLocalStorageToFolder() {
        if (typeof Storage.localStorage === 'undefined' || !Storage.localStorage) {
            const LocalStorage = require('node-localstorage').LocalStorage;
            Storage.localStorage = new LocalStorage('./user_profiles');
        }
    }

    static readJSONIntoUserArray() {
        if (!Storage.localStorage.getItem('users')) {
            console.log('No local storage - creating empty item');
            Storage.populateLocalStorage();
        } else {
            console.log('Storage found! Reading from JSON into User.users array');
            Storage.readFromLocalStorage();
        }
    }

    static populateLocalStorage() {
        Storage.localStorage.setItem('users', JSON.stringify(User.users));
    }

    static readFromLocalStorage() {
        const allUsers = JSON.parse(Storage.localStorage.getItem('users'));
        allUsers.forEach((user) => {
            User.users.push(new User(...Object.values(user)));
        });
    }
}

exports.Storage = Storage;
