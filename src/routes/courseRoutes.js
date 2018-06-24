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
                            department: req.body.department[i], 
                            degree: req.body.degree[i]
                        };
                        query_arr[i] = query;
                    }
                    let rlt_findManyCourses = [];
                    rlt_findManyCourses = await coll.find({ $or: query_arr }).toArray();
                    
                    // const color = {
                    //     literature: 'black',
                    //     science:'brown',
                    //     society:'red',
                    //     law:'orange',
                    //     commerce:'yellow',
                    //     foreign:'green',
                    //     broadcast:'blue',
                    //     international:'violet',
                    //     education:'grey'
                    // };
                    
                    // let academy = req.body.academy;
                    // for(let i =0; i<academy.length; i++){
                    //     switch(academy[i]){
                    //     case 'literature':
                    //         academy[i].color = 'black';
                    //         break;
                    //     case 'science':
                    //         academy[i].color = 'brown';
                    //         break;
                    //     case 'society':
                    //         academy[i].color = 'red';
                    //         break;
                    //     case 'law':
                    //         academy[i].color = 'orange';
                    //         break;
                    //     case 'commerce':
                    //         academy[i].color = 'yellow';
                    //         break;
                    //     case 'foreign':
                    //         academy[i].color = 'green';
                    //         break;
                    //     case 'broadcast':
                    //         academy[i].color = 'blue';
                    //         break;
                    //     case 'international':
                    //         academy[i].color = 'violet';
                    //         break;
                    //     case 'education':
                    //         academy[i].color = 'grey';
                    //         break;
                    //     }
                    //     console.log(academy[i].color); 
                    // }

                    res.render('course', {
                        // color: color,
                        academy: req.body.academy,
                        degree: req.body.degree,
                        department: req.body.department,
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
// <%if(i==0){%>
//     <td style="background-color: yellow;"></td>
// <%}else if(i==1){%>
//     <td style="background-color: grey;"></td>
// <%}else if(i==2){%>
//     <td style="background-color: violet;"></td>
// <%}%>