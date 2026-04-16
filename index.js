const express = require("express")
const app = express()
const port = 5005;
const Config=require("./Config/db")

app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:'50mb'}))
const routes = require("./Routes/apiRoutes")
app.use("/api",routes)

app.listen(port,()=>{
    console.log("MY PROJECT IS RUNNING ON PORT"+" "+port)
})