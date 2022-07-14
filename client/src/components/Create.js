import axios from "axios";
import React,{useEffect,useState} from "react";
import {Navigate} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

//import Images from '../../../server/uploads/Images';

const Create = () => {
  const navigate = useNavigate();
  const [current,update]=useState({_id:"",userName:"",imageName:"",email:""});
  useEffect(get_data,[]);
  
  function get_data()
  {
    const res= axios.get("http://localhost:2000/create_data").then((res)=>{
      console.log(res.data.hold);
      update({_id:res.data._id,userName:res.data.hold.userName,imageName:res.data.hold.imageName,email:res.data.hold.email})});
    console.log(res.data);
  }
  
  async function Delete(event)
  { event.preventDefault();
    var item=window.confirm("Do you want to delete your account?");
    if(item==true){    var res=await axios.post("http://localhost:2000/delete_data",{current}).then((res)=>{console.log("Successful");navigate('./')}).catch((error)=>{console.log(error)});
  }
  }

  return (
    <>
      <div className="header">
        <div className="title">WriterApp</div>
        <div className="links">
          <ul>
            <li>
              <a href="">Home</a>
            </li>
          
         
            <li>
              <a href="">About</a>
            </li>
            <li>
              <input type="button" value="DELETE ACCOUNT" onClick={Delete}  />
            </li>
          </ul>
        </div>
      </div>

      <div className="contents">
        
        <div className="designation">
           <div className="profile">
              <img src={"data:image/jpeg;base64,"+current.imageName} width="300" height="300"/>
           </div>
           <div className="username">
              <p>{current.userName}</p>
                           
           </div>
           <div className="email">
              <p>{current.email}</p>
           </div>

        </div>

        <div className="create">

          <div className="type">
            <ul>
              <li>
                <a href="/create/poem">POEM</a>
              </li>
              <li>
              <a href="/create/story">STORY</a>
              </li>
              <li>
             <a href="/create/quote">QUOTE</a>
              </li>
            </ul>
          </div>

        </div>

      </div>

     
      

  </>
  
  );
};

export default Create;
