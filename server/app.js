const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const multer=require('multer');
const cors=require('cors');
const fs=require('fs');

const app=express();

 mongoose.connect("mongodb://localhost:27017/writer",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("Connection successful....")})
.catch((err)=>{console.log(err)}); 

app.use(express.urlencoded({ extended: true }));  
app.use(express.json());
app.use(cors());

const receive=require('./models/multer');
const upload=multer({storage:receive});

const userModel=require('./models/userSchema');

var userDetails={_id:"",userName:"",imageName:"",email:"",password:"",poem:[],story:[],quote:[]};


app.post("/auth_data",upload.single('file'),async (req,res,next)=>{

    try{
        
    const {body:{validity}}=await req;
    console.log(req.body.validity);
    
    const store=JSON.parse(req.body.validity);
    //console.log(store); 
    const showData=await userModel.find( { $and:[  {name:store.name},{password:store.password } ] } ).select({_id:1,name:1,email:1,image:1,password:1,poem:1,story:1,quotes:1}); 
    const expressData=showData[0];
    

   // console.log("show data",showData); 
    const read=fs.readFileSync("./uploads/Images/"+expressData.image);
    //console.log("\\\\\\\\\\\\\\\\\\\\\\\\",showData[0].story);
    userDetails={_id:showData[0]._id,userName:showData[0].name,imageName:read.toString('base64'),email:showData[0].email,password:showData[0].password,poem:showData[0].poem,story:showData[0].story,quote:showData[0].quotes}
    

    return res.status(200).json({auth:true});}

    catch(error){
        console.log(error);
    }

});



app.post("/create_data",upload.single('file'),async (req,res,next)=>{
    
    try{

    const {file,body:{signup}}=await req;
    
    console.log(req.file.originalname);
    const imageName=req.file.originalname;
    const _id=Math.ceil(Math.random()*10000);
    const store=JSON.parse(req.body.signup);

    //console.log("..............",req.file.filename);
    //console.log("..............",store);

    const UserCreate=new userModel({
        _id:_id,email:store.email,name:store.name,password:store.password,image:req.file.filename
    })

    const storeData=await userModel.insertMany([UserCreate]);
    const read=fs.readFileSync("./uploads/Images/"+req.file.filename);
    userDetails={_id:_id,userName:store.name,imageName:read.toString('base64'),email:store.email,password:store.password,poem:[],story:[],quote:[]}
    return res.status(200).json({check:true});}
    
    catch(error){
        console.log(error);
    }

});

app.get("/create_data",async (req,res)=>{

    try{
        //console.log(userDetails);
        return res.status(200).json({hold:userDetails});}

    catch(err){
        console.log(err);
    }});

/* app.post("delete_data",async(res,req)=>{
    const Delete=await userModel.deleteOne({$and:[{_id:res._id},{name:res.name}]});
    return res.status(200).json({check:true});

})*/

app.get("/create_poem",async(req,res)=>{
    try{
    const get_content=userDetails.poem;
    const get_id=userDetails._id;
    const get_name=userDetails.userName;
    const user=await userModel.find({$and:[{_id:get_id},{name:get_name}]}).select({poem:1});
    console.log("{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}",user[0],get_id,get_name);
    
    console.log("{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}",get_content);
    return res.status(200).json({contents:user[0].poem});}

    catch(err){
        console.log(err);
    }
}); 

app.get("/create_story",async(req,res)=>{
    try{
    const get_content=userDetails.story;
    const get_id=userDetails._id;
    const get_name=userDetails.userName;
    const user=await userModel.find({$and:[{_id:get_id},{name:get_name}]}).select({story:1});

    console.log("{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}",get_content);
    return res.status(200).json({contents:user[0].story});}

    catch(err){
        console.log(err);
    }
}); 

app.get("/create_quote",async(req,res)=>{
    try{
    const get_content=userDetails.quote;
    const get_id=userDetails._id;
    const get_name=userDetails.userName;
    const user=await userModel.find({$and:[{_id:get_id},{name:get_name}]}).select({poem:1});

    console.log("{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}",get_content);
    return res.status(200).json({contents:user[0].quotes});}

    catch(err){
        console.log(err);
    }
}); 


app.post("/get_poem",async (req,res)=>{
    
    try{
        const {cur_poem}= req.body;console.log(";;;;;;;;;;;;;;;;;",cur_poem);

       console.log(".........",userDetails);
       const Data=await userModel.find( {_id:userDetails._id} ).select({_id:1,name:1,email:1,image:1,password:1,poem:1,story:1,quotes:1}); 
       console.log(Data);
       console.log(Data[0]);

       const UpdateItem= await userModel.updateMany({_id:userDetails._id},{$set:{poem:cur_poem}});
    console.log(UpdateItem);}

    catch(err){
        console.log(err);
    }
});


app.post("/get_story",async (req,res)=>{
    
    try{
        const {cur_story}= req.body;console.log(";;;;;;;;;;;;;;;;;",cur_story);

       console.log(".........",userDetails);
       const Data=await userModel.find( {_id:userDetails._id} ).select({_id:1,name:1,email:1,image:1,password:1,poem:1,story:1,quotes:1}); 
       console.log(Data);
       console.log(Data[0]);

       const UpdateItem= await userModel.updateMany({_id:userDetails._id},{$set:{story:cur_story}});
    console.log(UpdateItem);}

    catch(err){
        console.log(err);
    }
});


app.post("/get_quote",async (req,res)=>{
    
    try{
        const {cur_quote}= req.body;console.log(";;;;;;;;;;;;;;;;;",cur_quote);

       //console.log(".........",userDetails);
       const Data=await userModel.find( {_id:userDetails._id} ).select({_id:1,name:1,email:1,image:1,password:1,poem:1,story:1,quotes:1}); 
       //console.log(Data);
       //console.log(Data[0]);

       const UpdateItem= await userModel.updateMany({_id:userDetails._id},{$set:{quotes:cur_quote}});
//    console.log(UpdateItem);
}

    

//app.get("/create_quote",async(req,res)=>{})

//app.post("/send_story",async (req,res )=>{})

app.listen(2000,()=>{console.log("Server started..")});
