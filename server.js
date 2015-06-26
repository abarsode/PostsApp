var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('PostAppDB', ['posts']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/posts', function (req, res) {
  console.log('I received a GET request');
  db.posts.find(function (err, docs) {
    res.json(docs);
  });
});

app.listen(3000);
console.log('Server running on port 3000');