const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// app.use(morgan('combined'));
// app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'course', resave: 'true', saveUninitialized: 'true' }));
app.use(express.static(path.join(__dirname, '/public/')));
require('./src/config/passport.js')(app);

app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, './node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const authRouter = require('./src/routes/authRoutes')();
const indexRouter = require('./src/routes/indexRoutes')();
const courseRouter = require('./src/routes/courseRoutes')();
const curriculumRouter = require('./src/routes/curriculumRoutes')();
const adminRouter = require('./src/routes/adminRoutes')();

app.use('/auth', authRouter);
app.use('/index', indexRouter);
app.use('/course', courseRouter);
app.use('/curriculum', curriculumRouter);
app.use('/admin', adminRouter);
///////////////////////////////////
const mod = require('./backendSys.js');
//////////////////////////////////

/////////////////////////////backend API sample//////////////////////////

//////////////getStudent
//
//
///////////////////////

/////////////search
//
//search has three parameters:mainCondition, timeCondtition and retrival number

//here is a sample of search condition setting 
/*
var timeCon = [];
for (i = 0; i < 7; i++) {
	var temp = []
	for (j = 0; j < 15; j++) {
		temp.push(0);
	}
	timeCon.push(temp);
}
timeCon[0][9] = 1;
var mainCon = [];
mainCon.push([7, 03]);
mainCon.push([7, 01]);
*/	
//  mod.search(mainCon, timeCon, 10, (obj)=>{console.log(obj)});
//
////////////////////////

////////////selectCourse
//
//
/*
	mod.getStudent("104703100",(obj)=>{
		mod.search(mainCon, timeCon, 5, (obj)=>{
			console.log(obj);
			var cour = [];
			for (i = 0; i < obj.length; i++) {
				var temp = [];
				temp.push(obj[i]);
				temp.push(i);
				cour.push(temp);
			}
			mod.selectCourse(cour, ()=>{
				console.log("done");
			});
		});
	});
*/
/////////////////////////

app.get('/', (req, res) => {
    res.render('login');
});

app.listen(port, () => {
    debug(`Running on port ${chalk.green(port)}`);
    console.log(`Running on port ${chalk.green(port)}`);
});
