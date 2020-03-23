import React,{Component} from 'react';
import ChatList from './ChatList/ChatList';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {connect} from 'react-redux';
import './Chats.css';
class Chats extends Component{

    componentDidMount(){
        console.log("currrent chat",this.props.currentChat);
        console.log("currrent chat",this.props.contractInstance);
    }
state={
    inputValue:""
}
handleInputChange=(event)=>{
    this.setState({inputValue:event.target.value});
}

    render(){
        return <div>
                    <ChatList></ChatList>

                    <div className="ChatsMessageDiv">
                    <Input otherClass="ChatsInput" placeHolder="Enter Message" value={this.state.inputValue} onChange={this.handleInputChange} ></Input>
                    <Button otherClass="ChatsButton">Send</Button>
                    </div>
                </div>
    }
}

const mapStateToProps=(state)=>{
    return{
        contractInstance:state.client,
        currentChat:state.currentChat
    }
}

export default connect(mapStateToProps)(Chats);
