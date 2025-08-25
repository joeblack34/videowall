var express = require("express");
var cors = require("cors")

var app = express();
app.use(cors())
var router = express.Router();
var path = __dirname + '/app/'; // source code directory
var bodyParser = require("body-parser");

var CasparCG = require("caspar-cg");
ccg = new CasparCG("localhost", 5250);

// "C:\Program Files\nodejs\node.exe" server


router.get("/", function (req, res) { // 
	res.render("index");
});

router.get("/utro", function (req, res) { // 
	res.render("index_utro");
});


//Start Запуск команд для видеостены без текста
router.post("/play_wall", function (req, res) { // 

	let name = req.body.name;
	let fullName = req.body.fullName;
	let format = req.body.format;
	let index = req.body.index;
	let text = req.body.text;
	let textBottom = req.body.textBottom;
	let nameDateFolder = req.body.nameDateFolder;

	ccg.connect(function () {

		if ((format == "mov" || format == "mxf") && index == 0) {

			var clearAll1 = `CLEAR 1`;
			var clearAll2 = `CLEAR 2`;
			ccg.sendCommand(clearAll1);
			ccg.sendCommand(clearAll2);

			var playVideo1 = `PLAY 2-1 ${name} LOOP 1`;
			var playVideo2 = `PLAY 1-${index} ${name} LOOP 1`;
			ccg.sendCommand(playVideo1);

			setTimeout(() => {

				ccg.sendCommand(playVideo2);
			}, 1200);
		} else if (index == 1 && format != "mov") {
			if (text == "") {
				var screenCommand = `ADD 2 IMAGE "../template/Snapshot"`;
				var playTemplate = `CG 1-${index} ADD 1 "PICTURETOPICTURE(ЭТАЛОН)" 1 "{\\"f0\\":\\"${fullName}\\",\\"f5\\":\\"${nameDateFolder}\\"}"`;
				ccg.sendCommand(screenCommand);

				setTimeout(() => {

					ccg.sendCommand(playTemplate);
				}, 1000);
			} else {
				var screenCommand = `ADD 2 IMAGE "../template/Snapshot"`;
				var playTemplate = `CG 1-${index} ADD 1 "pictureToPicture(с текстом)" 1 "{\\"f0\\":\\"${fullName}\\",\\"f1\\":\\"${text}\\",\\"f2\\":\\"${textBottom}\\",\\"f5\\":\\"${nameDateFolder}\\"}"`;
				ccg.sendCommand(screenCommand);
				setTimeout(() => {
					ccg.sendCommand(playTemplate);
				}, 1000);
			}
		} else if (index > 1 && (format == "jpg" || format == "png")) {
			if (text == "") {
				var screenCommand = `ADD 2 IMAGE "../template/Snapshot"`;
				var playTemplate = `CG 1-${index} ADD 1 "PICTURETOPICTURE(ЭТАЛОН)" 1 "{\\"f0\\":\\"${fullName}\\",\\"f5\\":\\"${nameDateFolder}\\"}"`;
				ccg.sendCommand(screenCommand);

				setTimeout(() => {

					ccg.sendCommand(playTemplate);
				}, 1000);
			} else {
				var screenCommand = `ADD 2 IMAGE "../template/Snapshot"`;
				var playTemplate = `CG 1-${index} ADD 1 "pictureToPicture(с текстом)" 1 "{\\"f0\\":\\"${fullName}\\",\\"f1\\":\\"${text}\\",\\"f2\\":\\"${textBottom}\\",\\"f5\\":\\"${nameDateFolder}\\"}"`;
				ccg.sendCommand(screenCommand);
				setTimeout(() => {
					ccg.sendCommand(playTemplate);
				}, 1000);
			}
		} else {
			//алгоритм

			//скрин первого канала
			var screenCommand = `ADD 1 IMAGE "../template/Snapshot"`;
			ccg.sendCommand(screenCommand);

			//запуск видео на втором в паузе
			let playVideo2 = `PLAY 2-1 ${name} LOOP 1`;
			let stopVideo2 = `PAUSE 2-1`;
			ccg.sendCommand(playVideo2);
			ccg.sendCommand(stopVideo2);

			//скрин второго канала
			var screenCommand2 = `ADD 2 IMAGE "../template/Snapshot2"`;
			setTimeout(() => {
				ccg.sendCommand(screenCommand2);
			}, 400);


			//плей проекта	
			var playTemplate = `CG 1-${index} ADD 1 "PICTURETOVIDEO" 1`;
			setTimeout(() => {
				ccg.sendCommand(playTemplate);
			}, 1400);


			let playVideo3 = `PLAY 2-1 ${name} LOOP 1`;
			setTimeout(() => {
				ccg.sendCommand(playVideo3);
			}, 1950);

			//видео на верхнем слое плей
			playVideo2 = `PLAY 1-${index} ${name} LOOP 1`;
			setTimeout(() => {
				ccg.sendCommand(playVideo2);
			}, 2950);
		}
	});

	res.json("ok")
});
//End Запуск команд для видеостены без текста

router.post("/playvideo", function (req, res) { // 

	let name = req.body.name;

	ccg.connect(function () {
		var clearAll1 = `CLEAR 1`;
		ccg.sendCommand(clearAll1);

		var playVideo = `PLAY 1-1 ${name} LOOP 1`;
		ccg.sendCommand(playVideo);
	});

	res.json("ok")
});

router.post("/play_utro", function (req, res) { // 
	let countImage = req.body.inputs;

	function go (index = 0) {
		// do whatever you need to do for the current index.
		//console.log(countImage[index]);
		
		var playTemplate = `CG 1-${index + 3} ADD 1 "utro_wall" 1 "{\\"f0\\":\\"${countImage[index].fullName}\\"}"`;
		ccg.sendCommand(playTemplate);
		// if we haven't reached the end set a timeout
		// to call this function again with the next index.
		if (countImage.length > index + 1) {
		  setTimeout(() => go(index + 1), 3500);
		}
	  }
	  go();
	res.json("ok")
});
//End Запуск команд для видеостены без текста

// Start Очистка платы
router.post("/clear_wall", function (req, res, next) {
	ccg.connect(function () {

		var clearAll1 = `CLEAR 1`;
		var clearAll2 = `CLEAR 2`;
		ccg.sendCommand(clearAll1);
		ccg.sendCommand(clearAll2);

	});
	res.json("ok")
})
// End Очистка платы

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(express.static('node_modules'))
app.use(express.static('public'))

app.use("/", router);

app.use("*", function (req, res) {
	res.sendFile(path + "404.html");
});

app.listen(3000, function () {
	console.log("Live at Port 3000");
});