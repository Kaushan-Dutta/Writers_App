import axios from 'axios';
import React,{useState,useEffect} from 'react';

const Poem=()=>{
  

  useEffect(()=>{get_poem();},[])

  const [current,update]=useState({title:"",content:"",owner:""})
  const [cur_poem,upd_poem]=useState([]);
  const [ini_state,fi_state]=useState({hold:'0',title:"",content:"",owner:"",id:""})

   async function get_poem()
  {
    const res=await axios.get("http://localhost:2000/create_poem").then((res)=>{upd_poem(res.data.contents)});

  }
  //setData(prevData => [...prevData, ...transformedOutgoingCalls]);

  function get_data()
  {
    upd_poem((oldItems)=>{return [...oldItems,current]});
    console.log(cur_poem);
  }

  let i;
  function show_poem(event)
  {
    console.log("hello");
    for(i=0;i<cur_poem.length;i++)
    {
      if(i==event.target.id)
      {  console.log("challo",cur_poem[i]);
         console.log({hold:'1',title:cur_poem[i].title,content:cur_poem[i].content,owner:cur_poem[i].owner});
         fi_state({hold:'1',title:cur_poem[i].title,content:cur_poem[i].content,owner:cur_poem[i].owner})
      }
    }

 
  }
  function Delete(event)
  {
    let deletePost=window.confirm("Do you want to delete this item?");
    if(deletePost==true)
    {

    upd_poem((oldItems)=>{return oldItems.filter((arrElem,index)=>{return index!=event.target.id});});
  }
}

  async function send_poem()
  {   console.log("sending it to save",cur_poem);
    const res=await axios.post("http://localhost:2000/get_poem",{cur_poem}).then((res)=>{console.log("Successfully send...")}).catch((err)=>{console.log(err);})
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
          <div className='first_page' style={{display:ini_state.hold==0 ?"block":"none"}}>

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
              <input type="button" onClick={send_poem} value="save" />
            </li>
            
          </ul>
        </div>
      </div>

      <div className='contents'>
          <div className='create_poem'>
          <form>
               <div className='title'>
                 <input type="text"onChange={receive} name="title" value={current.title} />
               </div>
               <div className='area'>
                   <textarea name='content' rows="30" cols="30" onChange={receive}  value={current.content}/>
               </div>
               <div className='by'>
                 <input type="text" />
               </div>
               <div className='submit'>
               <input type="button" value="Submit" onClick={get_data}/>
               <input type="button" value="Reset"/>
               </div>
                  
               
               </form>
          </div>
    </div>

      {cur_poem.map((object,index)=>{

      return(<>

       <div className='list' id={index}>
            <div className='background'>
                 <div className='title'>
                   <h3>{object.title}</h3>
                 </div>
                 <div className='view'>
                    <i className="zmdi zmdi-eye"  id={index} onClick={show_poem}></i>
                 </div>
                 <div className='delete'>
                 <i className="zmdi zmdi-delete" onClick={Delete} id={index}></i>
                 </div>
            </div>
       </div>

      </>)
      
    })}</div>
    
    <div className='second_page' style={{display:ini_state.hold==1?"block":"none"}}>
      <div className='contents'>
        <div className='title'>
           <h1>{ini_state.title}</h1>
        </div>
        <div className='content'>
            <h1>{ini_state.content}</h1>

        </div>
        <div className='by'>
             <h1>{ini_state.owner}</h1>
        </div>
        <div className='update'>
          <input type="submit" value="Update"/>
        </div>
        
      </div>
    </div>

  </>

);}

export default Poem;