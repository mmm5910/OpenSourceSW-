
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


app.get('/', function(req, res) { 
  res.sendFile(__dirname +'/index.html')
  })

app.get('/write', function(req, res) { 
    res.sendFile(__dirname +'/write.html')
  })

app.get('/list', function(req, res) {
  db.collection('login').find().toArray(function(err, result){
    console.log(result);
    res.render('list.ejs', {loginfo : result})
  })
})

// app.post('/add', function(req, res){
//     db.collection('login').insertOne({email:req.body.email, password: req.body.password}, function(err, result){
//       if(err) return console.log("error");
//       console.log("save complete...");
//       console.log(req.body.email);
//       console.log(req.body.password);
//     })
//     res.send('send complete.....')
//   })

// app.post('/add', function(req, res){
//   db.collection('config').findOne({name : 'totalcount'}, function(err, result){
//     var mycount = result.count;
//     db.collection('login').insertOne( { _id : (mycount + 1), email : req.body.email, password : req.body.password } , function(){
//       console.log('save complete')
//       res.send('send complete....');
//     });
//   });
// });


app.post('/add', function(req, res){
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