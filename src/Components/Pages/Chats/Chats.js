import React,{Component} from 'react';
import ChatList from './ChatList/ChatList';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import './Chats.css';
class Chats extends Component{
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

export default Chats;
