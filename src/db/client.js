const { drizzle } = require('drizzle-orm/postgres-js');
const schema = require('./schema');

const db = drizzle('postgres://postgres:postgres@localhost:5432/cinco', {
    schema,
});

module.exports = { db };
