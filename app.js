const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios')
const newsr = express.Router()
const moment = require('moment')
const math = require('math')
const ejs = require('ejs');
const nodemailer = require("nodemailer");


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


app.get("/", function (req, res) {



    res.render("home");

});


let prearr = [
    {
        title: "HISTORY",
        link: "https://drive.google.com/uc?export=download&id=1dWL-WFHTONV13N_OxudVMB9UBgFk1NCm"
    },
    {
        title: "GEOGRAPHY",
        link: "https://drive.google.com/uc?export=download&id=1wNv1kC8yoDIMdjgli9zb_-Q9Wi8yIEpl"
    },
    {
        title: "ECONOMICS",
        link: "https://drive.google.com/uc?export=download&id=1_WTBc3WBnp9A9Te7X5rXN0THsKhhUfL9"
    },
    {
        title: "INDIAN POLITY",
        link: "https://drive.google.com/uc?export=download&id=10MOxJkDAqaeFZPZfrKEmxTovmnwGKdW7"
    },
    {
        title: "INTERNATIONAL RELATIONS",
        link: "https://drive.google.com/uc?export=download&id=1s9SFrTZbidhNw1NrFvyuvEN5Ji7rMrPf"
    },
    {
        title: "CSAT",
        link: "https://drive.google.com/uc?export=download&id=1ir4nCCBA-K77mcTfeAX-HeoIdM-xDMZL"
    }
]

let mainsarr = [
    {
        title: "HISTORY",
        link: "https://drive.google.com/uc?export=download&id=1zIxli8iDrVpgvcb01qF9UheoudLEfb_t"
    },
    {
        title: "GEOGRAPHY",
        link: "https://drive.google.com/file/d/145Ag6h8kirWkgj_rLIx6Ou6UuKfg6WdY/view?usp=sharing"
    },
    {
        title: "ECONOMICS",
        link: "https://drive.google.com/file/d/1GJ1JG_K41AkceLbs8ok1U7ycFKY0qx0v/view?usp=sharing"
    },
    {
        title: "INDIAN POLITY",
        link: "https://drive.google.com/file/d/1lytkF-vTp2IPz6qIsM-yv_454AaERAxj/view?usp=sharing"
    },
    {
        title: "INTERNATIONAL RELATIONS",
        link: "https://drive.google.com/file/d/1ViYHy4WOwMHoYCVMkfYbn77ktaKwVYV2/view?usp=sharing"
    },
    {
        title: "ETHICS",
        link: "https://drive.google.com/file/d/18vuPYTm0lWoywr4JSHw8UaxeD7FZ67om/view?usp=sharing"
    }
]

let pyq = [
    {
        title: "2021",
        link: "https://drive.google.com/uc?export=download&id=1T_rwZWa-r3Dyt9Q-9C4qBlIXDVXU12FN"
    },
    {
        title: "2020",
        link: "https://drive.google.com/uc?export=download&id=1tI9emo29UrkApyFJ5dGf5tkVRaDbIka4"
    },
    {
        title: "2019",
        link: "https://drive.google.com/uc?export=download&id=1mvIeUj2WT7jB4eEFaju-H4HViWvcSfx-"
    },
    {
        title: "2018",
        link: "https://drive.google.com/file/d/1iyIbOyEDTXdkIyqaGVoCabA3pYnr-sjB/view?usp=sharing"
    },
    {
        title: "2017",
        link: "https://drive.google.com/uc?export=download&id=1G9p1kmRRiuBXN7SuY8sMRNVwGVTHKaka"
    }
    
]


app.get("/guide", function (req, res) {
    res.render("roadmap");
});


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
                'apiKey=eaf5b5e072534b1688a2522959aa37b9';

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
        name: name,
        email: email,
        message:message
    });

    newMail.save();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jerel.bosco11@ethereal.email',
            pass: 'wmzSPeKHmGRJqeqAUg'
        },
        tls:{
            rejectUnauthorized:false
        }
        
    });
    
     
      let info = await transporter.sendMail({
        from: '"Harshit" <jerel.bosco11@ethereal.email>', 
        to: email, 
        subject: "Your message we recieved", 
        text: "Hello its harshit thanks for trying to contact us we will reach to you soon", 
        
      });
    
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      
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










app.listen(3000, function () {
    console.log("server started at port 3000");
})