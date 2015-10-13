// load config
var config = require('.' + 'config.js');
var express = require('express');
var app = express();

app.listen(3000);

app.get("/", function(req, res) {
  res.send(200);
});
