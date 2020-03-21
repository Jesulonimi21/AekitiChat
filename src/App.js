import React, { Component } from 'react';
import Header from './Components/UI/Header/Header';
import './App.css';
import FriendList from './Components/Pages/FriendList/FriendList';
import ActionButton from './Components/UI/ActionButton/ActionButton';

import SendRequest from './Components/Pages/SendRequest/SendRequest';
import SideDrawer from './Components/UI/Navigation/SideDrawer/SideDrawer';
import UpdateProfile from './Components/Pages/UpdateProfile/UpdateProfile';
import FriendRequests from './Components/Pages/FriendRequests/FriendRequests';
import ViewProfile from './Components/Pages/ViewProfile/ViewProfile';
import Chats from './Components/Pages/Chats/Chats';
import axios from 'axios';
import {BrowserRouter,Route} from 'react-router-dom';

import {connect} from 'react-redux';
import getClient from './HelperFiles/AeClient';
import Spinner from './Components/UI/Spinner/Spinner';
class App extends Component {
  state={
    isOpen:"normal",
    showBackdrop:false,
    frClicked:false,
    loading:false,
    profileData:null,
    imageUrl:"",
  }

  async componentDidMount(){
    return;
    console.log(this.props.client);
    let client =await getClient();
    console.log(client)
    this.props.setClient(client);
    let usersProfile=await this.props.client.call("getProfile",[]);
    let decodedUsersProfile=await usersProfile.decode().catch(err=>console.error(err));
    console.log("Users Profile",decodedUsersProfile);
    if(decodedUsersProfile.name!=""){
      // this.getImage(decodedUsersProfile.dpUrl);
      axios.get(`https://ipfs.io/ipfs/${decodedUsersProfile.dpUrl}`).then(result=>{
        console.log("axiosres",result);
        this.setState({imageUrl:result.data,loading:false});
      }).catch(error=>{
            console.error(error);
      });
       this.setState({profileData:decodedUsersProfile});
       return;
    }
    this.setState({loading:false,profileData:decodedUsersProfile});
  }

  getImage=(result)=>{
  const req = new XMLHttpRequest();
  req.responseType = "text/html";

  req.onload = function(e) {
   
    console.log(req.response);
    this.setState({imageUrl:req.response,loading:false});
  }.bind(this);

  req.open('GET',`https://ipfs.io/ipfs/${result}`, true);
  req.send();
}


  openNavigationDrawer=()=>{
    if(this.state.isOpen===("normal")){
      this.setState({isOpen:"fromOpen",showBackdrop:true})
      return;
    }

    if(this.state.isOpen===("fromOpen")){
      this.setState({isOpen:"fromClose",showBackdrop:false})
      return;
    }

    if(this.state.isOpen===("fromClose")){
      this.setState({isOpen:"fromOpen",showBackdrop:true})
      return;
    }
  }
 

  goToFriendRequests=(back)=>{
   
    this.openNavigationDrawer();
    this.setState({isOpen:"normal"});
  }
  goToViewProfile=()=>{
    this.setState({isOpen:"normal",showBackdrop:false});
  }
  toggleLoader=()=>{
    this.setState({loading:!this.state.loading});
  }
  

url="https://cdn-media-1.freecodecamp.org/imgr/MJAkxbh.png";

  render() {
    let defaultBody=(
      <div>
      <FriendList/>
     
      
      </div>
);

    return (
      <BrowserRouter>
      <div>
         {this.state.loading? <Spinner/> :null}
       <Header imageUrl={this.state.imageUrl} navToggle={this.openNavigationDrawer} profToggle={this.toggleRegProfile}/>
       <SideDrawer frClicked={this.goToFriendRequests} mpClicked={this.goToViewProfile} showBackdrop={this.state.showBackdrop} navToggle={this.openNavigationDrawer} isOpen= {this.state.isOpen}/>
      {/* {this.props.client=="null"?null: <Route exact path="/" component={FriendList}/>} */}

      <Route exact path="/" component={Chats}/>
     
       <Route path="/friend_requests" component={FriendRequests}/>
       <Route path="/user_profile" component={ViewProfile}/>
       <Route path="/update_profile" component={UpdateProfile} />
       <Route path="/send_requests" component={SendRequest} />
       
      </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    client:state.client
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    setClient:(client)=>dispatch({type:"SET_CLIENT",client:client})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
