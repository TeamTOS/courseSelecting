const express = require('express');
const {MongoClient} = require('mongodb');

const courseRouter = express.Router();
const router = function () {
    courseRouter.use((req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    });
    courseRouter.route('/')
        .get((req, res) => {
            (async function findAllCourses(){
                const url = 'mongodb://localhost:27017';
                const dbName = 'courseApp';
                try{
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const coll = db.collection('courses');
                    const rlt_findAllCourses = await coll.find().toArray();
                    res.json(rlt_findAllCourses);
                }catch(err){
                    if(err)
                        console.log(err);
                }
            }());
        })
        .post((req, res) => {
            // res.send(req.body);
            (async function findManyCourses(){
                const url = 'mongodb://localhost:27017';
                const dbName = 'courseApp';
                try{
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const coll = db.collection('courses');
                    if(typeof(req.body.academy) == 'string'){
                        req.body.academy = [req.body.academy];
                        req.body.degree = [req.body.degree];
                        req.body.department = [req.body.department];
                    }
                    
                    let query_arr = [];
                    for(let i=0; i< req.body.academy.length; i++){
                        let query = {
                            department: req.body.department[i]
                        };
                        query_arr[i] = query;
                    }
                    let rlt_findManyCourses = [];
                    rlt_findManyCourses = await coll.find({ $or: query_arr }).toArray();

                    res.render('course', {
                        academy: req.body.academy,
                        degree: req.body.degree,
                        department: req.body.department,
                        course: rlt_findManyCourses
                    });
                }catch(err){
                    if(err)
                        console.log(err);
                }
            }());
        });

    return courseRouter;
};

module.exports = router;