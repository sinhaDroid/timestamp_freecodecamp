var express = require("express");
var app = express();
var moment = require("moment");
var fs = require("fs");
var path = require("path");

var port = process.env.PORT || 3500;

app.listen(port, function () {
    // body...
    console.log("Listening on port: " + port);
});

app.get('/', function (req, res) {
    // body...
    var fileName = path.join(__dirname, 'index.html');
    res.sendFile(fileName, function (err) {
        // body...
        if (err) {
            console.log(err);
            res.status(err.state).end();
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.get('/:dateString', function (req, res) {
    // body...
    var myDate;
    if(/^\d{8,}$/.test(req.params.dateString)) {
        myDate = moment(req.params.dateString, "X");
    } else {
        myDate = moment(req.params.dateString, "MMMM D, YYYY");
    }
    
    if (myDate.isValid()) {
        res.json({
            unix: myDate.format("X"),
            natural: myDate.format("MMMM D, YYYY")
        });
    } else {
        res.json({
            unix: null,
            natural: null
        });
    }
});