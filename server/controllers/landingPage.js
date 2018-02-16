var db = require('../data/db');
var uuid = require("node-uuid");

function get(req, res) {

    db('landingPage')
        .orderBy('id', 'desc')
        //.where({ 'type': req.query.type })
        .limit(req.body.limit)
        .then((data) => {

            res.json({ 'success': true, 'data': data });
        })
        .catch(function (error) {

            res.json({ 'success': false, 'error': error });
        });
}

function addOrUpdate(req, res) {

    try {

        let data = { 'type': req.body.type, 'value': req.body.value, 'id': req.body.id, 'additionalInfo': req.body.additionalInfo };

        if (!req.body.id) {

            data.id = uuid.v1();;

            db('landingPage')
                .insert(data)
                .returning("id")
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'content added successfully' });

                })
                .catch(function (error) {

                    res.json({ 'success': false, 'error': error });

                });


        } else {

            db('landingPage')
                .update({ 'type': req.body.type, 'value': req.body.value, 'additionalInfo': req.body.additionalInfo })
                .returning("id")
                .where({ 'id': req.body.id })
                .then(() => {

                    res.json({ 'success': true, 'data': data, 'message': 'content udated successfully' });

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

        db('landingPage')
            .where({ 'id': req.body.id })
            .del()
            .then(() => {

                res.json({ 'success': true, 'data': { 'idi':req.body.id  } });

            })
            .catch(function (error) {

                res.json({ 'success': false, 'error': error });

            });

    }
    catch (e) {

        res.json({ 'success': false, 'error': e });
    }

}

function getLatestProducts(req, res) {

    try {

        db('landingPage')
            .join("product", 'product.id', '=', 'landingPage.value')
            .join("images", 'product.id', '=', 'images.product_id')
            .select(['product.id', 'product.description', 'product.category_id', 'product.name', 'images.path'])
            .limit(5).offset(0)
            .orderBy('landingPage.id', 'desc')
            .then((data) => {

                res.json({ 'success': true, 'data': data });
            })
            .catch(function (error) {

                res.json({ 'success': false, 'error': error });
            });
    }
    catch (e) {

        res.json({ 'success': false, 'error': e });
    }
}

function getProductVideos(req, res) {

    try {

        db('landingPage')
            .join("product", 'product.id', '=', 'landingPage.value')
            .join("videos", 'product.id', '=', 'videos.product_id')
            .select(['product.id', 'product.description', 'product.category_id', 'product.name', 'videos.path'])
            .limit(4).offset(0)
            .orderBy('landingPage.id', 'desc')
            .then((data) => {

                res.json({ 'success': true, 'data': data });
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
    remove,
    getLatestProducts,
    getProductVideos
}