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
                    let rlt_findManyCourses = [];
                    if(typeof(req.body.department) == 'string')
                        rlt_findManyCourses = await coll.find({department: req.body.department, degree: req.body.degree}).toArray();
                    else{
                        let query_arr = [];
                        for(let i=0; i< req.body.department.length; i++){
                            let query = {
                                department: req.body.department[i], 
                                degree: req.body.degree[i]
                            };
                            query_arr[i] = query;
                        }
                        rlt_findManyCourses = await coll.find({ $or: query_arr }).toArray();
                    }
                    // res.json(rlt_findManyCourses);
                    res.render('course', {
                        course: rlt_findManyCourses
                    }
                    );
                }catch(err){
                    if(err)
                        console.log(err);
                }
            }());
        });

    return courseRouter;
};

module.exports = router;
