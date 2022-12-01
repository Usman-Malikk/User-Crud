// Imports
import express from 'express'
import mongoose from "mongoose"
import check from "./Routes/User.js"
import cors from "cors"
import cookieparser from "cookie-parser"


// initialsing 
let app = express()
app.use(cors(
    {
        
        credentials:true
    }
))
app.use(cookieparser())
app.use(express.json())

app.use("/User",check)



// Mongo db Connectivity
    mongoose.connect("mongodb://127.0.0.1:27017/Check").then(()=>
    {
console.log("db connected")
    }).catch(()=>
    {
        console.log("error")
    })





// Middlewears



app.listen(4000,()=>
{
    console.log("server has been started")
})