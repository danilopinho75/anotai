const mysql = require('mysql2');

const client = mysql.createPool(process.env.CONNECTION_STRING)

module.exports = client.promise();