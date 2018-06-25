const express = require('express');
const {MongoClient} = require('mongodb');
const adminRouter = express.Router();
const fs = require('fs');

var filename = "Course.out";
var new_courses = [];
var array = fs.readFileSync(filename).toString().split("\n");
var timeDict={'C':12,'D':13,'E':18,'F':19,'1':8,'2':9,'3':10,'4':11,'5':14,'6':15,'7':16,'8':17};
for (var i = 0; i < array.length; i++) {
    var line = array[i].replace(/ /g, " ").replace(/\t/g, " ");
    s = line.split(" ");
    var course = {};
    course['department'] = s[0];
    course['course_id'] = s[1];
    course['point'] = s[2] - '0';
    course['class'] = s[3];
    course['teacher'] = s[4];
    course['degree'] = s[5];
    course['time'] = s[6];
    course['place'] = s[7];
    course['level'] = s[8];
    switch (s[6][0]) {
        case '一':
            course['day'] = 1;
            break;
        case '二':
            course['day'] = 2;
            break;
        case '三':
            course['day'] =3;
            break;
        case '四':
            course['day'] = 4;
            break;
        case '五':
            course['day'] = 5;
            break;
    }
    course['start']=timeDict[s[6][1]];
    course['end']=timeDict[s[6][s[6].length-1]];
    new_courses.push(course);

}
//console.log(new_courses);

const courses = [
    {
        class: 'digitalSystem',
        teacher: 'LiaoWenHong',
        point: 3,
        time: 'MonD56',
        day: 1,
        start: 13,
        end: 15,
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
        end: 19,
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
        end: 15,
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
        end: 15,
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
        end: 11,
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
        end: 11,
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
        end: 15,
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
        end: 11,
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
        .get((req, res) => {
            (async function insertFakeUser() {
                const url = 'mongodb://localhost:27017';
                const dbName = 'courseApp';
                try {
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const coll = db.collection('users');
                    const rlt_insertFakeUsers = await coll.insertOne({studentID: 'course', password: 'selecting'});
                    res.json(rlt_insertFakeUsers);
                } catch (err) {
                    if (err)
                        console.log(err);
                }
            }());
        });
    adminRouter.route('/insertFakeCourses')
        .get((req, res) => {
            (async function insertFakeCourse() {
                const url = 'mongodb://localhost:27017';
                const dbName = 'courseApp';
                try {
                    const client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const coll = db.collection('courses');
                    const rlt_insertFakeCourses = await coll.insertMany(new_courses);
                    res.json(rlt_insertFakeCourses);
                } catch (err) {
                    if (err)
                        console.log(err);
                }
            }());
        })

    return adminRouter;
};

module.exports = router;
