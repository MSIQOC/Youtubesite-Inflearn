const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg")

let storage = multer.diskStorage({
    destination: (req, file, cb) => { //업로드를 하면 uploads라는 폴더에 모든게 다 저장된다.
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // 저장할 때 어떤 파일 이름으로 저장될지.
    }, // ex: 122001309139_hello
    fileFilter: (req, file, cb) => {
        if(ext !== '.mp4') { // mp4만 될 수 있다고 해둠.
            return cb(res.status(400).end('only jpg, png, mp4 is allowed', false));
        }
        cb(null, true)
    }
});

// 파일은 하나만 할 수 있게 해둔다.
const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err })
        }
        // 여기에서 url을 file의 path로 넘겨준듯.
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성 하고 비디오 러닝타임도 가져오기
    
    let filePath = ""
    let fileDuration = ""

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    //썸네일 생성
    ffmpeg(req.body.url) // 클라이언트에서 온 비디오 저장 경로를 말한다. (uploads를 뜻한다.)
        .on('filenames', function (filenames) { // 비디오 썸네일 filename을 생성한다.
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () { // 썸네일을 생성하고 무엇을 할 것인지
            console.log('Screenshots taken');
            // 여기에서 url로 안하고 urll로 하면 VideoUploadPage.js로 제대로 안넘어간다.
            //res.json의 url:... 같은 것들은 클라쪽으로 값을 넘기기 위한 것이란걸 알 수 있다.
            return res.json({ success: true, url: thumbsFilePath, fileDuration: fileDuration})
        })
        .on('error', function (err) { // 에러가 났을 경우 어떻게 할지
            console.error(err)
            return res.json({ success: false, err })
        })
        .screenshots({ // 옵션을 주기
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3, // 3개의 썸네일을 찍을 수 있다.
            folder: 'uploads/thumbnails', // uploads 폴더 안에 thumbnails 폴더 안에 썸네일이 저장된다.
            size:'320x240', //썸네일 사이즈
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
})

module.exports = router;
