const router =require("express").Router()
const CategoryController=require("../Server/Category/CategoryController")


router.post("/Category/add",CategoryController.add)
router.post("/Category/getall",CategoryController.getall)
router.post("/Category/getsingleData",CategoryController.getsingleData)
router.post("/Category/deleteData",CategoryController.deleteData)


module.exports=router;