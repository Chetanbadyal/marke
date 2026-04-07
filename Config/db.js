const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/Marketmeet")
.then((res)=>{
    console.log("database connected succesfully")
})
.catch((err)=>{
    console.log(" !!! database not connected ")
})