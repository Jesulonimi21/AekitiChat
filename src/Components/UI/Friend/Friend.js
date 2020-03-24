import React from 'react';
import dp from '../../../dp.png';
import  './Friend.css';
const Friend=(props)=>{
    return(
        <div className="Friend" onClick={props.clicked}>
            <img src={props.imageString} />
            <h4>{props.name}</h4>
        </div>
    );
}

export default Friend;