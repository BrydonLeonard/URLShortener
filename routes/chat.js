var express = require('express');
var router = express.Router();
var col = require('randomcolor');

/* GET home page. */
router.post('/', function(req, res, next) {
  var sess = req.session;
  var db = req.db;
  var time = new Date().getTime();
  console.log(db);
  try{
  if (sess.col)
  {
    var collection = db.get('mess');
    collection.insert({c:sess.col, m:req.body.m, t:time});
    collection.find({}, {sort:{t:-1}, limit:10}, function(err, doc){
      res.send(doc);
    });
  }else{
    sess.col = col({luminosity:'dark'});
    var collection = db.get('mess');
    collection.insert({c:sess.col, m:req.body.m, t:time});
    req.session.col = sess.col;
    console.log('new user');
    collection.find({}, {sort:{t:-1}, limit:10}, function(err, doc){
      res.send(doc);
    });
  }
}catch(e){
  console.log(e);
  res.send('failed');
};
});

router.get('/', function(req, res, next){
  res.render('chat');
});

module.exports = router;
