const Service =require("./ServiceModel")
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
                                const imageUrl = await uploadImg(req.file.buffer, `node2026/${Date.now()}`);
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
                    data:categoryData
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
        
module.exports={
    add
}