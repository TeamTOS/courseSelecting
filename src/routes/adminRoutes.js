const express = require('express');
const {MongoClient} = require('mongodb');
const adminRouter = express.Router();

const courses = [
    {
        class: 'digitalSystem',
        teacher: 'LiaoWenHong',
        point: 3,
        time: 'MonD56',
        day: 1,
        start: 13,
        end: 16,
        place: 'daRen301',
        academy: 'science',
        department: 'computerScience',
        degree: 'bachelor',
        level: 'required'
    },
    {
        class: 'civilLaw',
        teacher: 'YoungShuFen',
        point: 2,
        time: 'WedEFG',
        day: 3,
        start: 18,
        end: 20,
        place: 'daYong206',
        academy: 'law',
        department: 'lawU',
        degree: 'bachelor',
        level: 'acquired'
    },
    { 
        class: 'Management',
        teacher: 'ChouWenChin',
        point: 3,
        time: 'FriD56',
        day: 5,
        start: 13,
        end: 16,
        place: 'HsuehSi107',
        academy: 'commerce',
        department: 'accounting',
        degree: 'bachelor',
        level: 'acquired'
    },
    { 
        class: 'Java',
        teacher: 'ChenCzenChia',
        point: 3,
        time: 'FriD56',
        day: 5,
        start: 13,
        end: 16,
        place: 'daRen301',
        academy: 'science',
        department: 'computerScience',
        degree: 'bachelor',
        level: 'acquired'
    },
    {
        class: 'OS',
        teacher: 'HuYUJong',
        point: 3,
        time: 'Tue234',
        day: 2,
        start: 9,
        end: 12,
        place: 'daRen301',
        academy: 'science',
        department: 'computerScience',
        degree: 'bachelor',
        level: 'required'
    },
    {
        class: 'Computer Network',
        teacher: 'ChangHongChin',
        point: 3,
        time: 'Thu234',
        day: 4,
        start: 9,
        end: 12,
        place: 'daRen106',
        academy: 'science',
        department: 'computerScience',
        degree: 'bachelor',
        level: 'group'
    },
    {
        class: 'Chinese',
        teacher: 'WangJhenNon',
        point: 3,
        time: 'MonD56',
        day: 1,
        start: 13,
        end: 16,
        place: 'BaiNien113',
        academy: 'literature',
        department: 'chineseM',
        degree: 'master',
        level: 'general'
    },
    {
        class: 'Chinese poem',
        teacher: 'TzenWeiChieh',
        point: 3,
        time: 'Fri234',
        day: 5,
        start: 9,
        end: 12,
        place: 'Zitow203',
        academy: 'literature',
        department: 'chinese',
        degree: 'bachelor',
        level: 'general'
    }
];

const router = function () {

    // adminRouter.use((req, res, next) => {
    //     if (req.user) {
    //         next();
    //     } else {
    //         res.redirect('/');
    //     }
    // });
    adminRouter.route('/insertFakeUsers')
        .get( (req,res) => {
            (async function insertFakeUser(){
                const url = 'mongodb://localhost:27017';
                const dbName = 'courseApp';
                try{
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const coll = db.collection('users');
                    const rlt_insertFakeUsers = await coll.insertOne({studentID: 'course', password: 'selecting'});
                    res.json(rlt_insertFakeUsers);
                }catch(err){
                    if(err)
                        console.log(err);
                }
            }()); 
        });
    adminRouter.route('/insertFakeCourses')
        .get( (req,res) => {
            (async function insertFakeCourse(){
                const url = 'mongodb://localhost:27017';
                const dbName = 'courseApp';
                try{
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const coll = db.collection('courses');
                    const rlt_insertFakeCourses = await coll.insertMany(courses);
                    res.json(rlt_insertFakeCourses);
                }catch(err){
                    if(err)
                        console.log(err);
                }
            }());
        })
    
    return adminRouter;
};

module.exports = router;
