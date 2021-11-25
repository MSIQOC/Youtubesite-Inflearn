const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo })
    .exec((err, subscribe) => { //subscribe에는 userTo를 구독하는 모든 case가 들어있다. (세명이 구독하면 3명의 case가 나옴)
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true, subscribeNumber: subscribe.length}) //length를 해주면 심플하게 정보전달 가능
    })
})

router.post('/subscribed', (req, res) => {
    
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec( (err, subcribe) => {
        if(err) return res.status(400).send(err);
        let result = false
        if (subscribe.length !== 0){ //subscribe의 길이가 1이면은 구독중이고 0이면 아니다.
            result = true 
        }
        res.status(200).json({ success: true, subscribed: result }) //result에 구독중인지 아닌지를 담아서 클라이언트 쪽에 보내준다.
    })
})

module.exports = router;
