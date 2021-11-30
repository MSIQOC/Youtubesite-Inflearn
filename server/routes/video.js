const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { Subscriber } = require('../models/Subscriber');

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

router.post('/uploadVideo', (req, res) => {
    
    // 비디오를 정보들을 저장한다.
    const video = new Video(req.body) // req.body: 클라이언트쪽에서 받은 모든 정보(variables)가 여기에 담긴다.
    video.save((err, doc)=> {  // 몽고DB에 저장
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    }) 
})
router.post('/getSubscriptionVideos', (req, res) => {
    
    // 자신의 아이디를 가지고 구독하는 사람들을 찾는다.
    Subscriber.find({ userFrom: req.body.userFrom })
        .exec(( err, subscriberInfo ) => { //subscriberInfo 안에 userTo, userFrom이 들어있다.
            if(err) return res.status(400).send(err)

            let subscribedUser = []

            subscriberInfo.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo) //subscribedUser 안에 userTo의 정보들이 다 들어가있게 된다. (내가 구독한 사람)
            })

            // 찾은 사람들의 비디오를 가지고 온다. ($in을 사용해서 내가 구독한 사람들의 정보를 모두 가져올 수 있다.)
            Video.find({ writer : { $in: subscribedUser } }) //req.body.id는 구독자가 한명일 때 가능한 일. 여기선 새로운 메소드를 사용해야한다. ($in)
            .populate('writer')  //writer의 다른 정보들을 가져오기 위해 populate 해준다.
            .exec((err, videos) => {
                if(err) return res.status(400).send(err)
                res.status(200).json({ success: true, videos })
            })
        })
})

router.get('/getVideos', (req, res) => {
    
    // 비디오를 DB에서 가져와서 클라이언트에 보낸다.
    Video.find() // 비디오 콜렉션 안의 모든 비디오 가져오기
        .populate("writer") // populate을 해줘야 모든 writer 정보 가져오기 가능. 안해주면 writer의 id만 가져오기 가능.
        .exec((err, videos) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success:true, videos })
        })
})

router.post("/getVideoDetail", (req, res) => {

    // 몽구스를 사용할 경우 기존 강의대로 하면 videoId를 못찾기 때문에 다음과 같이 수정해줘야한다.
    let ObjectId = require('mongoose').Types.ObjectId;
    let videoId = req.body.videoId;	//req.body.videoId는 클라이언트에서 보낸 비디오 아이디를 넣어서 아이디를 이용해서 비디오를 찾겠다는 뜻.
    Video.findOne({"_id": new ObjectId(videoId)})
        .populate("writer") //이걸 해줌으로써 writer에 대한 모든 정보를 가져오는게 가능하다.
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, videoDetail})
        })
    
});

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
