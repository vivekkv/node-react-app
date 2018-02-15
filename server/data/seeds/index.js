var uuid   = require('node-uuid');

exports.seed = function (knex, Promise) {
    return Promise.all([
        knex('users').del()
    ])
        .then(function () {
            return Promise.all([
                knex('users').insert([{ 'id': uuid.v1(), 'username': 'admin', 'password': "admin", "active": true }]),
            ]);
        })
        .catch(function (err) {
            console.log(err)
        });
};
