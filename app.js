const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');

const app = express();

var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://amankumartiwari1502:Harsh9575381459@cluster0.2ur35sv.mongodb.net/YtlinkDB';
mongoose.connect(mongoDB);


var Schema = mongoose.Schema;

var youtubemock = new Schema({
    iframe: String
});

var ytModel = mongoose.model('ytlinks', youtubemock);





app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.get("/", function (req, res) {



    res.render("home");

});




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


app.route("/notez")
    .get(function (req, res) {
        
    });





app.listen(3000, function () {
    console.log("server started at port 3000");
})