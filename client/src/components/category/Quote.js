import axios from 'axios';
import React,{useState,useEffect} from 'react';

const Quote=()=>{

  useEffect(()=>{get_quote();},[])

  const [current,update]=useState({content:"",owner:""})
  const [cur_quote,upd_quote]=useState([]);

  async function get_quote()
  {
    const res=await axios.get("http://localhost:2000/create_quote").then((res)=>{upd_quote(res.data.contents)});

  }

  function get_data()
  {
    upd_quote((oldItems)=>{return [...oldItems,current]});
    console.log(cur_quote);
  }

  function Delete(event)
  {
    let deletePost=window.confirm("Do you want to delete this item?");
    if(deletePost==true)
    {

    upd_quote((oldItems)=>{return oldItems.filter((arrElem,index)=>{return index!=event.target.id});});
  }
}
  async function send_quote()

 {   console.log("sending it to save",cur_quote);
  const res=await axios.post("http://localhost:2000/get_quote",{cur_quote}).then((res)=>{console.log("Successfully send...")}).catch((err)=>{console.log(err);})
 }

  let Value="",Name="";

  function receive(event)
  {
    Value=event.target.value;
    Name=event.target.name;
    console.log(Value); 
    update({...current,[Name]:Value})
  }

  return(
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
              <input type="button" onClick={send_quote} value="save" />
            </li>

          </ul>
        </div>
      </div>

      <div className='contents'>
          <div className='create_quote'>
            <form>
              
               <div className='area'>
                   <textarea name='content' rows="30" cols="30" onChange={receive}  value={current.content}/>
               </div>
               <div className='by'>
                 <input type="text" onChange={receive} name="owner" value={current.owner} />
               </div>
               <div className='submit'>
               <input type="button" value="Submit" onClick={get_data}/>
                   <input type="button"/>
               </div>
               </form>
          </div>
      </div> 

      {
       cur_quote.map((object,index)=>{

      return(<>
        <div className='list' id={index}>
          
            <div className='background'>

                 <div className='title'>
                   <h3>{object.content}</h3>
                 </div>
             
                 <div className='delete'>
                 <i className="zmdi zmdi-delete" onClick={Delete} id={index}></i>
                 </div>

            </div>
       </div>        
      </>
      ) })}
    </>
);}

export default Quote;