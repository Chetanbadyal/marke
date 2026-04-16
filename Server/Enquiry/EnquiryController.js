const Enquiry = require("./enquiryModel");

const add = (req, res) => {
    const validationError = [];

    if (!req.body.EnquiryName) {
        validationError.push("EnquiryName is required");
    }
    if (!req.body.Email) {
        validationError.push("Email is required");
    }
    if (!req.body.Subject) {
        validationError.push("Subject is required");
    }
    if (!req.body.Message) {
        validationError.push("Message is required");
    }

    if (validationError.length > 0) {
        return res.json({
            status: 422,
            success: false,
            message: "Validation error occurs",
            error: validationError
        });
    }

    Enquiry.findOne({ EnquiryName: req.body.EnquiryName })
        .then((enquiryData) => {
            if (enquiryData) {
                return res.json({
                    status: 409,
                    success: false,
                    message: "Enquiry already exists",
                    data: enquiryData
                });
            }

            const enquiryObj = new Enquiry({
                EnquiryName: req.body.EnquiryName,
                Email: req.body.Email,
                Subject: req.body.Subject,
                Message: req.body.Message
            });

            enquiryObj.save()
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
        const totalCount = await Enquiry.countDocuments().exec();
        const enquiryData = await Enquiry.find();

        res.json({
            status: 200,
            success: true,
            message: "DATA LOADED SUCCESSFULLY",
            data: enquiryData,
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

    Enquiry.findOne({ _id: req.body._id })
        .then((enquiryData) => {
            if (!enquiryData) {
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
                data: enquiryData
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

    Enquiry.findOne({ _id: req.body._id })
        .then((enquiryData) => {
            if (!enquiryData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Data not found"
                });
            }

            Enquiry.deleteOne({ _id: req.body._id })
                .then(() => {
                    res.json({
                        status: 200,
                        success: true,
                        message: "DATA DELETED SUCCESSFULLY",
                        data: enquiryData
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

    Enquiry.findOne({ _id: req.body._id })
        .then((enquiryData) => {
            if (!enquiryData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "Data not found."
                });
            }

            if (req.body.EnquiryName) {
                enquiryData.EnquiryName = req.body.EnquiryName;
            }
            if (req.body.Email) {
                enquiryData.Email = req.body.Email;
            }
            if (req.body.Subject) {
                enquiryData.Subject = req.body.Subject;
            }
            if (req.body.Message) {
                enquiryData.Message = req.body.Message;
            }

            enquiryData.save()
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

