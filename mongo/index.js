
// var db;
// MongoClient.connect("mongodb+srv://heekyeong:hallym@cluster0.zi8a3l0.mongodb.net/?retryWrites=true&w=majority", function(err, client){
//   if (err) return console.log(err)
//   db = client.db('nodejs');

const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 
var db;

const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs');

MongoClient.connect("mongodb+srv://heekyeong:hallym@cluster0.zi8a3l0.mongodb.net/?retryWrites=true&w=majority", function(err, client){
  if (err) return console.log(err)
     db = client.db('nodejs');

    console.log('DB connected')

  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})


app.use(bodyParser.json()); app.use(bodyParser.urlencoded({extended : true}));


app.use(express.static(__dirname) + "/pages");


app.get('/', function(req, res) { 
  res.sendFile(__dirname +'/index.html')
  })

app.get('/write', function(req, res) { 
    res.sendFile(__dirname +'/pages/write.html')
  })

  app.get('/test', function(req, res) { 
    res.sendFile(__dirname +'/pages/test.html')
  })

  app.get('/login', function(req, res) { 
    res.sendFile(__dirname +'/pages/login.html')
  })

  app.get('/signin', function(req, res) { 
    res.sendFile(__dirname +'/pages/signin.html')
  })

  app.get('/board', function(req, res) { 
    res.sendFile(__dirname +'/pages/board.html')
  })

  app.get('/boardwrite', function(req, res) { 
    res.sendFile(__dirname +'/pages/boardwrite.html')
  })


  app.get('/community', function(req, res) { 
    res.sendFile(__dirname +'/pages/pages/community.html')
  })

  app.get('/communitywrite', function(req, res) { 
    res.sendFile(__dirname +'/pages/communitywrite.html')
  })

  app.get('/intro', function(req, res) { 
    res.sendFile(__dirname +'/pages/intro.html')
  })


app.get('/list', function(req, res) {
  db.collection('login').find().toArray(function(err, result){
    console.log(result);
    res.render('list.ejs', {loginfo : result})
  })
})


app.post('/addUser', function(req, res){
  db.collection('config').findOne({name : 'totalcount'}, function(err, result){
    var mycount = result.count;
    db.collection('login').insertOne( { _id : (mycount + 1), email : req.body.email, password : req.body.password } , function(){
      db.collection('config').updateOne({name:'totalcount'},{ $inc: {count:1} },function(err, result){
        if (err) return console.log(err)
        console.log('save complete')
        res.send('send complete....');
      });  
    });
  });
});


app.post('/addReview', function(req, res){
  db.collection('config').findOne({name : 'totalcount'}, function(err, result){
    var mycount = result.count;
    db.collection('login').insertOne( { _id : (mycount + 1), email : req.body.email, password : req.body.password } , function(){
      db.collection('config').updateOne({name:'totalcount'},{ $inc: {count:1} },function(err, result){
        if (err) return console.log(err)
        console.log('save complete')
        res.send('send complete....');
      });  
    });
  });
});


app.post('/addText', function(req, res){
  db.collection('config').findOne({name : 'totalcount'}, function(err, result){
    var mycount = result.count;
    db.collection('login').insertOne( { _id : (mycount + 1), email : req.body.email, password : req.body.password } , function(){
      db.collection('config').updateOne({name:'totalcount'},{ $inc: {count:1} },function(err, result){
        if (err) return console.log(err)
        console.log('save complete')
        res.send('send complete....');
      });  
    });
  });
});