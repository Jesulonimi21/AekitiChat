import dp from '../dp.png';
import { stat } from 'fs';

let initialState={
    client:"null",
    currentChat:null,
    generalImage:dp,
    usersProfile:{},
    prevImage:null

}

const reducer=(state=initialState,action)=>{
    if(action.type=="SET_CLIENT"){
        console.log("gotten client");
        return{...state,client:action.client}
    }
    if(action.type=="SET_CURRENT_CHAT"){
        return{...state,currentChat:action.currentChat};
    }
    if(action.type=="SET_GENERAL_IMAGE"){
        console.log("general Image",action.generalImage);
        return{
            ...state,generalImage:action.generalImage
        }
    }
    if(action.type=="SET_USER_PROFILE"){
        console.log("Users profile updated",action.usersProfile)
        return{
            ...state,usersProfile:action.usersProfile
        }
    }
    if(action.type="SET_PREV_IMAGE"){
        console.log("PrevImage");
        return{
            ...state,prevImage:action.prevImage
        };
    }
    return{...state}
}

export default reducer;