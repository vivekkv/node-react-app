module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    },
    pool: {
      min: 2, 
      max: 10
    },
    migrations: {
      directory: './server/data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/data/seeds'
    }
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './server/data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/data/seeds'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './server/data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/data/seeds'
    }
  }
};
