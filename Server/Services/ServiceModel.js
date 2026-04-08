const mongoose=require("mongoose")
const ServiceSchema=new mongoose.Schema({
    ServiceName:{type:String,default:null},
    Price:{type:Number,default:null},
    description:{type:String,default:null},
    ServiceImage:{type:String,default:null},
    VenderId:{type:String,default:null},
    Status:{type:String,default:'Active'},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model('Service',ServiceSchema)  