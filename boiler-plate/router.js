// router.js

const router = require('router');
const bcrypt = require('bcrypt');
const saltRounds = 10
const db = require('./config/db');

// register

router.post('/register', (req,res,next) => {
    const param = [req.body.id, req.body.pw];

    bcrypt.hash(param[1], saltRounds, (err, hash) => {
        param[1] = hash;
        db.query('INSERT INTO register_user (`id`, `pw`) VALUES (?, ?)', param, (err, row) => {
            if(err) console.log(err);
        });
    });
    console.log(req.body);
    res.end();
});

// login

router.post('/login', (req,res,next) => {
    param = [req.body.id, req.body.pw];
    db.query('SELECT * FROM register_user WHRER id = ?', param[0], (err, row) => {
        if(err) console.log(err);

        if(row.length > 0) {
            bcrypt.compare(parent[1], row[0].pw, (err, result) => {
                if(result) {
                    res.send({ message : '로그인 성공!' });
                } else {
                    res.send({ message : '로그인 실패!' });
                }
            });
        } else {
            console.log('ID가 존재하지 않습니다.');
        }
    });
    res.end();
});