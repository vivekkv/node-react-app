var db = require('../data/db');
var uuid = require("node-uuid");
var Promise = require("bluebird");
var _ = require("lodash");

function get(req, res) {

    db('category')
        .then((categories) => {

            categories.forEach((i) => {
                i.text = i.categoryname;
                i.value = i.id;
            })

            res.json({ 'success': true, 'data': categories });

        })
        .catch(function (error) {

            res.json({ 'success': false, 'error': error });

        });
}

function addOrUpdate(req, res) {

    try {

        let data = { 'created_at': new Date(), 'parent_category': req.body.parent_category, 'categoryname': req.body.categoryname, 'description': req.body.description, 'id': req.body.id };

        if (!req.body.id) {

            data.id = uuid.v1();

            db('category')
                .insert(data)
                .returning("id")
                .then(() => {

                    data.text = data.categoryname;
                    data.value = data.id;

                    res.json({ 'success': true, 'data': data, 'message': 'category added successfully' });

                })
                .catch(function (error) {


                    res.json({ 'success': false, 'error': error });

                });


        } else {

            db('category')
                .update({ 'parent_category': req.body.parent_category, 'categoryname': req.body.categoryname, 'description': req.body.description })
                .returning("id")
                .where({ 'id': req.body.id })
                .then(() => {

                    data.text = req.body.categoryname;
                    data.value = req.body.id;

                    res.json({ 'success': true, 'data': data, 'message': 'category updated successfully' });

                })
                .catch(function (error) {

                    res.json({ 'success': false, 'error': error });

                });

        }
    }
    catch (e) {

        res.json({ 'success': false, 'error': e });
    }
}

function remove(req, res) {

    try {

        db('category')
            .where({ 'id': req.body.id })
            .del()
            .then(() => {

                res.json({ 'success': true, 'message': 'category removed successfully' });

            })
            .catch(function (error) {

                res.json({ 'success': false, 'error': error });

            });

    }
    catch (e) {

        res.json({ 'success': false, 'error': e });
    }

}

function getCategories(req, res) {

    db('category')
        .then((categories) => {

            let categoryList = [];

            if (categories.length > 0) {

                categories.forEach((item) => {

                    let childCategories = getChildCategories(item.id, categories);
                    item.label = item.categoryname;
                    item.to = "/#/category/" + item.id;
                    item.categoryId = item.id;
                    item.content = childCategories;
                    categoryList.push(item);

                });

                res.json({ 'success': true, 'data': categoryList });

            } else {

                res.json({ 'success': true, 'data': categoryList });
            }

        })
        .catch(function (error) {

            res.json({ 'success': false, 'error': error });

        });
}

function getFooterCategories() {

    db('category')
        .then((categories) => {

            let footerCategories = [];

            if (categories.length > 0) {

                res.json({ 'success': true, 'data': categoryList });

            } else {

                res.json(categoryList)
            }

        })
        .catch(function (error) {

            res.json({ 'success': false, 'error': error });

        });
}

function getChildCategories(id, categories) {

    let array = categories.slice(0);
    let childCategories = _.filter(array, (i) => { return i.parent_category == id });
    let categoryList = [];

    childCategories.forEach((o) => {

        o.label = o.categoryname;

        let items = getChildCategories(o.id, categories);
        o.content = items;
        o.to = "/#/category/" + o.id + "/";
        o.categoryId = o.id;
        categoryList.push(o)

        _.remove(categories, (l) => { return l.id == o.id });
    });

    return categoryList;
}

module.exports = {
    addOrUpdate,
    get,
    remove,
    getCategories
}