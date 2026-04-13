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
    Category.findOne({_id:req.body._id})
        .then((CategoryData)=>{
            if(!CategoryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found."
                })
            }
            else{
                if(req.body.CategoryName){
                    CategoryData.CategoryName=req.body.CategoryName
                }
                if(req.body.description){
                    CategoryData.description=req.body.description
                }
              
                CategoryData.save()
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

module.exports = { add, getall, getsingleData,deleteData,updateData }