import React,{Component} from 'react';
import './ViewProfile.css';
import picture from '../../../dp.png';
import {connect} from 'react-redux';
import axios from 'axios';
import Button from '../../UI/Button/Button';
import { stat } from 'fs';
import Spinner from '../../UI/Spinner/Spinner';

class ViewProfile extends Component{

    state={
        dpHash:picture,
        name:"",
        discipline:"",
        status:"",
         loading:false,
    }
    
   async componentDidMount(){
   this.setState({loading:true})
   console.log(this.props.client)    
  let profile=(await  this.props.client.methods.getProfile()).decodedResult;
  if(profile){
      axios.get(`https://ipfs.io/ipfs/${profile.dpUrl}`).then(response=>{
          console.log(response);
          this.setState({dpHash:response.data})
            this.setState({loading:false}) 
      }).catch(err=>{
          console.error(err);
     this.setState({loading:false}) 
      })
      this.setState({name:profile.name,discipline:profile.discipline,status:profile.status})
  }else{
       this.setState({loading:false}) 
  }
  console.log(profile);
 
    }

    render(){
        return (<div className="ViewProfile">
{this.state.loading?  <Spinner></Spinner>:null}
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