
////////////connect mysql////////////////
const mysql = require("mysql");
const connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'aaa123',
	database:'courseSelectingDb'
});
connection.connect((err)=> {
	if (err) {
		console.log("mysql connect fail");
	}
	else {
		console.log("mysql connect success");
	}
})
//////////////////////////////////////////


/////////get course info from db//////////
var course = {};
var map = {};
map["一"] = 0;map["二"] = 1;map["三"] = 2;
map["四"] = 3;map["五"] = 4;map["六"] = 5;
map["日"] = 6;
map["A"] = 10;map["B"] = 11;
map["1"] = 12;map["2"] = 13;map["3"] = 14;map["4"] = 15;map["C"] = 16;map["D"] = 17;
map["5"] = 18;map["6"] = 19;map["7"] = 20;map["8"] = 21;map["E"] = 22;map["F"] = 23;map["G"] = 24;
var vector = [];
connection.query("select * from course",(err, rows, fields)=> {
	course = rows;
	for (i = 0; i < course.length; i++) {
		var temp = {};
		var ID = course[i].ID;
		temp[0] = Math.floor(ID / 100000000);
		temp[1] = Math.floor((ID % 100000000) / 1000000);
		temp[2] = map[(course[i].date)[0]];
		temp[3] = map[(course[i].date)[1]];
		vector.push(temp);
	}
});
//////////////////////////////////////////
var student;
var searchResult = [];
var finalSelect = [];

module.exports = {

	getStudent:function(ID,cb) {
		var str = "select * from student where ID =";
		connection.query("select * from student where ID = " + ID,
			(err,rows, fields)=> {
			student = rows;
			connection.query("delete from selected");//
			cb(rows);
		});
	},

	search:function(mcon, tcon, reNum, cb) {
		var score = [];
		for (i = 0; i < vector.length; i++) {
			var temp = [];
			temp[0] = 0;
			temp[1] = i;
			for (j = 0; j < mcon.length; j++) {
				var s = 0;
				if (vector[i][0] == mcon[j][0]) {
					s++;
					if (vector[i][1] == mcon[j][1]) {
						s+=2;
					}
				}
				if (s > temp[0]) {
					temp[0] = s;
				}
			}
			var s = 0;
			for (j = 0; j < 15; j++) {
				var temps = 1 /(1 + Math.abs(tcon[vector[i][2]][j] == 1 ? 10 + j - vector[i][3] : 20));
				if (temps > s) {
					s = temps;
				}
			}
			temp[0] += s;
			score.push(temp);
		}
		
		score.sort((a,b)=>{return b[0] - a[0]});
		for (i = 0; i < reNum; i++) {
			searchResult.push(course[score[i][1]]);
		}
		cb(searchResult);
	},

	selectCourse:function(cour,cb) {
		var str = "insert into selected values ?";
		var data = [];
		for (i = 0; i < cour.length; i++) {
			var temp = [];
			temp.push(student[0].ID);
			temp.push(cour[i][0].ID);
			temp.push(cour[i][1]);
			
			data.push(temp);
		}
		console.log(data);
		connection.query(str,[data], (err)=>{
			if (err) throw err;
			cb();
		});
	},

	getCourseTable:function(cb) {
		var str = "select course.ID, course.name,course.classroom, course.date from student, selected, course where student.ID = 104703100 and student.ID = selected.student_ID and selected.course_ID = course.ID order by priority DESC";
		connection.query(str ,(err, rows, fields)=> {
			console.log(rows);
		});
		
		
	}
};
