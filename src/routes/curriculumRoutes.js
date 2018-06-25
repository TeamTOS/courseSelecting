const express = require('express');
const {MongoClient} = require('mongodb');
const objectId = require('mongodb').ObjectID;

const curriculumRouter = express.Router();

const weekday = ['星期一','星期二','星期三','星期四','星期五'];

const router = function () {
    curriculumRouter.use((req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    });
    curriculumRouter.route('/')
        .get((req, res) => {
            (async function findSingleCurriculum(){
                const url = 'mongodb://localhost:27017';
                const dbName = 'courseApp';
                try{
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const coll = db.collection('curriculums');
                    const rlt_findSingleCurriculum = await coll.find({studentID: req.user.studentID}).toArray();
                    res.render('curriculum', {
                        weekday: weekday,
                        course: rlt_findSingleCurriculum
                    })
                }catch(err){
                    if(err)
                        console.log(err);
                }
            }());
        })
        .post( (req,res) => {
            // res.send(req.body.class);
            (async function findSpecifiedCourses(){
                const url = 'mongodb://localhost:27017';
                const dbName = 'courseApp';
                try{
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    let coll = db.collection('courses');
                    let query_arr = [];
                    let rlt_findSpecifiedCourses;
                    if(typeof(req.body.checkboxQuery) == 'string')
                        rlt_findSpecifiedCourses = await coll.find({ course_id: req.body.checkboxQuery }).toArray();
                    else{
                        for(let i=0; i< req.body.checkboxQuery.length; i++){
                            let query = {
                                course_id: req.body.checkboxQuery[i]
                            };
                            query_arr[i] = query;
                        }
                        rlt_findSpecifiedCourses = await coll.find({ $or: query_arr }).toArray();
                    }   

                    for(let i=0; i< rlt_findSpecifiedCourses.length; i++){
                        rlt_findSpecifiedCourses[i].studentID = req.user.studentID;
                    }
                    coll = db.collection('curriculums');
                    const rlt_insertSingleCurriculum = await coll.insertMany( rlt_findSpecifiedCourses);
                    
                    res.render('curriculum', {
                        weekday: weekday,
                        course: rlt_findSpecifiedCourses    
                    })
                }catch(err){
                    if(err)
                        console.log(err);
                }
            }());
        })


    return curriculumRouter;
};
module.exports = router;