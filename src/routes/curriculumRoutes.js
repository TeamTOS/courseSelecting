const express = require('express');

const allCurriculum = [
    {
        class: 'OS',
        time: 'Tue234'
    },
    {
        class: 'Java',
        time: 'FriD56'
    }
];

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
            res.render(
                'curriculum',
                {
                    curriculum: allCurriculum
                }
            );
        });

    return curriculumRouter;
};
module.exports = router;
