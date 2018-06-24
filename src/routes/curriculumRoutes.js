const express = require('express');


const curriculumRouter = express.Router();
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
            res.render('curriculum');
        })
        .post( (req,res) => {
            res.send(req.body);
        })

    return curriculumRouter;
};
module.exports = router;
