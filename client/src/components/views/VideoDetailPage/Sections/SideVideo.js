import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function SideVideo() {

    //사이드 비디오들 저장
    const [sideVideos, setsideVideos] = useState([])

    //DB에서 모든 정보 다 불러오기
    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                setsideVideos(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패했습니다.')
            }
        })
    }, []) //[]안이 비어있으면 돔이 업데이트 될 때 한번만 실행해준다.

    //사이드비디오가 여러개 있기 때문에 map을 사용해준다.
    const renderSideVideo = sideVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <div key={index} style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
            <div style={{ width:'40%', marginRight:'1rem' }}>
                <a href >
                    <img style={{ width: '100%', height:'100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                </a>
            </div>

            <div style={{ width:'50%' }}>
                <a href style ={{ color: 'gray'}}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                    <span>{video.writer.name}</span><br />
                    <span>{video.views} views </span><br />
                    <span>{minutes} : {seconds}</span><br />
                </a>
            </div>
        </div>
    })

    return ( 
        <React.Fragment>
            <div style = {{ marginTop:'3rem'}} />
            {renderSideVideo}
        </React.Fragment>
    )
}

export default SideVideo