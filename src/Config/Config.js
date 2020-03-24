const contractAddress="ct_2Xx5qEDPGifSTTXitWfDWrKTPrhD7jHd8QqQHcmvDxYT1VHiJy";
const contractSource=`
include "List.aes"
contract ReactChatApp=
  record usersRecord={
    name:string,
    discipline:string,
    status:string,
    dpUrl:string,
    pAddress:address
    }
  record messageInfo={
      message:string,
      time:string,
      sender:address,
      seen:bool
    }  
  record state={
          usersProfile:map(address,usersRecord),
          usersFriend:map(address,list(address)),
          usersMessages:map(address,map(address,list(messageInfo))),
          friendRequests:map(address,list(address)),
          newestFriend:map(address,address)
           }
      
  stateful entrypoint init()={usersProfile={},usersFriend={},usersMessages={}, friendRequests={},newestFriend={}}
  
  stateful entrypoint registerProfile(name':string,discipline':string,status':string,dpUrl':string)=
    let newProfile={name=name',discipline=discipline',status=status',dpUrl=dpUrl',pAddress=Call.caller}
    put(state{usersProfile[Call.caller]=newProfile})
    
  entrypoint getProfile()=
    Map.lookup_default(Call.caller,state.usersProfile,{name="",discipline="",status="",dpUrl="",pAddress=Call.caller})
    
    
  stateful entrypoint sendFriendRequest(friendsAddress':address)=
     let emptyAddressList:list(address)=[Call.caller]
     switch(Map.lookup(friendsAddress',state.friendRequests))
       None =>   onlyOneFriendRequest(friendsAddress',emptyAddressList)
       Some(x)=> modifyFriendsRequest(x,emptyAddressList, friendsAddress')

  stateful function modifyFriendsRequest(oldList:list(address),newFriendList:list(address),friendsAddress':address):list(address)=
    let newList=newFriendList++oldList
    put(state{friendRequests[friendsAddress']=newList})
    newList
    
  stateful function onlyOneFriendRequest(friendsAddress':address,newFriendList:list(address))=
     put(state{friendRequests[friendsAddress']=newFriendList})
     newFriendList
     
     
  entrypoint getFriendRequest()=
    let usersFriendRequest=List.map((el)=> Map.lookup_default(el,state.usersProfile,{name="",discipline="",status="",dpUrl="",pAddress=Call.caller}), Map.lookup_default(Call.caller,state.friendRequests,[]))
    usersFriendRequest
    
  stateful entrypoint rejectFriendRequest(newFriendsAddress:address)=
    let friendRequestList=Map.lookup_default(Call.caller,state.friendRequests,[]) 
    let newFriendRequestList=List.filter((x)=>x!=newFriendsAddress,friendRequestList) 
    put(state{friendRequests[Call.caller]=newFriendRequestList})

  stateful entrypoint acceptFriendRequest(newFriendsAddress:address)=
    let friendRequestList=Map.lookup_default(Call.caller,state.friendRequests,[])  
    let newFriendRequestList=List.filter((x)=>x!=newFriendsAddress,friendRequestList)

    let usersFriendList=Map.lookup_default(Call.caller,state.usersFriend,[])
    let requestSendersFriendList=Map.lookup_default(newFriendsAddress,state.usersFriend,[])
    let newRequestSendersFriendList=Call.caller::requestSendersFriendList
    let newUsersFriendList=newFriendsAddress::usersFriendList
    let newUsersFriendMap=state.usersFriend{[Call.caller]=newUsersFriendList,[newFriendsAddress]=newRequestSendersFriendList}
    put(state{usersFriend=newUsersFriendMap,friendRequests[Call.caller]=newFriendRequestList})

  entrypoint getUsersFriend()=
    let usersFriend=List.map((el)=> Map.lookup_default(el,state.usersProfile,{name="",discipline="",status="",dpUrl="",pAddress=Call.caller}), Map.lookup_default(Call.caller,state.usersFriend,[]))
    usersFriend
   
  stateful entrypoint sendMessage(receiver:address,message':string,time':string)=
        let newMessage={message=message', time=time',sender=Call.caller,seen=false}
        let oldStateSendersMessages=Map.lookup_default(Call.caller,state.usersMessages,{})
        let oldStateReceiverMessages=Map.lookup_default(receiver,state.usersMessages,{})

        let oldSingleReceiverMessages=Map.lookup_default(Call.caller,oldStateReceiverMessages,[])
        let oldSingleSenderMessages=Map.lookup_default(receiver,oldStateSendersMessages,[])
       
        let newSingleReceiverMessages=newMessage::oldSingleReceiverMessages
        let newSingleSenderMessages=newMessage::oldSingleSenderMessages

        let newStateSendersMessage=oldStateSendersMessages{[receiver]=newSingleSenderMessages}
        let newStateReceiversMessage=oldStateReceiverMessages{[Call.caller]=newSingleReceiverMessages}

        let newUpdatedState=state.usersMessages{[Call.caller]=newStateSendersMessage,[receiver]=newStateReceiversMessage}

        put(state{usersMessages=newUpdatedState})
  
  entrypoint getMessages()=
    Map.lookup_default(Call.caller,state.usersMessages,{})

  entrypoint getFriendMessage(friendAddress:address)=
    let allUsersMessages=getMessages()
    let friendMessage=Map.lookup_default(friendAddress,allUsersMessages,[])
    friendMessage
`;
export default{
    contractAddress:contractAddress,
    contractSource:contractSource
}