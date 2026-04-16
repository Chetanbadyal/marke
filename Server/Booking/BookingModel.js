const mongoose=require("mongoose")
const BookingSchema=new mongoose.Schema({
    
    ServiceId:{type:String,default:null},
    VendorId:{type:String,default:null},
    CustomerId:{type:String,default:null},
    BookingDate:{type:String,default:Date.now()},
    BookingTime:{type:String,default:null},
    AlternativeContact:{type:String,default:null},
    Address:{type:String,default:null},
    Status:{type:String,default:'Pending'},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=new mongoose.model('Booking',BookingSchema)