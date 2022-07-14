import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data'; 
import Image from './Profile.jpg';

const Login=()=>{

    const navigate = useNavigate();

    const [current,update]=useState(0);
    const [cur_in,upd_in]=useState({name:"",password:""});
    const [cur_up,upd_up]=useState({email:"",name:"",password:""});
    const [preview,set_preview]=useState({state:"",show:Image});
    
    let Value,Name;

    function signin_data(event)
    {
       Value=event.target.value;
       Name=event.target.name;
       upd_in({...cur_in,[Name]:Value});
    }

    
    function signup_data(event)
    {
       Value=event.target.value;
       Name=event.target.name;
       upd_up({...cur_up,[Name]:Value});
    }

    function imagedata(event)
    {
       console.log();
       set_preview({state:event.target.files[0],show:URL.createObjectURL(event.target.files[0])});
    } 

    function display()
    {
        if(current==0)
        {update(1);}
        else if(current==1)
        {update(0);}
    }

    async function get_signin(e)
    {
        e.preventDefault();
        console.log(cur_in);
        let formdata=new FormData();
        console.log(formdata);
        formdata.append("validity",JSON.stringify(cur_in));
        
        console.log(formdata);
     
        const res=await axios.post("http://localhost:2000/auth_data",
           
             formdata
           ).then((res)=>{console.log(res);
                          if(res.data.auth==true) {navigate('./Create');}
                           
        }).catch((err)=>{console.log(err)});
             

    }

    async function get_signup(e)
    {
        e.preventDefault();
        console.log(cur_up);
        
        const sendata=new FormData();
        sendata.append("signup",JSON.stringify(cur_up));
        sendata.append("file",preview.state)

        console.log(sendata);

        const res=await axios.post("http://localhost:2000/create_data",sendata)
        .then((res)=>{
            console.log(res);
            if(res.data.check==true) {navigate('./Create');}})

        .catch((err)=>{console.log(err)});
        
        

    }
   

    return(
    <>
      <div className='SignIn'style={{display:current==0?"block":"none"}}>
           
          <form onSubmit={get_signin}>
           <div className='heading'>
               <div className='title'>
                   Please sign in
               </div>
               <div className='inputs'>
                    <input type="text" placeholder='Enter UserName' value={cur_in.name} onChange={signin_data} name="name" required/>
                    <input type="password" placeholder='Enter Password' value={cur_in.password} onChange={signin_data} name="password" required/>
               </div>
               <div className='submit'>
                    <input type="submit" value="Sign In"/>
               </div>
               <div className='sign up'>
                    <a onClick={display}>Sign Up</a>
               </div>
               <div className='copyright'>
                   Copyright 2022
               </div>
          </div>
          </form>
          

      </div>

      <div className='SignUp' style={{display:current==1?"block":"none"}} >
          <form onSubmit={get_signup}>
              <div className='heading'>
                  <div className='title'>
                      Please Sign Up
                  </div>
                  <div className='inputs'>
                    <input type="email" placeholder='Enter EmailId' value={cur_up.email} onChange={signup_data} name="email" required/>
                    <input type="text" placeholder='Enter UserName' value={cur_up.name} onChange={signup_data} name="name" required />
                    <input type="password" placeholder='Enter password' value={cur_up.password} onChange={signup_data} name="password" required/>
                    <input type="file" placeholder='Enter Your Profile Pic' onChange={imagedata} name="image" required/>
                    <div className='image_disp'>
                           <img src= {preview.show} width="300" height="300" />
                    </div>
                  </div>
                  <div className='submit'>
                     <input type="submit" value="Sign Up"/>
                  </div>
                  <div className='signin'>
                       <a onClick={display}>Already SignIn?</a>
                  </div>
                  <div className='copyright'>
                     Copyright 2022
                  </div>
          
               </div>
          </form>
          
      </div>
      
    </>
);}

export default Login;