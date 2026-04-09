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
        Booking.findOne({ BookingName: req.body.BookingName })
            .then((CategoryData) => {
                if (!CategoryData) {
                    let CategoryObj = new Category()
                    CategoryObj.BookingName = req.body.BookingName;
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
module.exports={add}