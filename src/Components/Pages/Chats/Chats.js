import React,{Component} from 'react';
import ChatList from './ChatList/ChatList';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {connect} from 'react-redux';
import axios from 'axios';
import './Chats.css';
class Chats extends Component{

    async componentDidMount(){
       
        
        axios.get(`https://ipfs.io/ipfs/${this.props.currentChat.dpUrl}`).then((result)=>{
            this.props.setGeneralImage(result.data);
        }).catch((error)=>{
            console.error(error);
        })
        let allMessages=  (await  this.props.contractInstance.methods.getFriendMessage(this.props.currentChat.pAddress)).decodedResult;
        console.log(allMessages);
        this.setState({messages:allMessages.reverse()});
        

    }
state={
    inputValue:"",
    messages:[]
}
handleSendMessage=async(event)=>{
    
   await this.props.contractInstance.methods.sendMessage(this.props.currentChat.pAddress,this.state.inputValue,this.getTime());
   this.setState({inputValue:""});
let allMessages=  (await  this.props.contractInstance.methods.getFriendMessage(this.props.currentChat.pAddress)).decodedResult;

console.log(allMessages);
this.setState({messages:allMessages.reverse()});
// this.setState({messages:allMessages.reverse()});
}
handleInputChange=async(event)=>{
    this.setState({inputValue:event.target.value});
    
}

getTime=()=>{
var d = new Date();
d.toLocaleString();       // -> "2/1/2013 7:37:08 AM"
d.toLocaleDateString();   // -> "2/1/2013"
return d.toLocaleTimeString();

}

    render(){
        return <div>
                    <ChatList messages={this.state.messages}></ChatList>

                    <div className="ChatsMessageDiv">
                    <input className="ChatsInput" placeholder="Enter Message" value={this.state.inputValue} onChange={this.handleInputChange} ></input>
                    <Button clicked={this.handleSendMessage} otherClass="ChatsButton">Send</Button>
                    </div>
                </div>
    }
}

const mapStateToProps=(state)=>{
    return{
        contractInstance:state.client,
        currentChat:state.currentChat,     
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
      setGeneralImage:(imageData)=>dispatch({type:"SET_GENERAL_IMAGE",generalImage:imageData}),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Chats);
