import React,{Component} from 'react';
import './ViewProfile.css';
import picture from '../../../dp.jpg';
import {connect} from 'react-redux';
import axios from 'axios';
import Button from '../../UI/Button/Button';
import { stat } from 'fs';

class ViewProfile extends Component{

    state={
        dpHash:picture,
        name:"",
        discipline:"",
        status:""
    }
    
   async componentDidMount(){
    this.props.toggleLoader();  
   console.log(this.props.client)    
  let profile=(await  this.props.client.methods.getProfile()).decodedResult;
  if(profile){
      axios.get(`https://ipfs.io/ipfs/${profile.dpUrl}`).then(response=>{
          console.log(response);
          this.setState({dpHash:response.data})
            this.props.toggleLoader(); 
      }).catch(err=>{
          console.error(err);
           this.props.toggleLoader(); 
      })
      this.setState({name:profile.name,discipline:profile.discipline,status:profile.status})
  }else{
       this.props.toggleLoader(); 
  }
  console.log(profile);
 
    }

    render(){
        return (<div className="ViewProfile">

                    <img src={this.state.dpHash} className="VPImage"/>
                    <h4>{this.state.name}</h4>
                    <h4>{this.state.discipline}</h4>
                    <p>{this.state.status}</p>
        <Button clicked={()=>{this.props.history.goBack()}} >Back</Button>
                </div>)
    }
}

const mapStateToProps=(state)=>{
    return{
        client:state.client
    }
}
export default connect(mapStateToProps)(ViewProfile);