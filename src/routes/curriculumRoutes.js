const express = require('express');
const {MongoClient} = require('mongodb');

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

            res.send('This is curriculum GET');
            // res.render('curriculum', {
            //     weekday: weekday
            // });
        })
        .post( (req,res) => {
            // res.send(req.body.class);
            (async function findSpecifiedCourses(){
                const url = 'mongodb://localhost:27017';
                const dbName = 'courseApp';
                try{
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const coll = db.collection('courses');
                    let query_arr = [];
                    for(let i=0; i< req.body.class.length; i++){
                        let query = {
                            class: req.body.class[i]
                        };
                        query_arr[i] = query;
                    }
                    const rlt_findSpecifiedCourses = await coll.find({ $or: query_arr }).toArray();
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