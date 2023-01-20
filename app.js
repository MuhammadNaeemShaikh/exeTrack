const express = require ('express');
const mongoose = require('mongoose');
const excerciseroutes = require('./router/ETrouter')
const cors = require ('cors')
require('dotenv').config()
const port=process.env.PORT || 9000
const path = require('path')

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
    extended: false
}));

//mongo db connection
const dbUrl = process.env.ATLASURI
mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
    app.use(express.static(path.join(__dirname,"./client/build")))
    app.get("*",function(_,res){
        res.sendFile(
            path.join(__dirname,'./client/build/index.html'),
            function (err){
                res.status(500).send(err);
            }
        )
    })
    app.listen(port,()=>console.log("app is listening"))
})
.catch((err)=>console.log(err));



//routes file
app.use(excerciseroutes);