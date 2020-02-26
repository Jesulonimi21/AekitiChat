import React from 'react';
import "./UpdateProfile.css";
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
class UpdateProfile extends React.Component{

    render(){

        return(<div className={"UpdateProfile"} >

            <input   type="file"  style={{ width:"40%",
    display:"block",
    margin: "0 auto",
    background: "#f7296e",
    borderRadius:"10px",
    height: "40px",
    color:"white",
    fontWeight: "bold",
    border:"none",
    cursor: "pointer"}}/>
            <Input  otherClass={"UPInput"}/>
            <Input otherClass={"UPInputi"}/>
            <Input otherClass={"UPInputii"}/>
            <Input otherClass={"UPInputiii"}/>
            <Button otherClass={"UPInputiv"}>Submit</Button>
        </div>);
    }
}


export default UpdateProfile;