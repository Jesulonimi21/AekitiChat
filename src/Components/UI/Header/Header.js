import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import dp from '../../../dp.jpg';
const Header=(props)=>{
    let usersDp=dp;
    if(props.imageUrl!=""){
        usersDp=props.imageUrl;
    }
    
    return(
        <header >
          <Link to="/update_profile" > <img src={usersDp} className="header-img" onClick={props.profToggle}/></Link>
          <Link style={{textDecoration:'none'}} to="/">  <h4 className="appname" >Aekiti Chat</h4></Link>

            <div className="nav-drawer" onClick={props.navToggle}>
                <div className="item-i"/>
                <div className="item-i"/>
                <div className="item-i"/>
            </div>
        </header>
    )
}

export default Header;