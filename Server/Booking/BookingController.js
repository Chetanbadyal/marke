const Booking = require("./BookingModel");

const add = (req, res) => {
    const validationError = [];

    if (!req.body.ServiceId) {
        validationError.push("ServiceId is required");
    }
    if (!req.body.VendorId) {
        validationError.push("VendorId is required");
    }
    if (!req.body.CustomerId) {
        validationError.push("CustomerId is required");
    }
    if (!req.body.BookingDate) {
        validationError.push("BookingDate is required");
    }
    if (!req.body.BookingTime) {
        validationError.push("BookingTime is required");
    }
    if (!req.body.AlternativeContact) {
        validationError.push("AlternativeContact is required");
    }
    if (!req.body.Address) {
        validationError.push("Address is required");
    }

    if (validationError.length > 0) {
        return res.json({
            status: 422,
            success: false,
            message: "Validation error occurs",
            error: validationError
        });
    }

    Booking.findOne({ ServiceId: req.body.ServiceId })
        .then((bookingData) => {
            if (bookingData) {
                return res.json({
                    status: 409,
                    success: false,
                    message: "Booking already exists for this ServiceId",
                    data: bookingData
                });
            }

            const bookingObj = new Booking({
                ServiceId: req.body.ServiceId,
                VendorId: req.body.VendorId,
                CustomerId: req.body.CustomerId,
                BookingDate: req.body.BookingDate,
                BookingTime: req.body.BookingTime,
                AlternativeContact: req.body.AlternativeContact,
                Address: req.body.Address
            });

            bookingObj.save()
                .then((savedata) => {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Data added successfully",
                        data: savedata
                    });
                })
                .catch((err) => {
                    res.json({
                        status: 500,
                        success: false,
                        message: "Internal server error",
                        error: err.message
                    });
                });
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            });
        });
};

const getall = async (req, res) => {
    try {
        const totalCount = await Booking.countDocuments().exec();
        const bookingData = await Booking.find();

        res.json({
            status: 200,
            success: true,
            message: "DATA LOADED SUCCESSFULLY",
            data: bookingData,
            total: totalCount
        });
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "INTERNAL SERVER ERROR",
            error: err.message
        });
    }
};

const getsingleData = (req, res) => {
    const validationErrors = [];

    if (!req.body._id) {
        validationErrors.push("id is required");
    }

    if (validationErrors.length > 0) {
        return res.json({
            status: 422,
            success: false,
            message: "Validation errors occurs",
            error: validationErrors
        });
    }

    Booking.findOne({ _id: req.body._id })
        .then((bookingData) => {
            if (!bookingData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Data not found"
                });
            }

            res.json({
                status: 200,
                success: true,
                message: "DATA LOADED SUCCESSFULLY",
                data: bookingData
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "INTERNAL SERVER ERROR",
                error: err.message
            });
        });
};

const deleteData = (req, res) => {
    const validationErrors = [];

    if (!req.body._id) {
        validationErrors.push("id is required");
    }

    if (validationErrors.length > 0) {
        return res.json({
            status: 422,
            success: false,
            message: "Validation errors occurs",
            error: validationErrors
        });
    }

    Booking.findOne({ _id: req.body._id })
        .then((bookingData) => {
            if (!bookingData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Data not found"
                });
            }

            Booking.deleteOne({ _id: req.body._id })
                .then(() => {
                    res.json({
                        status: 200,
                        success: true,
                        message: "DATA DELETED SUCCESSFULLY",
                        data: bookingData
                    });
                })
                .catch((err) => {
                    res.json({
                        status: 500,
                        success: false,
                        message: "INTERNAL SERVER ERROR",
                        error: err.message
                    });
                });
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "INTERNAL SERVER ERROR",
                error: err.message
            });
        });
};

const updateData = (req, res) => {
    const validationErrors = [];

    if (!req.body._id) {
        validationErrors.push("id is required");
    }

    if (validationErrors.length > 0) {
        return res.json({
            status: 422,
            success: false,
            message: "Validation error occurs",
            error: validationErrors
        });
    }

    Booking.findOne({ _id: req.body._id })
        .then((bookingData) => {
            if (!bookingData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Data not found."
                });
            }

            if (req.body.ServiceId) {
                bookingData.ServiceId = req.body.ServiceId;
            }
            if (req.body.VendorId) {
                bookingData.VendorId = req.body.VendorId;
            }
            if (req.body.CustomerId) {
                bookingData.CustomerId = req.body.CustomerId;
            }
            if (req.body.BookingDate) {
                bookingData.BookingDate = req.body.BookingDate;
            }
            if (req.body.BookingTime) {
                bookingData.BookingTime = req.body.BookingTime;
            }
            if (req.body.AlternativeContact) {
                bookingData.AlternativeContact = req.body.AlternativeContact;
            }
            if (req.body.Address) {
                bookingData.Address = req.body.Address;
            }

            bookingData.save()
                .then((resData) => {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Data updated successfully.",
                        data: resData
                    });
                })
                .catch((err) => {
                    res.json({
                        status: 500,
                        success: false,
                        message: "Internal server error.",
                        error: err.message
                    });
                });
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error.",
                error: err.message
            });
        });
};

module.exports = {
    add,
    getall,
    getsingleData,
    deleteData,
    updateData
};
