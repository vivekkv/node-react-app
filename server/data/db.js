var knexfile  = require('../../knexfile');
var knex      = require('knex')(knexfile['development']);

knex.on('query', function(query) {
    if(process.env.NODE_ENV == 'development') {
        console.log(query); 
    }
});

module.exports = knex;