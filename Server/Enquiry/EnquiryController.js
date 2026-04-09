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
module.exports={
    add
}