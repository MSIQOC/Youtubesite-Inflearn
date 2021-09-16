const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

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
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})


module.exports = router;
