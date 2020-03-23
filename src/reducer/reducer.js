

let initialState={
    client:"null",
    currentChat:null
}

const reducer=(state=initialState,action)=>{
    if(action.type=="SET_CLIENT"){
        return{...state,client:action.client}
    }
    if(action.type=="SET_CURRENT_CHAT"){
        return{...state,currentChat:action.currentChat};
    }
    return{...state}
}

export default reducer;