const express = require('express');
const {MongoClient} = require('mongodb');
const value2name = {
    "integrated_general": "整開_通識",
    "minor_credited_internship": "輔系_學分學程_教學實習與實務",
    "service_PE_defenseEducation": "服務學習_體育_全民國防課程",
    "literature": "文學院",
    "science": "理學院",
    "society": "社科院",
    "law": "法學院",
    "commerce": "商學院",
    "foreign": "外文學院",
    "broadcast": "傳播學院",
    "international": "國際學院",
    "education": "教育學院",
    "integrated": "整開",
    "general": "通識",
    "minor": "輔系",
    "credited": "學分學程",
    "internship": "教學實習與實務",
    "service": "服務",
    "PE": "體育",
    "defenseEducation": "國防",
    "bachelor": "學士班",
    "master": "碩士班",
    "doctor": "博士班",
    "management": "管理學",
    "economics": "經濟學",
    "humanities": "人文通",
    "socialSciences": "社會通",
    "naturalSciences": "自然通",
    "trade": "貿輔",
    "accountingMin": "會輔",
    "japaneseMin": "日輔",
    "creativity": "創意學程",
    "patent": "專利學程",
    "artIndustry": "藝術產業經營學程",
    "intership": "教育實習與實務",
    "serviceCourse": "服務學習課程",
    "PErequired": "體育必修",
    "PEacquired": "體育選修",
    "PEschoolTeam": "體育代表隊",
    "defenseEducationCourse": "全民國防課程",
    "chinese": "中文系",
    "history": "歷史系",
    "philosophy": "哲學系",
    "chineseM": "中文所",
    "libraryInformation": "圖資所",
    "religion": "宗教所",
    "taiwanHistory": "台史所",
    "taiwanCulture": "台文所",
    "chineseTeaching": "華文教學博士",
    "psycology": "心理系",
    "mathematics": "應數系",
    "computerScience": "資科系",
    "nerve": "神經所",
    "physics": "應物所",
    "computerScienceM": "資科所",
    "societyAI": "社群與人智博士",
    "politicalScience": "政治學系",
    "sociology": "社會學系",
    "landEconomics": "地政學系",
    "laborResearch": "勞工研究所",
    "socialWork": "社會工作研究所",
    "epa": "行政管理碩士學程",
    'politicalSciencePHD': "政治學系",
    'sociologyPHD': "社會學系",
    'landEconomicsPHD': "地政學系",
    "money": "金融學系",
    "accounting": "會計學系",
    "mis": "資訊管理學系",
    "intellectualProperty": "智慧財產研究所",
    "mba": "企業管理研究所(MBA學位學程)",
    'technologyInnovationManagement': '科技管理研究所',
    'technologyInnovationIntellectualPropertyManagement': '科技管理與智慧財產研究所',
    'journalism': '新聞學系',
    'digitalContents': '數位內容碩士學位學程',
    'programCommunication': '傳播學院博士班',
    'english': '英國語文學系',
    'japanese': '日本語文學系',
    'linguistics': '語言學研究所',
    'lawU': '法律系',
    'lawM':'法律所',
    'diplomacy': '外交學系',
    'diplomacyM':'外交所',
    'educationU': '教育學系',
    'educationM':'教育所'
};
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
                            department: req.body.department[i]
                        };
                        query_arr[i] = query;
                    }
                    let rlt_findManyCourses = [];
                    rlt_findManyCourses = await coll.find({ $or: query_arr }).toArray();

                    res.render('course', {
                        academy: req.body.academy,
                        degree: req.body.degree,
                        department: req.body.department,
                        course: rlt_findManyCourses,
                        value2name:value2name
                    });
                }catch(err){
                    if(err)
                        console.log(err);
                }
            }());
        });

    return courseRouter;
};

module.exports = router;