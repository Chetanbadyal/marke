const router =require("express").Router()

const CategoryController=require("../Server/Category/CategoryController")
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
//service
router.post("/Service/add",fileUpload.single("ServiceImage"),ServiceController.add)





//Booking
router.post("/Booking/add",BookingController.add)

module.exports=router;