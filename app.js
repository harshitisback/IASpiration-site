const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));


app.get("/", function (req, res) {
    
    res.render("home");

});


app.listen(3000, function () { 
    console.log("server started at port 1000");
 })