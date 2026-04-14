const Enquiry=require("./EnquiryModel")
add = (req, res) => {
    //validation Error
    let validationError = [];
    if (!req.body.EnquiryName) {
        validationError.push("EnquiryName is requires")
    }
    if (!req.body.Email) {
        validationError.push("Email is requires")
    }
      if (!req.body.Subject) {
        validationError.push("Subject is requires")
    }
      if (!req.body.Message) {
        validationError.push("Message is requires")
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
        Enquiry.findOne({ EnquiryName: req.body.EnquiryName })
            .then((EnquiryData) => {
                if (!EnquiryData) {
                    let EnquiryObj = new Enquiry()
                    EnquiryObj.EnquiryName = req.body.EnquiryName;
                    EnquiryObj.Email= req.body.Email;
                    EnquiryObj.Subject= req.body.Subject;
                    EnquiryObj.Message= req.body.Message;

                    EnquiryObj.save()
                        .then((savedata) => {
                            res.json({
                                status: 200,
                                success: true,
                                Message:"data added successfully",
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
                        data: EnquiryData
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
    let totalCount = await Enquiry.countDocuments().exec()

    Enquiry.find()
    .then((EnquiryData)=>{
        res.json({
            status:200,
            success:true,
            messsage:"DATA LOADED SUCCESSFULLY",
            data:EnquiryData,
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
        Enquiry.findOne({_id:req.body._id})
        .then((EnquiryData)=>{
            if(!EnquiryData){
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
                data:EnquiryData
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
        Enquiry.findOne({_id:req.body._id})
        .then((EnquiryData)=>{
            if(!EnquiryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
               Enquiry.deleteOne({_id:req.body._id})
               .then(()=>{
                res.json({
                    status:200,
                    success:true,
                    message:"DATA DELETED SUCCESSFULLY",
                    data:EnquiryData
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
    Enquiry.findOne({_id:req.body._id})
        .then((EnquiryData)=>{
            if(!EnquiryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found."
                })
            }
            else{
                if(req.body.EnquiryName){
                    EnquiryData.EnquiryName=req.body.EnquiryName
                }
                if(req.body.Email){
                    EnquiryData.Price=req.body.Email
                }
                 if(req.body.Subject){
                    EnquiryData.Subject=req.body.Subject
                }
                 if(req.body.Message){
                    EnquiryData.Message=req.body.Message
                }
                EnquiryData.save()
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