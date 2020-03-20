import React from "react";
import './FriendRequest.css';
import Button from '../../../UI/Button/Button';
import dp from '../../../../dp.jpg';
const FriendRequest=(props)=>{
    return <div className="FriendRequest">

       <img src={props.imageString} />
       <p className="FRKey">{props.name}</p>
        <Button clicked={props.accept} otherClass="FRConfirm">Confirm</Button>
        <Button clicked={props.reject} otherClass="FRReject">Reject</Button>
    </div>
}

export default FriendRequest;