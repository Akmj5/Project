//const app = require("./app");
const express = require("express");
const path=require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const knex = require("knex");
const db = knex({
    client:"pg",
    connection:{
        host: "127.0.0.1",
        user: "postgres",
        password:"test",
        database: "ecom"

    }
})

const app = express();
app.use(express.json());
app.use(bodyParser.json());

//const connectdatabase = require("./config/database");
//const { db } = require("./models/productmodel");
//dotenv.config({path:"backend/config/config.env"});

//connectdatabase();

let initialPath = path.join(__dirname,"public/js");
app.use(express.static(initialPath));

app.get("/",(req,res) => {
    res.sendFile(path.join(initialPath,"index.html"));
})
app.get("/login",(req,res) => {
    res.sendFile(path.join(initialPath,"login.html"));
})

app.get("/register",(req,res)=>{
    res.sendFile(path.join(initialPath,"register.html"));
})
app.post("/register-user",(req,res)=>{
    const {name,email,password} = req.body;
    if(!name.length || !email.length || !password.length){
        res.json("fill all the fields");
    }else{
        db("user").insert({
            name:name,
            email:email,
            password: password
        })
        .returning(["name","email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes("alresdy exists")){
                res.json("email already exists");
            }
        })
    }
})
app.post("/login-user",(req,res)=>{
    const{email, password}= req.body;
    db.select("name","email")
    .from("user")
    .where({
        email:email,
        password:password

    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        }else{
            res.json("email or password is incorrect");
        }
    })
})
//app.get("/",(req,res) => {
  //  res.sendFile(__dirname + "/public/js/login.html");
//});


app.listen(5000,() =>{
    console.log('server is running on 5000 ');
});