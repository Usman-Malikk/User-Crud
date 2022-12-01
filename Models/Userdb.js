import mongoose from "mongoose";

let Schemaa = new mongoose.Schema(
    {
        email:
        {
          type:String,
          unique:true
        },
        name:
        {
            type:String,
            
        },
        phone:
        {
            type:String,
            
        },
        password:
        {
            type:String
        },
        gender:
        {
            type:String,
            // Required:true
        },age:
        {
            type:String,
            // Required:true
        },
        isAdmin:
        {
            type:Boolean,

        }
    }
)

export let a =  new mongoose.model("User",Schemaa)