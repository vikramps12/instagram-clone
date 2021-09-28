const express = require('express')
const router =  require('express').Router()
const mongoose = require('mongoose')
const requirelogin = require('../middleware/requirelogin')
const Post = mongoose.model("post")

router.get("/allpost",requirelogin,(req,res)=>{
    Post.find()
    .populate("postedby","_id name")
    .then(posts =>{
        //console.log(posts)
        res.json({posts})
    })
    .catch(err =>{
        console.log(err)
    })  
    
})
router.post('/createpost',requirelogin,(req,res)=>{
    const {title,body,pic} = req.body
    console.log(title,body,pic)
    if(!title || !body || !pic)
    {
        return res.status(422).json({error:"please fill all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,body,
        photo:pic,
        postedby:req.user
    })
    post.save().then(result =>{
        res.json({post:result})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.get('/mypost',requirelogin,(req,res)=>{
    Post.find({postedby:req.user._id})
    .populate("postedby","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err =>{
        console.log(err)
    })  
    
})

router.put('/like',requirelogin,(res,req)=>{
    console.log(req.req.body);
    Post.findByIdAndUpdate(req.req.body.postId,{

        $push:{likes:req.req.user._id}
    },
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            console.log(err);
            //return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    });
})
router.put('/unlike',requirelogin,(res,req)=>{
    Post.findByIdAndUpdate(req.req.postId,{
        $pull:{likes:req.req.user._id}
    },
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
module.exports = router

//npm i react-router-dom