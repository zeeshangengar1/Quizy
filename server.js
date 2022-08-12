const express=require("express")
const request=require("request")
const app=express()
const ejs=require("ejs")
const bodyParser = require('body-parser')
const fs=require("fs")

app.use(bodyParser.urlencoded({extended:true}))
// const express=require("express")


// api
// https://opentdb.com/api.php?amount={amount}&category={cat}&difficulty={diff}&type=multiple

app.set("view engine",'ejs')
app.use(express.static("public"))
app.get("/",function(req,res)
{
    res.render('form')
})

app.post("/",function(req,res)
{
   
    amount=req.body.numb;
    cat=req.body.cat;
    diff=req.body.diff;
    // console.log(amount, cat, diff)
    var options={
        url:'https://opentdb.com/api.php',
        method:'GET',
        qs:{
            amount:amount,
            category:cat,
            difficulty:diff,
            type:'multiple'
        }

    }
    request(options,(err,response,body)=>{
        if(err) console.log(err)
            console.log(body)
            var data=JSON.parse(body)
            var questions=data.results;
            console.log(questions)
            res.render('index',{ques:questions})
        }
    )
})

let port=process.env.PORT;
if(port=="" || port==null){
    port=3000;
}

app.listen(port,function(){
    console.log("Server Running Up")
})