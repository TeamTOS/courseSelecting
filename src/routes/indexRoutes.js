const express = require('express');

const indexRouter = express.Router();

const academy = ['-', 'integrated_general', 'minor_credited_internship', 'service_PE_defenseEducation', 'literature', 'science', 'society', 'law', 'commerce', 'foreign','broadcast','international','education'];
const degree = ['-', '學士班', '碩士班', '博士班'];
const department = [['-'], ['資科系'], ['中文系'], ['社會系'], ['法律系'], ['金融系'], ['歐語系'], ['新聞系'], ['外交系'], ['教育系']];

const router = function () {
    indexRouter.use((req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    });
    indexRouter.route('/')
        .get((req, res) => {
            res.render(
                'index',
                {
                    title: 'NCCU course system',
                    nav: [{ link: '/course', title: 'course' }, { link: '/curriculum', title: 'curriculum' }],
                    college: [academy]
                }
            );
        })
        .post( (req,res) => {
            res.render(
                'index',
                {
                    title: 'NCCU course system',
                    nav: [{ link: '/course', title: 'course' }, { link: '/curriculum', title: 'curriculum' }],
                    college: [academy, department]
                }
            )
        });
    return indexRouter;
};
module.exports = router;
