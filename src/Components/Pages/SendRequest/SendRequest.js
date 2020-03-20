import React,{Component} from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import './SendRequest.css';
import Spinner from '../../UI/Spinner/Spinner';
import DisplayModal from '../../UI/DisplayModal/DisplayModal';
import {connect} from 'react-redux';
class SendRequest extends Component{

   state={
        loading:false,
        aeAddress:"",
        noProfile:false
   }  

   inputChangedHandler=(event)=>{
     this.setState({
          aeAddress:event.target.value
     });

     console.log(this.state.aeAddress);
   }

   handleSubmitButton=async()=>{
        console.log(this.state.aeAddress)
        this.setState({loading:true});
     let profile=(await  this.props.client.methods.getProfile()).decodedResult;
     console.log("Profile",profile);
     if(profile.name==""){
          this.setState({loading:false,noProfile:true});
          console.log("You must update your profile");
          return;
     }
     await   this.props.client.methods.sendFriendRequest(this.state.aeAddress);
     this.setState({loading:false});
   }
   render(){ 
       return(
            <div className="SendRequest">
              {this.state.noProfile? <DisplayModal header='Update Profile' fi="You must update your profile before you can send a friend request" fii="Please click the button below to do so" clicked={()=>{
                   this.setState({noProfile:false},()=>{
                    console.log(this.state.noProfile);
                    this.props.history.push("/update_profile")
                   });
                   
                  
              }}></DisplayModal>:null}
               {this.state.loading?  <Spinner></Spinner>:null}
                <Input placeHolder="Enter Your Ae Address" onChange={this.inputChangedHandler} ></Input>
               <div className="SendRequestButton">

               <Button clicked={this.handleSubmitButton}>Send Request</Button>
               <div className="div-space"> 
                    <Button clicked={()=>{this.props.history.goBack()}}>Back</Button>
               </div>

               </div>
            </div>
        );
   }
 }
 const mapStateToProps=(state)=>{
      return {
           client:state.client
      }
 }

 export default connect(mapStateToProps)(SendRequest);