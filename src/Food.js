import React from 'react'

function Food({...rest}){
    return(
        <div>
            <div>{rest.serviceAreaName}</div>
            <div>{rest.svarAddr}</div>
            <div>{rest.batchMenu}</div>
            <div>{rest.salePrice}</div>
            <br />
        </div>
    )
}

export default Food