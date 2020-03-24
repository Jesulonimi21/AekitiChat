import React,{Component} from 'react';
import FriendRequest from './FriendRequest/FriendRequest';
import './FriendRequests.css';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import DisplayModal from '../../UI/DisplayModal/DisplayModal';

class FriendRequests extends Component{

    state={
        loading:true,
        friendReqList:[],
        noProfile:false
    }

    async componentDidMount(){
       let friendRequest=( await   this.props.client.methods.getFriendRequest()).decodedResult;
        console.log(friendRequest);
        let myArr=[]
       friendRequest.map((el,index)=>{
         axios.get(`https://ipfs.io/ipfs/${el.dpUrl}`)
            .then(result=>{
                let imageString=result.data;
                let data={
                    ...el,
                    imageString
                };
                myArr.push(data);
                
                if(index==(friendRequest.length-1)){
                    this.setState({loading:false,friendReqList:myArr});
                }
                return data;
            }).catch(error=>{
                this.setState({loading:false});
                console.error(error);
            });
        });
        if(friendRequest.length==0){
            this.setState({loading:false});
        }
   
        
    }


    handleAcceptButton=async(pKey)=>{
        this.setState({loading:true});
        let profile=(await  this.props.client.methods.getProfile()).decodedResult;
         console.log("Profile",profile);
     if(profile.name==""){
        this.setState({loading:false,noProfile:true});
          console.log("You must update your profile");
          return;
     }
        await this.props.client.methods.acceptFriendRequest(pKey);
        let friendRequest=( await   this.props.client.methods.getFriendRequest()).decodedResult;
        let myArr=[]
        friendRequest.map((el,index)=>{
          axios.get(`https://ipfs.io/ipfs/${el.dpUrl}`)
             .then(result=>{
                 let imageString=result.data;
                 let data={
                     ...el,
                     imageString
                 };
                 myArr.push(data);
                 if(index==(friendRequest.length-1)){
                     this.setState({loading:false,friendReqList:myArr});
                 }
                 return data;
             }).catch(error=>{
                 this.setState({loading:false});
                 console.error(error);
             });          
         });

         if(friendRequest.length==0){
            this.setState({loading:false,friendReqList:myArr});
         }

    }


    handleRejectButton=async(pKey)=>{
        console.log("reject");
        this.setState({loading:true});
          await this.props.client.methods.rejectFriendRequest(pKey);
          let friendRequest=( await   this.props.client.methods.getFriendRequest()).decodedResult;
        let myArr=[]
        friendRequest.map((el,index)=>{
          axios.get(`https://ipfs.io/ipfs/${el.dpUrl}`)
             .then(result=>{
                 let imageString=result.data;
                 let data={
                     ...el,
                     imageString
                 };
                 myArr.push(data);
                 if(index==(friendRequest.length-1)){
                     this.setState({loading:false,friendReqList:myArr});
                 }
                 return data;
             }).catch(error=>{
                 this.setState({loading:false});
                 console.error(error);
             });          
         });

         if(friendRequest.length==0){
            this.setState({loading:false,friendReqList:myArr});
         }
    }

    render(){
        return(<div className="FriendRequests">
              {this.state.noProfile? <DisplayModal header='Update Profile' fi="You must update your profile before you can send a friend request" fii="Please click the button below to do so" clicked={()=>{
                   this.setState({noProfile:false},()=>{
                    console.log(this.state.noProfile);
                    this.props.history.push("/update_profile")
                   });
                   
                  
              }}></DisplayModal>:null}
            {this.state.loading?<Spinner></Spinner>:null}
            {this.state.friendReqList.map(el=>{
                return<FriendRequest reject={()=>this.handleRejectButton(el.pAddress)} imageString={el.imageString} accept={()=>this.handleAcceptButton(el.pAddress)} name={el.name} pKey={el.pAddress}></FriendRequest>
            })}
            
            

            <Button  clicked={()=>{this.props.history.goBack()}}>Back</Button>
        </div>)
    }
}

const mapStateToProps=(state)=>{
    return {
         client:state.client
    }
}

export default connect(mapStateToProps) (FriendRequests);