import express from 'express'
import { verifytoken, verifyuser } from '../Auth/jwt.js'
import { createuser, Deleteuser, getalluser, getbyid, login, updateuser } from '../Controller/User.js'
import {a} from '../Models/Userdb.js'

let Router =  express.Router()

// Get all user 
Router.post('/create',createuser)


// Delete User
Router.delete('/delete/:id',Deleteuser)

// Update user
Router.put("/update/:id",updateuser)


// get All user 

Router.get('/',verifytoken,getalluser)


// get user by id 

Router.get("/byid/:id",getbyid)


// Login  the user
Router.post("/Login",login)


export default Router