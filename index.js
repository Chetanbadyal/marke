const express=require("express")
const app =express()
const config = require("./Config/db")
const port=3786 ;

app.use(express.urlencoded({extended:false}))
app.use(express.json())
const Rout=require("./Routes/apiRoutes");
app.use("/api",Rout)
// app.get("/",function(req,res){
//     res.send("Hello Chetan")
// })
app.listen(port,()=>{
    console.log("hi i am running")
}
)