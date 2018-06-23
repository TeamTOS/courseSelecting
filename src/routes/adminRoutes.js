const express = require('express');
const {MongoClient} = require('mongodb');
const adminRouter = express.Router();

const courses = [
    {
        class: 'Java',
        teacher: 'ChenCzenChia',
        point: 3,
        time: 'FriD56',
        place: 'daRen301',
        department: 'computerScience',
        degree: 'bachelor',
        level: 'acquired'
    },
    {
        class: 'OS',
        teacher: 'HuYUJong',
        point: 3,
        time: 'Tue234',
        place: 'daRen301',
        department: 'computerScience',
        degree: 'bachelor',
        level: 'required'
    },
    {
        class: 'Computer Network',
        teacher: 'ChangHongChin',
        point: 3,
        time: 'Thu234',
        place: 'daRen106',
        department: 'computerScience',
        degree: 'bachelor',
        level: 'group'
    },
    {
        class: 'Chinese',
        teacher: 'WangJhenNon',
        point: 3,
        time: 'MonD56',
        place: 'BaiNien113',
        department: 'chineseM',
        degree: 'master',
        level: 'general'
    },
    {
        class: 'Chinese poem',
        teacher: 'TzenWeiChieh',
        point: 3,
        time: 'Fri234',
        place: 'Zitow203',
        department: 'chinese',
        degree: 'bachelor',
        level: 'general'
    }
];

const router = function () {

    adminRouter.use((req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
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
