var express = require('express');
var app = express();

app.post('/buildChart', function (req, res) {
  console.log(req);
  res.send(responseText);
});

app.listen(5000);