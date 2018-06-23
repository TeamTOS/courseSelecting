const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();
const router = function () {
    authRouter.route('/signUp')
        .post((req, res) => {
            const { studentID, password } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'courseApp';

            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    console.log('connected correctly');

                    const db = client.db(dbName);

                    const col = db.collection('users');
                    const user = {
                        studentID, password
                    };
                    const results = await col.insertOne(user);
                    console.log(results);
                    req.login(results.ops[0], () => {
                        res.redirect('/index');
                    });
                } catch (err) {
                    console.log(err);
                }
            }());
        });

    authRouter.route('/login')
        .post(passport.authenticate('local', {
            successRedirect: '/index',
            failureRedirect: '/'
        }));

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
};
module.exports = router;
