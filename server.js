// load config
var config = require('./config.js');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var FeedZai = require('./testAPI');

var app = express();
app.use(bodyParser.json({ type: 'application/json' }));
app.listen(3000);

var feedzai = FeedZai.FeedZai('dev', {
  username: config.KEY,
  password: ""
});

app.get("/request", function(req, res) {

   // make a request
/*  request({ 
    uri:'https://' + config.KEY + ":" + "@" +'sandbox.feedzai.com/v1/payments',
    method: "GET"
  },*/

  request(feedzai.scoreAPayment({
    "user_id": "af00-bc14-1245",
    "amount": 1
  }),
  // request(feedzai.paymentDump(),
  // request(feedzai.historyDump(), // undefined in sandbox
  // request(feedzai.merchantDump(),   // empty in sandbox
  function(err, response, body) {
    if (!err && res.statusCode === 200) {
      res.send(body);
    }
  });
});
