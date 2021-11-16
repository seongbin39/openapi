import React from 'react'
import './Food.css'

function Food({...rest}){
    return(
        <div className={`Food`}>
            <div className={`area`}>{rest.serviceAreaName }</div>
            <div className={`addr`}>{rest.svarAddr}</div>
            
            <div className={`menu`}>{rest.batchMenu} ( {rest.salePrice} )</div>
            {/* <div className={`price`}>{rest.salePrice}</div> */}
            <br />
        </div>
    )
}

export default Food