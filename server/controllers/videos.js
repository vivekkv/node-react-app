var db = require('../data/db');
var uuid = require("node-uuid");

function get(req, res) {

    db('videos')
    .orderBy('id', 'desc')
        .where({ 'product_id': req.query.product_id })
        .then((data) => {

            res.json({ 'success': true, 'data': data });

        })
        .catch(function (error) {

            res.json({ 'success': false, 'error': error });

        });
}

function addOrUpdate(req, res) {

    try {

        let data = { 'product_id': req.body.product_id, 'path': req.body.path, 'description': req.body.description, 'id': req.body.id };

        if (!req.body.id) {

            data.id = uuid.v1();

            db('videos')
                .insert(data)
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'product video added successfully' });

                })
                .catch(function (error) {

                    res.json({ 'success': false, 'error': error });

                });


        } else {

            db('videos')
                .update({ 'product_id': req.body.product_id, 'path': req.body.path, 'description': req.body.description })
                .returning("id")
                .where({ 'id': req.body.id })
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'product video updated successfully' });

                })
                .catch(function (error) {

                    res.json({ 'success': false, 'error': error });

                });

        }
    }
    catch (e) {

        res.json({ 'success': false, 'error': error });
    }
}

function remove(req, res) {

    try {

        db('videos')
            .where({ 'id': req.body.id })
            .del()
            .then(() => {

                res.json({ 'success': true, 'message': 'product video removed successfully' });

            })
            .catch(function (error) {

                res.json({ 'success': false, 'error': error });

            });

    }
    catch (e) {

        res.json({ 'success': false, 'error': e });
    }

}

module.exports = {
    addOrUpdate,
    get,
    remove
}