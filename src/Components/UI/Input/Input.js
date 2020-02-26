import React from 'react';
import './Input.css';
const Input =(props)=>{
   let  allClasses=["Input"]
   
    if(props.otherClass){
     allClasses.push(props.otherClass)
        console.log(allClasses);
    }

    return(
       <input placeholder="Enter Ae Address of a user" className={allClasses.join(" ")}>
       </input>
    );
}
export default Input;