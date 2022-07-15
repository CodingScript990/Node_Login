// db

const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'test1234',
    database : 'react_login'
});

db.connect();

db.query('SELECT * FROM register_user', (error, rows, fields) => {
    if(error) throw error;
    console.log('User info is : ', rows);
});

module.exports = db;