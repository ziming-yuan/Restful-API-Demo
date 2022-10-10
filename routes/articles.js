const express = require("express")
const mongoose = require("mongoose");
const router = express.Router()

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

router.route("/")
    .get((req, res)=>{
        // fetches all the articles when the server receives a get request
        Article.find((err, foundArticles)=>{
            if (!err){
                res.send(foundArticles);
            } else{ 
                res.send(err);
            }
        })
    })
    .post((req,res)=>{
        // creates one new article when the server receives a post request
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(err=>{
            if (!err){
                res.send("Successfully added a new article");
            } else{
                res.send(err);
            }
        });
    })
    .delete((req, res)=>{
        Article.deleteMany(err=>{
            if (!err){
                res.send("Successfully deleted all articles");
            } else {
                res.send(err);
            }
        })
    });

router.route("/:articleTitle")
    .get((req,res)=>{
        Article.findOne({title: req.params.articleTitle}, (err, foundArticle)=>{
            if (foundArticle){
                res.send(foundArticle);
            } else {
                res.send("No article matching that title was found");
            }
        });
    })
    .put((req,res)=>{
        Article.findOneAndUpdate(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            {overwrite: true},
            err => {
                if (!err){
                    res.send("Successfully updated article");
                }
            }
        )
    })
    .patch((req,res)=>{
        Article.findOneAndUpdate(
            {title: req.params.articleTitle},
            {$set: req.body},
            err => {
                if (!err){
                    res.send("Successfully updated article");
                }
            }
        )
    })
    .delete((req, res)=>{
        Article.deleteOne({title: req.params.articleTitle}, err=>{
            if (!err){
                res.send("Successfully deleted the article");
            } else{ 
                res.send(err);
            }
        })
    })

module.exports = router