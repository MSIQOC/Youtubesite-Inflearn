const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({

    //조금 이따가 이게 무슨 의미인지 파악
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, { timestamps: true}) // 만든 date과 업데이트한 date이 표시가 되게 된다.


const Video = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }