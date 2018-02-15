var db = require('../data/db');

function login(req, res) {

    db('users')
        .where({ 'username': req.body.username, 'password': req.body.password })
        .then((data) => {

            if (data.length > 0) {

                res.json({ 'success': true, 'data': { 'user': { 'username': req.body.username } } })
            } else {

                res.json({ 'success': false, 'message': "login failed", 'data': {  } })
            }
        })
}

module.exports = {
    login
}