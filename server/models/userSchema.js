const mongoose=require('mongoose');

const schema=new mongoose.Schema({

    _id:{type:Number,required:true},
    email:{type:String,required:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String},

        poem:{type:Array},
        story:{type:Array},
        quotes:{type:Array}
    
    
});

const Model=new mongoose.model('Model',schema);

module.exports=Model;