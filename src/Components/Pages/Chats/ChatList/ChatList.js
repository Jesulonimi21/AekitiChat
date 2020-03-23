import React,{Component} from 'react';
import './ChatList.css';
import ReceivedMessage from '../ReceivedMessage/ReceivedMessage';
import SentMessage from '../SentMessages/SentMessages';
import {connect} from 'react-redux';
class Chats extends Component{
    render(){
        return  <div className="ChatList">
                {this.props.messages.map(el=>{
                    if(this.props.profile.pAddress==el.sender){
                     return  <SentMessage text={el.message} time ={el.time}></SentMessage>
                    }else{
                        return <ReceivedMessage text={el.message}  time ={el.time}></ReceivedMessage>
                    }
                   
                })}
                   
                    
 {/* <ReceivedMessage text="How are youl"  time ="7:02 am"></ReceivedMessage>
                   
                     <ReceivedMessage text="Am good bro"  time ="7:06 am"></ReceivedMessage> */}

               {/* <ReceivedMessage text="How are youl"  time ="7:02 am"></ReceivedMessage>
                    <SentMessage text="Am cool and you"  time ="7:04 am"></SentMessage>
                     <ReceivedMessage text="Am good bro"  time ="7:06 am"></ReceivedMessage>
                     */}
                    

                 </div>
    }
}
const mapStateToProps=(state)=>{
   return{profile:state.usersProfile}
}

export default connect(mapStateToProps)(Chats);