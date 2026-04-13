const router =require("express").Router()

const CategoryController=require("../Server/Category/CategoryController")
const EnquiryController = require("../Server/Enquiry/EnquiryController")
const ServiceController=require("../Server/Services/ServiceController")
const BookingController=require("../Server/Booking/BookingController")
const multer=require("multer")
const storage=multer.memoryStorage()
const fileUpload=multer({storage})
//category
router.post("/Category/add",CategoryController.add)
router.post("/Category/getall",CategoryController.getall)
router.post("/Category/getsingleData",CategoryController.getsingleData)
router.post("/Category/deleteData",CategoryController.deleteData)
router.post("/Category/updateData",CategoryController.updateData)
//service
router.post("/Service/add",fileUpload.single("ServiceImage"),ServiceController.add)
router.post("/Service/getall",ServiceController.getall)
router.post("/Service/getsingleData",ServiceController.getsingleData)
router.post("/Service/deleteData",ServiceController.deleteData)
router.post("/Service/updateData",ServiceController.updateData)


//Enquiry
router.post("/Enquiry/add",EnquiryController.add)
//Booking
router.post("/Booking/add",BookingController.add)

module.exports=router;