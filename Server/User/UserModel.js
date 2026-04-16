const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    Name:{type:String,default:null},
    Email:{type:String,default:null},
    Password:{type:String,default:null},
    UserType:{type:String,default:null},
    CustomerId:{type:String,default:null},
    VenderId:{type:String,default:'Active'},
    Status:{type:String,default:'Pending'},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model('users',UserSchema)  