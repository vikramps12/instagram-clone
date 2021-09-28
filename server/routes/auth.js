const express = require('express')
const router =  require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../key')
const requirelogin = require('../middleware/requirelogin')

router.post('/signup',(req,res)=>{
    const {name,email,password} =  req.body
    console.log(name,email,password)
    if(!email || !password || !name)
    {
        return res.status(422).json({error:"Please add all the fields"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with this email"})
        }
        console.log("came here 1")
        bcrypt.hash(password,12)
        .then(hashedpassword =>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
            console.log("came here")
            user.save()
            .then(user =>{
                res.json({message:"saved successfully"})
            })
            .catch(err =>{
                console.log(err)
            })
        })
        .catch(err =>{
            console.log(err)
        })
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const{email,password} = req.body
    if(!email || !password)
    {
        return res.status(422).json({error:"Please fill all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        // console.log(bcrypt.password)
        .then(domatch =>{
            if(domatch)
            {
                //res.json({message :"Successfully loged in"})
                const token = jwt.sign({ _id:savedUser._id},JWT_SECRET)
                const {_id,name,email} = savedUser
                res.json({token,user:{_id,name,email}})
            }
            else
            {
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

// bcryptjs for hashing password
// jsonwebtoken => to give user a token
module.exports = router