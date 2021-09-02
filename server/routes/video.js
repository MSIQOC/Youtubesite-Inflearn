const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
//import { auth } from "../middleware/auth";
//import multer from 'multer'
const multer = require("multer");
const { default: VideoUploadPage } = require('../../client/src/components/views/VideoUploadPage/VideoUploadPage.js');
//import { default: VideoUploadPage } from '../../client/src/components/views/VideoUploadPage/VideoUploadPage';

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); //업로드를 하면 upload라는 폴더에 모든게 다 저장된다.
	},
	filename: (req, file, cb) => {
		cb(null, '${Date.now()}_${file.originalname}'); //저장할 때 어떤 파일 이름으로 저장될지.
	}, // ex: 122001309139_hello
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		if(ext !== '.mp4') { //mp4만 될 수 있다고 해둠.
			return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
		}
		cb(null, true)
	}
})

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

		// upload 폴더 안의 그 경로를 클라이언트에게 보내주는 것.
		return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
	})


})

module.exports = router;
