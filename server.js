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
  /*request({ 
    uri:'https://' + config.KEY + ":" + "@" +'sandbox.feedzai.com/v1/payments',
    method: "GET"
  },*/
  // request(feedzai.paymentDump(),
  // request(feedzai.historyDump(), // undefined in sandbox
  request(feedzai.merchantDump(),   // empty in sandbox
  function(err, response, body) {
    console.log(feedzai.historyDump());
    if (!err && res.statusCode === 200) {
      /*
      var receviedData = JSON.parse(body);
      console.log(receviedData.length);
      // res.send(Object.keys(receviedData[0]));
      // res.send(receviedData[1]);
      var scoreArr = [];
      var fraudArr = [];
      for (var i = 0; i < 10; i++) {
        if (receviedData[i].score) {
          scoreArr.push(receviedData[i].score.score);
          fraudArr.push(receviedData[i].score.likelyFraud);
        }
      }
      // res.send(receviedData[9]);
      res.send(scoreArr.concat(fraudArr));*/
      res.send(body);
    }
  });
});
