var db = require('../data/db');
var uuid = require("node-uuid");

function get(req, res) {

    db('attachments')
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

        let data = { 'product_id': req.body.product_id, 'attachment': req.body.attachment, 'id': req.body.id };

        if (!req.body.id) {

            data.id = uuid.v1();

            db('attachments')
                .insert(data)
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'attachments added successfully' });

                })
                .catch(function (error) {

                    res.json({ 'success': false, 'error': error });

                });


        } else {

            db('attachments')
                .update({  'product_id': req.body.product_id, 'attachment': req.body.attachment })
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'attachments updated successfully' });

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

        db('attachments')
            .where("id", req.body.id)
            .del()
            .then(() => {

                res.json({ 'success': true, 'message': 'attachment removed successfully' });

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