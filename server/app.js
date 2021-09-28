const express = require("express");
const app = express();
const mongoose = require("mongoose")
const PORT = 5000;
const {MONGOURL} = require('./key')

mongoose.connect(MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongo succefully")
})
mongoose.connection.on("error",(err)=>{
    console.log("error in connecting",err);
})
   
require("./models/user")
require("./models/post")

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))

app.listen(PORT,()=>{
    console.log("server is running in",PORT);
})

// use cors to data share bw 2 ports
// use proxy in package.json 