const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articlesRouter = require("./routes/articles.js")
app.use("/articles", articlesRouter)

app.listen(4000, (req, res)=>{
    console.log("Server started on port 4000")
})