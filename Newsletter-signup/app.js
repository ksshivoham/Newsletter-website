const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const path=require("path");
const app=express();
app.use("/public",express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res)
{
res.sendFile(__dirname+"/signup.html")
});
app.post("/",function(req,res)
{
var fName=req.body.fName;
var lName=req.body.lName;
var email=req.body.email;
var data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fName,
                LNAME:lName
            }
        }
    ]
};
var jsonData=JSON.stringify(data);
const url="https://us17.api.mailchimp.com/3.0/lists/eb268b3b85";
const options={
    method:"POST",
    auth:"ksshivoham:5a7cd741fd08f98d398467133780b910-us17"
}
const request=https.request(url,options,function(response)
{
    if(response.statusCode===200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else
    {
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data)
{
    console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res)
{
res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
console.log("newsletter server started");
});





// api key
// 5a7cd741fd08f98d398467133780b910-us17
// eb268b3b85