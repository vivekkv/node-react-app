var db = require('../data/db');
var uuid = require("node-uuid");

function get(req, res) {

    db('poduct_detail')
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

        let data = { 'product_id': req.body.product_id, 'description': req.body.description, 'id': req.body.id };

        if (!req.body.id) {

            data.id = uuid.v1();

            db('poduct_detail')
                .insert(data)
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'product detail added successfully' });

                })
                .catch(function (error) {

                    res.json({ 'success': false, 'error': error });

                });


        } else {

            db('poduct_detail')
                .update({ 'product_id': req.body.product_id, 'description': req.body.description })
                .where({ 'id': req.body.id })
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'product detail updated successfully' });

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

        db('poduct_detail')
            .where({ 'id': req.body.id })
            .del()
            .then(() => {

                res.json({ 'success': true, 'message': 'product detail removed successfully' });

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