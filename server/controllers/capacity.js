var db = require('../data/db');
var uuid = require("node-uuid");

function get(req, res) {

    db('capacity')
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

        let data = { 'product_id': req.body.product_id, 'capacity': req.body.capacity, 'id': req.body.id };

        if (!req.body.id) {

            data.id = uuid.v1();

            db('capacity')
                .insert(data)
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'capcity added successfully' });

                })
                .catch(function (error) {

                    res.json({ 'success': false, 'error': error });

                });


        } else {

            db('capacity')
                .update({  'product_id': req.body.product_id, 'capacity': req.body.capacity })
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'capcity updated successfully' });

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

        db('capacity')
            .where("id", req.body.id)
            .del()
            .then(() => {

                res.json({ 'success': true, 'message': 'capcity removed successfully' });

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