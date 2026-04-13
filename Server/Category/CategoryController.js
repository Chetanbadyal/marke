const Category = require("./CategoryModel");
//add
add = (req, res) => {
    //validation Error
    let validationError = [];
    if (!req.body.CategoryName) {
        validationError.push("CategoryName is requires")
    }
    if (!req.body.description) {
        validationError.push("description is requires")
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
        Category.findOne({ CategoryName: req.body.CategoryName })
            .then((CategoryData) => {
                if (!CategoryData) {
                    let CategoryObj = new Category()
                    CategoryObj.CategoryName = req.body.CategoryName;
                    CategoryObj.description = req.body.description;
                    CategoryObj.save()
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
                        data: categoryData
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
getall = async (req, res) => {
    let totalCount = await Category.countDocuments().exec()

    Category.find()
        .then((CategoryData) => {
            res.json({
                status: 200,
                success: true,
                messsage: "DATA LOADED SUCCESSFULLY",
                data: CategoryData,
                total: totalCount
            })
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "INTERNAL SERVER ERROR",
                error: err.message
            })
        })
}
getsingleData = (req, res) => {
    let validationErrors = []

    if (!req.body._id) {
        validationErrors.push("id is required")
    }

    if (validationErrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation errors occurs",
            error: validationErrors
        })
    }

    else {
        Category.findOne({ _id: req.body._id })
            .then((CategoryData) => {
                if (!CategoryData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "DATA LOADED SUCCESSFULLY",
                        data: CategoryData
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "INTERNAL SERVER ERROR",
                    error: err.message
                })
            })
    }
}
deleteData=(req,res)=>{
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
        Category.findOne({_id:req.body._id})
        .then((CategoryData)=>{
            if(!CategoryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
               Category.deleteOne({_id:req.body._id})
               .then(()=>{
                res.json({
                    status:200,
                    success:true,
                    message:"DATA DELETED SUCCESSFULLY",
                    data:CategoryData
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
updateData = (req,res)=>{
    let validationErrors = [];

    if(!req.body._id){
        validationErrors.push("Id is required")
    }

   

    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"VALIDATION ERROR OCCURS",
            error:validationErrors
        })
    }

    else{
        category.findOne({_id:req.body._id})
        .then((categoryData)=>{
            if(!categoryData){
               res.json({
                    status:404,
                    success:false,
                    message:"DATA NOT FOUND",
                    
                })
            }
            else{
                

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
                if(req.body.categoryName){
                    categoryData.categoryName = req.body.categoryName
                }
                if(req.body.description){
                    categoryData.description = req.body.description
                }
                if(req.file){
                    categoryData.categoryImage = image
                }
                categoryData.save()
                .then((savedData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"DATA UPDATED SUCCESSFULLY",
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


module.exports = { add, getall, getsingleData,deleteData,updateData}