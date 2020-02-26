import React, { Component } from 'react';
import Header from './Components/UI/Header/Header';
import './App.css';
import FriendList from './Components/FriendList/FriendList';
import ActionButton from './Components/UI/ActionButton/ActionButton';
import SendRequest from './Components/SendRequest/SendRequest';
import SideDrawer from './Components/UI/Navigation/SideDrawer/SideDrawer';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import FriendRequests from './Components/FriendRequests/FriendRequests';
import {connect} from 'react-redux';
import getClient from './HelperFiles/AeClient';
import Spinner from './Components/UI/Spinner/Spinner';
class App extends Component {
  state={
    isRequestOpen:false,
    isOpen:"normal",
    regProfile:false, 
    showBackdrop:false,
    frClicked:false,
    loading:true,
  }

  async componentDidMount(){
    console.log(this.props.client);
    let client =await getClient();
    console.log(client)
    this.setState({loading:false});
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
  toggleSendRequest=()=>{
    this.setState({isRequestOpen:!this.state.isRequestOpen,isOpen:"normal"});
    
  }
  toggleRegProfile=()=>{
    this.setState({regProfile:!this.state.regProfile,isOpen:"normal",frClicked:false});
  }
  goToFriendRequests=(back)=>{
   
    this.openNavigationDrawer();
    this.setState({frClicked:!this.state.frClicked});
  }
  

url="https://cdn-media-1.freecodecamp.org/imgr/MJAkxbh.png";
  render() {
    let defaultBody=(
      <div>
      <FriendList/>
      <ActionButton handler={this.toggleSendRequest}/>
      
      </div>
);
    if(this.state.isRequestOpen){
      defaultBody=
      <div>
       <SendRequest backHandler={this.toggleSendRequest}></SendRequest>
       </div>
    }
    if(this.state.regProfile  ){
      defaultBody=<UpdateProfile></UpdateProfile>
    }
    if(this.state.frClicked){
      defaultBody=<FriendRequests toggleFriendRequests={this.goToFriendRequests}></FriendRequests>
    }

    return (
      <div>
       <Header navToggle={this.openNavigationDrawer} profToggle={this.toggleRegProfile}/>
       <SideDrawer frClicked={this.goToFriendRequests} showBackdrop={this.state.showBackdrop} navToggle={this.openNavigationDrawer} isOpen= {this.state.isOpen}/>
      {defaultBody}
    {this.state.loading? <Spinner/> :null}
      </div>
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
