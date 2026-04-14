const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host:'localhost',
    user:'root',
    password:'camindo',
    database:'user',
    connectionLimit: 5
})

module.exports = pool;