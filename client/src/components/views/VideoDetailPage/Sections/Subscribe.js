import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function Subscribe(props){

    //number는 0부터 시작하니깐 0으로 주고, 구독은 처음에 안돼있기 때문에 false로 초기값 설정한다.
    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {

        //작성한 사람의 아이디를 가져와서 얼마나 많은 구독자를 가지고 있는지 알아보기
        let variable = { userTo: props.userTo }
        Axios.post('/api/subscribe/subscbribeNumber', variable)
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })
        
        //내가 이 사람의 것을 구독하는지 아닌지 알아보는 것.
        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }
        
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then(response=> {
            if(response.data.success) {
                setSubscribed(response.data.subscribed)
            } else {
                alert('정보를 받아오지 못했습니다.')
            }
        })
    }, [])

    return (
        <div>
            <button
                    style={{ backgroundColor:`${Subscribe ? '#CC0000' : '#AAAAAA' }`, borderRadius: '4px',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransfrom: 'uppercase'
                }}
                onClick
            > 
                {/*구독이 됐다면 Subscribed로 출력하고 아니면 Subscribe로 출력한다.*/}
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'} 
            </button>
        </div>
    )
}

export default Subscribe;