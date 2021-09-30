const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videoSchema = mongoose.Schema({
    
    // ObjectId를 불러오기만 해도 User에 있는 모든 정보를 다 불러올 수 있다.
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title : {
        type: String,
        maxlength: 50
    },
    description : {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }

}, { timestamps: true}) // 만든 date과 업데이트한 date이 표시가 되게 된다.


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }