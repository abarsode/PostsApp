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

app.get('/post/:id', function (req, res) {
  var id = req.params.id;
    console.log('I received a GET request for ' + id);
  db.posts.findOne({_id: mongojs.ObjectId(id)},function (err, docs) {
    res.json(docs);
  });
});

app.post('/post', function (req, res) {
  console.log('I received a POST request');
  db.posts.insert(req.body, function (err, doc) {
    res.json(doc);
  });
});

app.delete('/post/:id', function(req, res) {
  var id = req.params.id;
  console.log('I received a DELETE request for' + id);
  db.posts.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});  

app.put('/post/:id', function(req, res) {
 var id = req.params.id;
 console.log('I received a UPDATE request for' + id);
  
db.posts.findAndModify({

  	query: {_id: mongojs.ObjectId(id)},

  	update: {$set: {title: req.body.title, content: req.body.content }}, new: true}, 
  	function (err, doc) {
      res.json(doc);
    }
);

});

app.listen(3000);
console.log('Server running on port 3000');