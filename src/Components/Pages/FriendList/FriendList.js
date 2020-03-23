import React from 'react';
import Friend from '../../UI/Friend/Friend';
import './FriendList.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ActionButton from "../../UI/ActionButton/ActionButton";
class FriendList extends React.Component{

state={
    usersFriend:[]
}

async componentDidMount(){
    console.log("friend start mount")
    let friendList=(await this.props.contractInstance.methods.getUsersFriend()).decodedResult;
    let myArr=[];

    friendList.map((el,index)=>{
        console.log("el",el);
    axios.get(`https://ipfs.io/ipfs/${el.dpUrl}`).then((result)=>{
            let imageString=result.data;
            let data={
                ...el,
                imageString
            };
            myArr.push(data);
            console.log("the index is "+index +" and the length is "+friendList.length );
            console.log("My Array",myArr);
            if(index==(friendList.length-1)){
                console.log(myArr);
                this.setState({usersFriend:myArr})
            }
            return data;
         
        }).catch(error=>{
            console.error(error);
        });
        
     
    });
    console.log("friend start mount",friendList);
    // console.log("new friend list",newFriendList);
    // this.setState({usersFriend:newFriendList});
    console.log("friend start mount");
}
    handleusersFriendClicked=(userFriend)=>{
        this.props.setCurrentChat(userFriend);
        this.props.history.push("/current_chat");
        }
 render(){
    return(
        
        <div className="FriendList">
            <h4>Friends</h4>
            {this.state.usersFriend.map(el=>{
                console.log(el);
                return <Friend name={el.name} clicked={(event)=>{
                    this.handleusersFriendClicked(el)
                    
                }} imageString={el.imageString}/>
            })}
          <Link to="/send_requests">   <ActionButton /></Link>
        </div>
    );
}
}

const mapStateToProps=(state)=>{
    return{
        contractInstance:state.client,
    }  
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setCurrentChat:(newCurrentChat)=>dispatch({type:"SET_CURRENT_CHAT",currentChat:newCurrentChat})
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(FriendList);