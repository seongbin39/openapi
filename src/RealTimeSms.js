import React from 'react'

function RealTimeSms({...rest}){
    return(
        <div>
            <div>{rest.accDate} {rest.accHour}</div>
            <div></div>
            <div>{rest.roadNM} {rest.startEndTypeCode} {rest.accPointNM}</div>
            <div></div>
            <div></div>
            <div>{rest.accType}  {rest.smsText}</div>
            <div></div>
            <br />
        </div>
    )
}

export default RealTimeSms