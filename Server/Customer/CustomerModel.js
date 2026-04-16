const mongoose=require("mongoose")
const CustomerSchema=new mongoose.Schema({
    Name:{type:String,default:null},
    Email:{type:String,default:null},
    Password:{type:String, default:null},
    Contact:{type:String,default:null},
    Address:{type:String,default:null},
    userType:{type:Number,default:3},//1-admin,2-lawyers,3-customer
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:"users"},
    status:{type:String,default:"Active"},
    createdAt:{type:Date, default:Date.now()},

})
module.exports=new mongoose.model("customers",CustomerSchema)
