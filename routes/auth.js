const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const saltRounds = 6;
const models = require('../models');

router.post('/register', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    if(!login || !password || !passwordConfirm){
        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены',
            fields: ['login', 'password', 'passwordConfirm']
        });
    }else if (password != passwordConfirm){
        res.json({
            ok: false,
            error: 'Пароли не совпадают!',
            fields: ['password', 'passwordConfirm']
        });
    } else {
        models.User.findOne({
            login
        }).then(user => {
            if(!user){
                // bcrypt.hash(password, saltRounds, (err, hash) => {
                    models.User.create({
                        login,
                        password
                    }).then(user => {
                        req.session.userId = user._id;
                        req.session.userLogin = user.login;
                        console.log(user);
                        res.json({
                            ok: true
                        });
                    }).catch(err => {
                        console.log(err);
                        res.json({
                            ok: false,
                            error: 'Ошибка'
                        });
                    });
                //   });
            }else {
                res.json({
                    ok: false,
                    error: 'Имя занято',
                    fields: ['login']
                });
            };
        });

        
    }
});

router.post('/login', (req, res) => {
    const login = req.body.login;
    const password =req.body.password;

    if(!login || !password){
        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены',
            fields: ['login', 'password']
        });
    }else {
        models.User.findOne({
            login
        }).then(user => {
            if(!user){
                res.json({
                    ok: false,
                    error: 'Логин или пароль не верны'
                });
            }else{

                if(password !== user.password){
                    res.json({
                        ok: false,
                        error: 'Ошибка'
                })}else {
                    req.session.userId = user._id;
                    req.session.userLogin = user.login;
                    res.json({
                        ok: true
                })}
                // bcrypt.compare(password, user.password, (err, res) => {
                //     if(!res){
                //         console.log(res);                                    Чогось в bcrypt json не працює 
                //     }else{
                //         req.session.userId = user._id;
                //         req.session.userLogin = user.login;
                //         console.log(res);
                            // res.json({
                            // ok: true
                //     }
                // });
            }
        }).catch(err => {
            console.log(err);
            res.json({
                ok: false,
                error: 'Ошибка'
            });
        });
    }

});

//Logout
router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(() => {
            res.redirect('/');
        });
    }else {
        res.redirect('/');
    }
});

module.exports = router;