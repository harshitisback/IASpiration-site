const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios')
const newsr = express.Router()
const moment = require('moment')
const math = require('math')
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const userModel = require("./models/user");
const {prearr,mainsarr,pyq} = require("./components/links");


const app = express();

var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://amankumartiwari1502:Harsh9575381459@cluster0.2ur35sv.mongodb.net/YtlinkDB';
mongoose.connect(mongoDB);

//model for interview
var Schema = mongoose.Schema;

var youtubemock = new Schema({
    iframe: String
});


// update

var ytModel = mongoose.model('ytlinks', youtubemock);

// model for notez
var notezNews = new Schema({

    date: String,
    nplink: String,
    notes: String
});

var ntNews = mongoose.model('newspaper', notezNews);

var contactSchema = new Schema({
        name: String, 
        email: String,
        message: String
});
// Compile model from schema
var contactModel = mongoose.model('contac', contactSchema );


app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/home", function (req, res) {

    res.render("home");

});



app.get("/", function(req, res){
    res.render("letus");
});

app.get("/signup", function (req, res) {
    res.render("signup");
});

app.post("/signup",function(req, res){
    let name = req.body.uname;
    let uemail = req.body.uemail;
    let upass = req.body.upassword;
    let cpass = req.body.rupassword;

    userModel.findOne({email:uemail},(err,found) =>{
        if(err){
            console.log(err);
        }else if(found){
            res.render("error",{trgt:"User already created."});
        }else{
            if(upass!=cpass){
                res.render("error",{trgt:"Password Not match"});
            }else{
                const newUser = new userModel({
                    name:name,
                    email:uemail,
                    password:upass,
                    cpassword:cpass
                })
            
                newUser.save((error,result)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("saved succeful");
                        
                    }
                })
            }
           
        }

        res.render("home");
    })

    
});

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",(req,res)=>{
    let lemail = req.body.lemail;
    let pass = req.body.lpassword;

    userModel.findOne({email:lemail, password:pass}, (err, found)=>{
        if(found){
            res.redirect("/home");
        }else{
            res.render("error",{trgt:"Check you Id and Password "});
        }
    })
})


app.get("/guide", function (req, res) {
    res.render("roadmap");
});

app.get("/about",function(req,res){
    res.render("about");
})


app.get("/prelims", function (req, res) {
    res.render("prelims");
});

app.get("/mains", function (req, res) {

    res.render("guideMains");
});


app.route("/interview")
    .get(function (req, res) {

        ytModel.find(function (err, found) {
            if (!err) {

                res.render("interview", { ytlinks: found });

            } else {
                res.send(err);
            }
        });


    })
    .post(function (req, res) {
        let link = req.body.ifr;
        console.log(link);

        const newLink = new ytModel({
            iframe: link
        });

        newLink.save().then(() => console.log("saved succesfully"));
        res.send("Link Succesfully Added");


    });


app.route("/articles")
    .get(async function (req, res) {
        try {
            var url = 'http://newsapi.org/v2/top-headlines?' +
                'country=in&' +
                'apiKey=c34e17d75cb34c7b9d1396eb86fce3f0';

            const news_get = await axios.get(url)
           
            res.render('newsapi', { articles: news_get.data.articles })
        } catch (error) {
            if (error.response) {
                console.log(error)
            }
        }
        // res.render("newsapi");

    })
    .post(function (req, res) {


    });


app.route("/notez")
    .get(function (req, res) {

        ntNews.find(function (err, found) {
            if (!err) {
                res.render("notez", { news: found });
            } else {
                res.send(err);
            }
        });

        // res.render("notez");
    })
    .post(function (req, res) {
        let date = req.body.date;
        let link = req.body.nlink;
        let notes = req.body.notes;
        const newNewsP = new ntNews({
            date: date,
            nplink: link,
            notes: notes

        });

        newNewsP.save().then(() => res.send("Saved"));

    });


app.get("/contact", function (req, res) {
    res.render("contact");
    
});

app.post("/contact" , async function (req, res) {  

    let email = req.body.email;
    let name = req.body.name;
    let message = req.body.message;

    

    
    const newMail = new contactModel({
        name:name,
        email: email,
        message:message
    });

    newMail.save();

    
    
    res.redirect("/contact");
    
});

app.get("/:pre", function (req, res) {
    let para = req.params.pre;

    if (para === "prelims1") {
        res.render("prelims1", { resarr: prearr, preHead: "Prelims" });
    } else if (para === "mains1") {
        res.render("prelims1", { resarr: mainsarr, preHead: "Mains" });
    }else if(para === "pyq"){
        res.render("prelims1", { resarr: pyq, preHead: "PYQ" });
    }
    
    else {
        res.send("Error 404");
    }

});


app.listen(process.env.PORT || 3000, function () {
    console.log("server started at port 3000");
})