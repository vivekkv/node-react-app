exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.uuid('id').primary();
        table.string('username').unique();
        table.string('password');
        table.boolean('active')
        table.timestamps();
    }).createTable('category', function (table) {
        table.uuid('id').primary();
        table.integer('parent_category');
        table.string('categoryname');
        table.string('description');
        table.timestamps();
    }).createTable('product', function (table) {
        table.uuid('id').primary();
        table.integer('category_id');
        table.string('name');
        table.string('description');
        table.timestamps();
    }).createTable('features', function (table) {
        table.uuid('id').primary();
        table.integer('product_id');
        table.string('description');
        table.timestamps();
    }).createTable('poduct_detail', function (table) {
        table.uuid('id').primary();
        table.integer('product_id');
        table.string('description');
        table.timestamps();
    }).createTable('capacity', function (table) {
        table.uuid('id').primary();
        table.integer('product_id');
        table.integer('capacity');
        table.timestamps();
    }).createTable('suitableFor', function (table) {
        table.uuid('id').primary();
        table.integer('product_id');
        table.string('description');
        table.timestamps();
    }).createTable('videos', function (table) {
        table.uuid('id').primary();
        table.integer('product_id');
        table.string('path');
        table.string('description');
        table.timestamps();
    }).createTable('images', function (table) {
        table.uuid('id').primary();
        table.integer('product_id');
        table.string('path');
        table.string('description');
        table.timestamps();
    }).createTable('contact', function (table) {
        table.uuid('id').primary();
        table.string('name');
        table.string('email');
        table.string('phone');
        table.string('message');
        table.timestamps();
    }).createTable('ratings', function (table) {
        table.uuid('id').primary();
        table.string('name');
        table.string('email');
        table.string('remarks');
        table.integer('rating');
        table.integer('product_id');
        table.timestamps();
    }).createTable('landingPage', function (table) {
        table.uuid('id').primary();
        table.string('type');
        table.string('value');
        table.string('additionalInfo');
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {

};