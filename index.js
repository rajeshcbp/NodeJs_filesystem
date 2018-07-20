var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var async = require('async');
var fs = require("fs");
var path = require('path');
var http = require('http');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//=======================================================HTML Pages=====================================================
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


//=======================================================API=====================================================



app.post("/AddData", function(req, res){
    var obj = {
        id: Math.floor(100000 + Math.random() * 900000),//https://stackoverflow.com/questions/21816595/generate-a-random-number-of-fixed-length-using-javascript
        productName: req.body.productName,
        quantity: req.body.quantity,
        productPrice: req.body.productPrice,
        totalPrice: req.body.totalPrice
    }
    console.log(obj)
    //https://stackoverflow.com/questions/36093042/how-do-i-add-to-an-existing-json-file-in-node-js
    fs.readFile('JSON_dataFile.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(obj)
    
        fs.writeFile("JSON_dataFile.json", JSON.stringify(json), function (err) {
            if (err) throw err;
            console.log('complete');
            fs.readFile('JSON_dataFile.json', function (err, result) {
                var json = JSON.parse(data)
                console.log(json);
               // res.setHeader('Content-Type', 'application/json');//https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express
                //res.send(JSON.stringify(json, null, 4));
                res.send(json)
                
            })
        });
    })

})

app.get("/GetAllData", function(req, res){
    fs.readFile('JSON_dataFile.json', function (err, result) {
        var json = JSON.parse(result)
        console.log(json);
        // res.setHeader('Content-Type', 'application/json');//https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express
        // res.send(JSON.stringify(json, null, 4));
        res.send(json)
    })
})

app.get("/Product/:id", function(req, res){
    console.log('Parms ' + req.params.id);
    //https://stackoverflow.com/questions/36093042/how-do-i-add-to-an-existing-json-file-in-node-js
    fs.readFile('JSON_dataFile.json', function (err, data) {
        var json = JSON.parse(data)
    	async.each(json, function (data, callback) {
            // Perform operation on file here.
            console.log('Processing data ' + data.id);
            console.log("====================================================");
            // Do work to process file here
            if (data.id == req.params.id) {
                console.log("Id found")
                // res.setHeader('Content-Type', 'application/json');//https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express
                // res.send(JSON.stringify(data, null, 4));
                res.send(data)
            } 
            console.log('data processed');
            console.log("====================================================");
            callback();
        }, function (err) {
            // if any of the file processing produced an error, err would equal that error
            if (err) {
                // One of the iterations produced an error.
                // All processing will now stop.
                console.log('A data failed to process');
                return;
            } 
        });
        
    })
})









//=========================================================================================================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log("Server connected to port" + " " + PORT);