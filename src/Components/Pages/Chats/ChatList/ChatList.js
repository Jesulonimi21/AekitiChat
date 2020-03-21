import React,{Component} from 'react';
import './ChatList.css';
import ReceivedMessage from '../ReceivedMessage/ReceivedMessage';
import SentMessage from '../SentMessages/SentMessages';
class Chats extends Component{
    render(){
        return  <div className="ChatList">
                    <ReceivedMessage text="How are youl"  time ="7:02 am"></ReceivedMessage>
                    <SentMessage text="Am cool and you"  time ="7:04 am"></SentMessage>
                     <ReceivedMessage text="Am good bro"  time ="7:06 am"></ReceivedMessage>
 <ReceivedMessage text="How are youl"  time ="7:02 am"></ReceivedMessage>
                    <SentMessage text="Am cool and you"  time ="7:04 am"></SentMessage>
                     <ReceivedMessage text="Am good bro"  time ="7:06 am"></ReceivedMessage>
                    
 {/* <ReceivedMessage text="How are youl"  time ="7:02 am"></ReceivedMessage>
                    <SentMessage text="Am cool and you"  time ="7:04 am"></SentMessage>
                     <ReceivedMessage text="Am good bro"  time ="7:06 am"></ReceivedMessage> */}

               {/* <ReceivedMessage text="How are youl"  time ="7:02 am"></ReceivedMessage>
                    <SentMessage text="Am cool and you"  time ="7:04 am"></SentMessage>
                     <ReceivedMessage text="Am good bro"  time ="7:06 am"></ReceivedMessage>
                     */}
                    

                 </div>
    }
}

export default Chats;