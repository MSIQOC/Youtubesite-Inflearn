import {  Card, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import moment from 'moment'
const { Title } = Typography
const { Meta } = Card

function SubscriptionPage() {

    const [Video, setVideo] = useState([])
    //useEffect => 돔이 로드 될 때마다 무슨 일을 할 것인지 결정
    useEffect(() => {

        const subscriptionVariables = {
            //로그인된 본인의 아이디. 이걸로 구독하는 사람들을 찾는다.
            userFrom : localStorage.getItem('userId')
        }

        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                setVideo(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패했습니다.')
            }
        })
    }, []) //[]안이 비어있으면 돔이 업데이트 될 때 한번만 실행해준다.

    const renderCards = Video.map((video,index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} > {/*Video.map에 있는 video에서의 _id를 가져온다.*/}
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>
            <hr />
            {/*가장 작을 때:6, 중간사이즈:8, 전체사이즈:24*/}
            <Row gutter={[32, 16]}>
                {renderCards}
                
            </Row>
        </div>
    )
}

export default SubscriptionPage
