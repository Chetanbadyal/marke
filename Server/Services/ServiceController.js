{/*const Service =require("./ServiceModel")
const {uploadImg} = require("../../CloudinaryConfig");




add=(req,res)=>{
    let validationError=[];
    if (!req.body.ServiceName)
    {
        validationError.push("ServiceName is requires")
    }
    if (!req.body.Price)
    {
        validationError.push("Price is required")

    }
    if (!req.body.description) {
        validationError.push("description is requires")
    }
    if (!req.file) {
        validationError.push("image is required")
    }
    if (!req.body.VenderId){
        validationError.push("VenderId is required")
    }
    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            Message: "Validation Error occurs",
            error: validationError
        })
    }
    else{
        Service.findOne({ ServiceName: req.body.ServiceName })
                    .then((ServiceData) => {
                        if (!ServiceData) {
                          (async ()=>{
                    let image = "Attachment not available";
                        if (req.file) {
                            try {
                                const imageUrl = await uploadImg(req.file.buffer, `marketmeet/${Date.now()}`);
                                image = imageUrl;
                            } catch (err) {
                                console.error("Cloudinary upload error:", err);
                                return res.status(500).json({
                                    success: false,
                                    status: 500,
                                    message: "Image upload failed",
                                    error: err.message || err
                                });
                            }
                        }

                            let ServiceObj = new Service()
                            ServiceObj.ServiceName = req.body.ServiceName;
                            ServiceObj.Price = req.body.Price;
                            ServiceObj.description = req.body.description;
                            ServiceObj.ServiceImage = image;
                            ServiceObj.VenderId = req.body.VenderId;

                            ServiceObj.save()
                   .then((savedData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"DATA ADDED SUCCESSFULLY",
                        data:savedData
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
                })()
            }
            else{
                res.json({
                    status:422,
                    success:false,
                    message:"DATA ALREADY EXISTS",
                    data:ServiceData
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
getall = async(req,res)=>{
    let totalCount = await Service.countDocuments().exec()

    Service.find()
    .then((ServiceData)=>{
        res.json({
            status:200,
            success:true,
            messsage:"DATA LOADED SUCCESSFULLY",
            data:ServiceData,
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
        Service.findOne({_id:req.body._id})
        .then((ServiceData)=>{
            if(!ServiceData){
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
                data:ServiceData
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
        Service.findOne({_id:req.body._id})
        .then((ServiceData)=>{
            if(!ServiceData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
               Service.deleteOne({_id:req.body._id})
               .then(()=>{
                res.json({
                    status:200,
                    success:true,
                    message:"DATA DELETED SUCCESSFULLY",
                    data:ServiceData
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
    Service.findOne({_id:req.body._id})
        .then((ServiceData)=>{
            if(!ServiceData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found."
                })
            }
            else{
                if(req.body.ServiceName){
                    ServiceData.ServiceName=req.body.ServiceName
                }
                if(req.body.Price){
                    ServiceData.Price=req.body.Price
                }
                 if(req.body.description){
                    ServiceData.description=req.body.description
                }
                 if(req.body.ServiceImage){
                    ServiceData.ServiceImage=req.body.ServiceImage
                }
                if(req.body.VendorId){
                    ServiceData.VendorId=req.body.VendorId
                }
                ServiceData.save()
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


