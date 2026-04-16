const Customer = require("./CustomerModel")
const user = require("../User/UserModel")
const bcrypt = require("bcrypt")
const roundValue = 10



//Register 
Register =(req,res)=>{

    let validationErrors = [];

    if(!req.body.Name){
        validationErrors.push("Name is required")
    }
     if(!req.body.Email){
        validationErrors.push("Email is required")
    }
     if(!req.body.Password){
        validationErrors.push("Password is required")
    }
     if(!req.body.Contact){
        validationErrors.push("Contact is required")
    }
     if(!req.body.Address){
        validationErrors.push("Address is required")
    }

    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            errors:validationErrors
        })
    }
    else{
        Customer.findOne({Email:req.body.Email}).
        then((customerData)=>{
            if(!customerData){
               let userObj = new user()
               userObj.Name = req.body.Name
               userObj.Email = req.body.Email
               userObj.Password = bcrypt.hashSync(req.body.Password,roundValue)
               userObj.save()
               .then((userResData)=>{
            let customerObj = new Customer()
            customerObj.Name = req.body.Name
            customerObj.Email = req.body.Email
            customerObj.Password = req.body.Password
            customerObj.Contact = req.body.Contact
            customerObj.Address = req.body.Address
            customerObj.userType = 3
            customerObj.userId = userResData._id
            customerObj.save().
              then((cusResData)=>{
                userObj.customerId = cusResData._id
                userObj.save()
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"User Registered successfully",
                        data:cusResData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        errors:err.message
                    })
                })
              })
              .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        errors:err.message
                    })
                })

               })
            }
            else{
                res.json({
                    status:422,
                    success:false,
                    message:"User already exists",
                    data:customerData
                })
            }
        })
        .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        errors:err.message
                    })
                })
    }

   
}

module.exports={Register}