var db = require('../data/db');
var uuid = require("node-uuid");
var Promise = require("bluebird");

function get(req, res) {

    db('product')
        .orderBy('id', 'desc')
        .then((data) => {

            data.forEach((i) => {
                i.text = i.name;
                i.value = i.id
            });

            res.json({ 'success': true, 'data': data });

        })
        .catch(function (error) {

            res.json({ 'success': false, 'error': error });

        });
}

function addOrUpdate(req, res) {

    try {

        let data = { 'category_id': req.body.category_id, 'name': req.body.name, 'description': req.body.description, 'id': req.body.id };

        if (!req.body.id) {

            data.id = uuid.v1();;

            db('product')
                .insert(data)
                .returning("id")
                .then(() => {

                    data.text = data.name;
                    data.value = data.id;

                    res.json({ 'success': true, 'data': data, 'message': 'product added successfully' });

                })
                .catch(function (error) {

                    res.json({ 'success': false, 'error': error });

                });


        } else {

            db('product')
                .update({ 'category_id': req.body.category_id, 'name': req.body.name, 'description': req.body.description })
                .where({ 'id': req.body.id })
                .returning("id")
                .then(() => {

                    data.text = data.name;
                    data.value = data.id;

                    res.json({ 'success': true, 'data': data, 'message': 'product updated successfully' });

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

        db('product')
            .where({ 'id': req.body.id })
            .del()
            .then(() => {

                res.json({ 'success': true, 'message': 'product removed successfully' });

            })
            .catch(function (error) {

                res.json({ 'success': false, 'error': error });

            });

    }
    catch (e) {

        res.json({ 'success': false, 'error': e });
    }

}

function getProducts(req, res) {

    db("product")
        .then((data) => {

            let products = [];
            let counter = 0;

            if (data.length > 0) {

                data.forEach((d) => {

                    getCategory(d.category_id).then((category) => {

                        d.category = category;

                        getFeatures(d.id).then((features) => {

                            d.features = features;

                            getCapacity(d.id).then((capacity) => {

                                d.capacity = capacity;

                                getAttachments(d.id).then((attachments) => {

                                    d.attachments = attachments;

                                    getSuitableFor(d.id).then((suitableFor) => {

                                        d.suitableFor = suitableFor;

                                        getVideos(d.id).then((videos) => {

                                            d.videos = videos;

                                            getImages(d.id).then((images) => {

                                                d.images = images;

                                                getTotalRatings(d.id).then((totalratings) => {

                                                    d.productRating = totalratings;
                                                    products.push(d);
                                                    counter++;

                                                    if (counter == data.length) {

                                                        res.json({ 'success': true, data: products });
                                                    }

                                                })

                                            });

                                        });

                                    });

                                });

                            });

                        });
                    })
                });

            } else {

                res.json({ 'success': true, 'data': [] });
            }



        })
        .catch(function (error) {

            res.json({ 'success': false, 'error': error });

        });
}

function getProductImages(req, res) {

    db("product")
        .join("images", 'product.id', '=', 'images.product_id')
        .select(["product.name", "images.path", "product.id", "product.description", "product.category_id"])
        .orderBy('product.id', 'desc')
        .limit(15)
        .then((data) => {

            res.json({ 'success': true, 'data': data });
        })
        .catch(function (error) {

            res.json([]);

        });

}

function getProductInfo(req, res) {

    db("product")
        .where({ 'id': req.query.productId })
        .then((data) => {

            let d = data[0];

            getCategory(d.category_id).then((category) => {

                d.category = category;

                getFeatures(d.id).then((features) => {

                    d.features = features;

                    getCapacity(d.id).then((capacity) => {

                        d.capacity = capacity;

                        getAttachments(d.id).then((attachments) => {


                            d.attachments = attachments;

                            getSuitableFor(d.id).then((suitableFor) => {

                                d.suitableFor = suitableFor;

                                getVideos(d.id).then((videos) => {

                                    d.videos = videos;

                                    getImages(d.id).then((images) => {

                                        d.images = images;

                                        getTotalRatings(d.id).then((totalratings) => {

                                            d.productRating = totalratings;

                                            res.json({ 'success': true, data: d });

                                        })

                                    });

                                });

                            });

                        });

                    });

                });

            })

        })
        .catch(function (error) {

            res.json({ 'success': false, 'error': error });

        });

}

function getCategory(categoryId) {

    return new Promise((resolve, reject) => {

        db("category")
            .where({ 'id': categoryId })
            .then((category) => {

                resolve(category[0])
            })
            .catch(() => {

                resolve();
            })
    })
}

function getFeatures(productId) {

    return new Promise((resolve, reject) => {

        db("features")
            .where({ 'product_id': productId })
            .then((data) => {

                resolve(data);
            })
            .catch(function (error) {

                resolve([]);

            });
    });
}

function getCapacity(productId) {

    return new Promise((resolve, reject) => {

        db("capacity")
            .where({ 'product_id': productId })
            .then((data) => {

                resolve(data);
            })
            .catch(function (error) {

                resolve([]);

            });
    });
}

function getAttachments(productId) {

    return new Promise((resolve, reject) => {

        db("attachments")
            .where({ 'product_id': productId })
            .then((data) => {

                resolve(data);
            })
            .catch(function (error) {

                resolve([]);

            });
    });
}

function getSuitableFor(productId) {

    return new Promise((resolve, reject) => {

        db("suitableFor")
            .where({ 'product_id': productId })
            .then((data) => {

                resolve(data);
            })
            .catch(function (error) {

                resolve([]);

            });
    });
}

function getVideos(productId) {

    return new Promise((resolve, reject) => {

        db("videos")
            .where({ 'product_id': productId })
            .then((data) => {

                resolve(data);
            })
            .catch(function (error) {

                resolve([]);

            });
    });
}

function getImages(productId) {

    return new Promise((resolve, reject) => {

        db("images")
            .where({ 'product_id': productId })
            .then((data) => {

                resolve(data);
            })
            .catch(function (error) {

                resolve([]);

            });
    });
}

function getTotalRatings(productId) {

    return new Promise((resolve, reject) => {

        db("ratings")
            .where({ 'product_id': productId })
            .then((ratings) => {

                let totalRatings = 0;

                ratings.forEach((i) => {

                    totalRatings = totalRatings + Number(i.rating);

                });

                resolve(totalRatings / 10)

            });
    });

}

function ratings(req, res) {

    try {

        let data = { 'id': uuid.v1(), 'product_id': req.body.productId, 'name': req.body.name, 'email': req.body.email, 'remarks': req.body.remarks, 'rating': req.body.rating };

        db('ratings')
            .insert(data)
            .returning("id")
            .then(() => {

                res.json({ 'success': true });

            })
            .catch(function (error) {

                res.json({ 'success': false, 'error': error });

            });
    }
    catch (e) {

        res.json({ 'success': false, 'error': error });
    }

}

function getProductVideos(req, res) {

    db("product")
        .join("videos", 'product.id', '=', 'videos.product_id')
        .join("images", 'product.id', '=', 'images.product_id')
        .select(["product.name", "videos.path", "images.path as imagePath", "product.id", "product.description", "product.category_id"])
        .orderBy('product.id', 'desc')
        .limit(15)
        .then((data) => {

            res.json({ 'success': true, 'data': data });
        })
        .catch(function (error) {

            res.json([]);

        });
}

module.exports = {
    addOrUpdate,
    get,
    remove,
    getProducts,
    getProductInfo,
    getProductImages,
    ratings,
    getProductVideos
}