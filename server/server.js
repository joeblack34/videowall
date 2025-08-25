require("dotenv").config();
const express = require("express");
const cors = require("cors");

const multer = require("multer");
const app = express();
app.use(cors());
const router = express.Router();
const bodyParser = require("body-parser");

const CasparCG = require("caspar-cg");
const ccg = new CasparCG("localhost", 5250);

// Функция будет фильтровать файлы, чтобы быть уверенными что загружают только фото
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

// Создаем хранилище. Просто некая папка, в которую потом можно будет стучать из вне.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.FOLDER_MEDIA);
    },
    filename: (req, file, cb) => {
        cb(null, `${decodeURIComponent(file.originalname)}`);
        decodeURIComponent;
    },
});

// И storage и fileFilter необязательны
const upload = multer({ storage: storage, fileFilter: imageFilter });

// Тут мы говорим что будем брать только один файл с поля `image`
app.post("/upload-image", upload.single("formFileImg"), (req, res) => {
    res.send(req.file); //  Тут все данные по файлу, он уже сохранен на диск
});

router.post("/play_video", function (req, res) {
    //Начало данные с фронта
    const { ind, videoName } = req.body;
    //Конец данные с фронта

    ccg.connect(function () {
        //Начало запуска видео на двух канала на медиасервере
        if (ind == 0) {
            const clearAll1 = `CLEAR 1`;
            const clearAll2 = `CLEAR 2`;
            ccg.sendCommand(clearAll1);
            ccg.sendCommand(clearAll2);
            const playVideo1 = `PLAY 2-1 VIDEO/${videoName} LOOP 1`;
            const playVideo2 = `PLAY 1-${ind} VIDEO/${videoName} LOOP 1`;
            ccg.sendCommand(playVideo1);

            setTimeout(() => {
                ccg.sendCommand(playVideo2);
            }, 1200);

            setTimeout(function () {
                ccg.disconnect();
            }, 1500);
        }
        //Начало запуска видео на двух канала на медиасервере
        if (ind == 1) {
            const screenCommand = `ADD 1 IMAGE "../template/Snapshot"`;
            ccg.sendCommand(screenCommand);

            //запуск видео на втором в паузе
            let playVideo2 = `PLAY 2-1 VIDEO/${videoName} LOOP 1`;
            let stopVideo2 = `PAUSE 2-1`;
            ccg.sendCommand(playVideo2);
            ccg.sendCommand(stopVideo2);

            //скрин второго канала
            const screenCommand2 = `ADD 2 IMAGE "../template/Snapshot2"`;
            setTimeout(() => {
                ccg.sendCommand(screenCommand2);
            }, 100);

            //плей проекта
            const playTemplate = `CG 1-99 ADD 1 "PICTURETOVIDEO" 1`;
            setTimeout(() => {
                ccg.sendCommand(playTemplate);
            }, 1000);

            // let playVideo3 = `PLAY 2-1 VIDEO/${videoName} LOOP 1`;
            // setTimeout(() => {
            //   ccg.sendCommand(playVideo3);
            // }, 1950);

            //видео на верхнем слое плей
            playVideo2 = `PLAY 1-99 VIDEO/${videoName} LOOP 1`;
            setTimeout(() => {
                ccg.sendCommand(playVideo2);
            }, 2550);

            setTimeout(function () {
                ccg.disconnect();
            }, 2700);
        }
    });

    res.json(ind);
});

// //Start Запуск команд для видеостены без текста
router.post("/play_image", function (req, res) {
    //
    const { index, fullName, textTop, textBottom } = req.body.item;
    const curIndex = req.body.curIndex;

    ccg.connect(function () {
        //Начало запуска видео на двух канала на медиасервере
        if (curIndex == 0) {
            if (textTop == "") {
                const screenCommand = `ADD 2 IMAGE "../template/Snapshot"`;
                const playTemplate = `CG 1-${index} ADD 1 "PICTURETOPICTURE(ЭТАЛОН_REACT)" 1 "{\\"f0\\":\\"${fullName}\\"}"`;
                ccg.sendCommand(screenCommand);

                setTimeout(() => {
                    ccg.sendCommand(playTemplate);
                }, 1000);
            } else {
                const screenCommand = `ADD 2 IMAGE "../template/Snapshot"`;
                const playTemplate = `CG 1-${index} ADD 1 "pictureToPicture(с текстом)" 1 "{\\"f0\\":\\"${fullName}\\",\\"f1\\":\\"${textTop}\\",\\"f2\\":\\"${textBottom}\\"}`;
                ccg.sendCommand(screenCommand);
                setTimeout(() => {
                    ccg.sendCommand(playTemplate);
                }, 1000);
            }
        } else {
            if (textTop == "") {
                const screenCommand = `ADD 1 IMAGE "../template/Snapshot"`;
                const playTemplate = `CG 1-${index} ADD 1 "PICTURETOPICTURE(ЭТАЛОН_REACT)" 1 "{\\"f0\\":\\"${fullName}\\"}"`;
                ccg.sendCommand(screenCommand);

                setTimeout(() => {
                    ccg.sendCommand(playTemplate);
                }, 1000);
            } else {
                const screenCommand = `ADD 1 IMAGE "../template/Snapshot"`;
                const playTemplate = `CG 1-${index} ADD 1 "pictureToPicture(с текстом)" 1 "{\\"f0\\":\\"${fullName}\\",\\"f1\\":\\"${textTop}\\",\\"f2\\":\\"${textBottom}\\"}`;
                ccg.sendCommand(screenCommand);

                setTimeout(() => {
                    ccg.sendCommand(playTemplate);
                }, 1000);
            }
        }
        setTimeout(function () {
            ccg.disconnect();
        }, 1300);
    });

    res.json(index);
});

router.post("/play_utro", function (req, res) {
    let images = req.body.imagesUtro;

    ccg.connect(function () {
        function go(index = 0) {
            // do whatever you need to do for the current index.
            //console.log(countImage[index]);

            var playTemplate = `CG 1-${index + 3} ADD 1 "utro_wall" 1 "{\\"f0\\":\\"${images[index].fullName}\\"}"`;
            ccg.sendCommand(playTemplate);
            // if we haven't reached the end set a timeout
            // to call this function again with the next index.
            if (images.length > index + 1) {
                setTimeout(() => go(index + 1), 3500);
            }
        }
        go();
    })
    res.json("ok");
});

// Start Очистка платы
router.post("/clear", function (req, res, next) {
    ccg.connect(function () {
        const clearAll1 = `CLEAR 1`;
        const clearAll2 = `CLEAR 2`;
        ccg.sendCommand(clearAll1);
        ccg.sendCommand(clearAll2);
        setTimeout(function () {
            ccg.disconnect();
        }, 500);
    });
    res.json("ok");
});
// End Очистка платы

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/", router);

app.listen(5001, function () {
    console.log("Live at Port 5001");
});
