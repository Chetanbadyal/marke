const Booking = require("./BookingModel");
//add
add = (req, res) => {
    //validation Error
    let validationError = [];
    if (!req.body.ServiceId) {
        validationError.push("ID is required")
    }
    if (!req.body.VendorId) {
        validationError.push("Vendorid is required")
    }
     if (!req.body.CustomerId) {
        validationError.push("C,ID is required")
     }
     if (!req.body.BookingDate) {
        validationError.push("Date is required")
     }
   if (!req.body.BookingTime) {
        validationError.push("Time is required")
     }
      if (!req.body.AlternativeContact) {
        validationError.push("A,T,C is required")
     }
      if (!req.body.Address) {
        validationError.push("Address is required")
     }

  
    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            Message: "Validation Error occurs",
            error: validationError
        })
    }
    //Dublicacy Check
    else {
        Booking.findOne({ ServiceId: req.body.ServiceId })
            .then((BookingData) => {
                if (!BookingData) {
                    let BookingObj = new Booking()
                    BookingObj.ServiceId = req.body.ServiceId;
                    BookingObj.VendorId = req.body.VinderId;
                    BookingObj.CustomerId = req.body.CustomerId;
                    BookingObj.BookingDate= req.body.BookingDate;
                    BookingObj.AlternativeContact = req.body.AlternativeContact;
                    BookingObj.Address = req.body.Address;
                    BookingObj.save()
                        .then((savedata) => {
                            res.json({
                                status: 200,
                                success: true,
                                Message: "data added successfully",
                                data: savedata
                            })

                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                Message: "internal server error",
                                error: err.message
                            })
                        })
                }
                else {
                    res.json({
                        status: 422,
                        success: false,
                        Message: "Data Already exists",
                        data: BookingData
                    })
                }
            })
            //Error check
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    Message: "internal server error",
                    error: err.message
                })
            })
    }


}
getall = async(req,res)=>{
    let totalCount = await Booking.countDocuments().exec()

    Booking.find()
    .then((BookingData)=>{
        res.json({
            status:200,
            success:true,
            messsage:"DATA LOADED SUCCESSFULLY",
            data:BookingData,
            total:totalCount
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"INTERNAL SERVER ERROR",
            error:err.message
        })
    })
}
getsingleData = (req,res)=>{
    let validationErrors = []

    if(!req.body._id){
        validationErrors.push("id is required")
    }

    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation errors occurs",
            error:validationErrors
        })
    }

    else{
        Booking.findOne({_id:req.body._id})
        .then((BookingData)=>{
            if(!BookingData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
               res.json({
                status:200,
                success:true,
                message:"DATA LOADED SUCCESSFULLY",
                data:BookingData
               }) 
            }
        })
        .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"INTERNAL SERVER ERROR",
            error:err.message
        })
    })
    }
}
deleteData = (req,res)=>{
    let validationErrors = []

    if(!req.body._id){
        validationErrors.push("id is required")
    }

    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation errors occurs",
            error:validationErrors
        })
    }

    else{
        Booking.findOne({_id:req.body._id})
        .then((BookingData)=>{
            if(!BookingData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
               Booking.deleteOne({_id:req.body._id})
               .then(()=>{
                res.json({
                    status:200,
                    success:true,
                    message:"DATA DELETED SUCCESSFULLY",
                    data:BookingData
                })
               })
               .catch((err)=>{
                 res.json({
                    status:500,
                    success:false,
                    message:"INTERNAL SERVER ERROR",
                    error:err.message
                })
               })
            }
        })
        .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"INTERNAL SERVER ERROR",
            error:err.message
        })
    })
    }
}
updateData=(req,res)=>{
     let validationErrors=[];
    if(!req.body._id){
        validationErrors.push("id is required")
    }
    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationErrors
        })
    }

    else{
    Booking.findOne({_id:req.body._id})
        .then((BookingData)=>{
            if(!BookingData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found."
                })
            }
            else{
                if(req.body.ServiceId){
                    BookingData.ServiceId=req.body.ServiceId
                }
                if(req.body.VendorId){
                    BookingData.VendorId=req.body.VendorId
                }
                 if(req.body.CustomerId){
                    BookingData.CustomerId=req.body.CustomerId
                }
                 if(req.body.BookingDate){
                    BookingData.BookingDate=req.body.BookingDate
                }
                if(req.body.BookingTime){
                    BookingData.BookingTime=req.body.BookingTime
                }
                if(req.body.AlternativeContact){
                    BookingData.AlternativeContact=req.body.AlternativeContact
                }
                if(req.body.Address){
                    BookingData.Address=req.body.Address
                }
                BookingData.save()
                .then((resData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated successfully.",
                        data:resData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error.",
                        error:err.message
                    })
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error.",
                error:err.message
            })
        })
    }
}
       
module.exports={
    add,getall,getsingleData,deleteData,updateData
}