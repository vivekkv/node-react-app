var db = require('../data/db');
var uuid = require("node-uuid");

function get(req, res) {

    db('suitableFor')
        .orderBy('created_at', 'desc')
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

        let data = { 'product_id': req.body.product_id, 'description': req.body.description, 'id': req.body.id };

        if (!req.body.id) {

            data.id = uuid.v1();

            db('suitableFor')
                .insert({ 'product_id': req.body.product_id, 'description': req.body.description })
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data , 'message': 'product suitable for added successfully'});

                })
                .catch(function (error) {

                    res.json({ 'success': false, 'error': error });

                });


        } else {

            db('suitableFor')
                .update({ 'product_id': req.body.product_id, 'description': req.body.description })
                .where({ 'id': req.body.id })
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'product suitable for updated successfully' });

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

        db('suitableFor')
        .where({ 'id': req.body.id })
            .del()
            .then(() => {

                res.json({ 'success': true, 'message': 'product suitable for removed successfully' });

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