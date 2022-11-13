const express = require("express");


const errorMiddleware = require("./middleware/error");








//route import
const product = require("./routes/productroute");
const user = require("./routes/userroute");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use(errorMiddleware);

//module.exports = app;