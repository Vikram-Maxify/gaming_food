const mongoose =require("mongoose");

const authSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    credit:{
        type:Number,
        default:0
    
    },
    role:{
        type:String,
        default:"user"
    }

},{timestamps:true})


const User = mongoose.model("auth",authSchema)
module.exports=User;