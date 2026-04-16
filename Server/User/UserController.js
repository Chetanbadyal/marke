const user = require("./UserModel")
const bcrypt = require("bcrypt")


login= (req,res) =>{
    let validationErrors = []
   
    if(!req.body.Email){
        validationErrors.push("Email is required")
    }
    if(!req.body.Password){
        validationErrors.push("Password is required")
    }

    if(validationErrors.length > 0){
        res.json({
            status:422,
            success:false,
            message:"validation error occurs",
            error:validationErrors
        })
    }
    else{
        user.findOne({Email:req.body.Email})
        .then((userData) =>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"Email not matched"
                })
            }
            else{
                bcrypt.compare(req.body.Password,userData.Password,function(err,result){
                    if(result){
                        res.json({
                           status:200,
                           success:true,
                           message:"Login successfull",
                           data:userData 
                        })
                    }
                    else{
                        res.json({
                            status:404,
                            success:false,
                            message:"Password not matched"
                        })
                    }
                })
            }
        })
        .catch((err) =>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err.message
            })
        })
    }
}

module.exports= {login}