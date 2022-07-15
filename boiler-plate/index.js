// index.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const dbconfig = require('./config/db');
const con = mysql.createConnection(dbconfig);

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin : true,
    credentials : true
}));

app.use(cookieParser());

app.use(session({
    key: "loginData",
    secret: "estSecret",
    resave : false,
    saveUninitialized : false,
    cookie : {
        expires : 60 * 60 * 24,
    },
}));

app.use(cors({
    origin : true,
    credentials : true
}));

const port = 3000;

app.get('/', (req,res) => res.send('Running Server!'));

app.get('/users', (req, res) => {
    con.query('SELECT * FROM register_user', (error, rows) => {
        if(error) throw error;
        console.log('User info is : ', rows);
        res.send(rows);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));