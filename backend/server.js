// fileName : server.js 
// Example using the http module
const http = require('http');
const express = require('express');
const app = express();
const request = require("request");
const rp = require("request-promise");
const cors = require("cors");
var bodyParser = require('body-parser');
// const df = require('defaultMiddleware')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
// Create an HTTP server
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});


app.post('/api/', async (req, res) => {
    var request = require('request');
    console.log("sample data", req.body)
    var options = {
        'method': 'POST',
        'url': 'https://adb-3353241865041283.3.azuredatabricks.net/api/2.0/jobs/run-now',
        'headers': {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            "job_id": 648752276580070,
            "notebook_params": {
                "error_keyword": JSON.stringify(req.body)
            }
        })

    };
    
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.send("success")
    });

})

// Specify the port to listen on
const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});