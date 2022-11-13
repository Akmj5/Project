const mongoose = require("mongoose");


const connectdatabase = ()=> {


mongoose.connect("mongodb://127.0.0.1:27017/ecomm",).then((data)=> {
    console.log("server is connected to db");
}).catch((err)=>{
    console.log(err)
})
}

module.exports = connectdatabase