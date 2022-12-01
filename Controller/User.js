import express from "express";
import { a } from "../Models/Userdb.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";

// create User
export let createuser = async (req, res) => {
  console.log(req.body);
  const hash =  bcrypt.hashSync(req.body.password, 5);

  console.log(req.body.firstName);
  let newuser = new a({
    email: req.body.email,
    password: hash,
    name: req.body.firstName,
    phone: req.body.phone,
    gender: req.body.gender,
    age: req.body.age,
  });
  console.log(newuser)
  try {
    let saveuser = await newuser.save();
    res.json({
      success: true,
      message: "user created",
      user: saveuser,
    });
  } catch (e) {
    res.json({
      success: false,
      messgae: "user not created",
      error:e
    });
  }
};

// Delete User

export let Deleteuser = async (req, res) => {
  let deleteuser = await a.findByIdAndDelete(req.params.id);

  try {
    res.json({
      success: true,
      message: "User has been deleted",
    });
  } catch {
    res.json({
      success: false,
      message: "User not found",
    });
  }
};

// Update User
export let updateuser = async (req, res) => {
  let updateuser = await a.findByIdAndUpdate(req.params.id, { $set: req.body });
  try {
    res.json({
      success: true,
      messgae: "user has been updated",
      user: updateuser,
    });
  } catch {
    res.json({
      success: true,
      messgae: "user has been updated",
      user: updateuser,
    });
  }
};

// get user
export let getalluser = async (req, res) => {
  let alluser = await a.find();
  try {
    res.json({
      success: true,
      users: alluser,
    });
  } catch {
    res.json({
      success: false,
      message: "user's not found",
    });
  }
};

//  Get user by id

export let getbyid = async (req, res) => {
  let user = await a.findById(req.params.id);
  try {
    res.json({
      success: true,
      user: user,
    });
  } catch {
    res.json({
      success: false,
      message: "user's not found",
    });
  }
};

// login

export let login = async (req, res) => {
  console.log(req.body.email);
  let user = await a.findOne({ email: req.body.email });
  console.log(user);
  if (user == null) {
    return res.json({ success: false, message: "Wrong Credentials" });
  }
  const isPassword = await bcrypt.compare(req.body.password, user.password);

  if (isPassword) {
    let access_token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "agdhsahdhsadhvsagdhsvagjdvgajgjsacgjdgsacgdcg"
    );
    res.cookie("access_token", access_token).json({
      success: true,
      message: "user logged In ",
      token: access_token,
      user: user,
    });
  } else {
    res.json({
      success: false,
      message: "user not found",
    });
  }
};
