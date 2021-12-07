const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({

    //조금 이따가 이게 무슨 의미인지 파악
    writer: { // 작성자
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: { //비디오 아이디
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo : {  //아직은 어떤 용도인지 이해가 안간다.
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {  // 내용
        type: String
    }
    
}, { timestamps: true}) // 만든 date과 업데이트한 date이 표시가 되게 된다.


const Comment = mongoose.model('Comment', subscriberSchema);

module.exports = { Comment }