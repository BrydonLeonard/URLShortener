var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'url shortener' });
});


router.get('/~:sh', function(req, res, next) {
  var db = req.db;
  var store = db.get('store');

  var url = req.params.sh;

  url = cleanURL(url);

  store.find({s:req.params.sh},{},function(err, result){
    if (result[0])
      res.redirect('http://' + result[0].l);
    else next();
  });
});

router.post('/addurl', function(req, res, next){
  var db = req.db;
  var store = db.get('store');

  store.find({l:req.body.lURL},{}, function(err, result){
    if (result.length === 0)
    {
      var lURL = cleanURL(req.body.lURL);
      console.log(lURL);


      var sURL = 0;
      store.count({},function(err, count){
        sURL = (count+1).toString(36)
      store.insert({s:sURL, l:lURL});
      res.send(cleanURL(req.get('host')) + '/~' + sURL);
    })}else{
      console.log(result[0])
      console.log(cleanURL(req.get('host')) + '/~' + result[0].s);
      res.send(cleanURL(req.get('host')) + '/~' + result[0].s);
    }
  })
});

router.get('/getall', function(req, res, next){
  var data = "";
  var db = req.db;
  var store = db.get('store');

  store.find({},{},function(err, results){
    res.send(results);
  });
});

function cleanURL(dirtyUrl){
  var testString = 'https://';
  var pos = dirtyUrl.indexOf(testString)
  if (pos != -1)
    dirtyUrl = dirtyUrl.slice(pos+testString.length,dirtyUrl.length);
  testString = 'http://';
  pos =  dirtyUrl.indexOf(testString)
  if (pos != -1)
    dirtyUrl = dirtyUrl.slice(pos+testString.length,dirtyUrl.length);
  testString = 'www.';
  pos =  dirtyUrl.indexOf(testString)
  if (pos != -1)
    dirtyUrl = dirtyUrl.slice(pos+testString.length,dirtyUrl.length);
  return dirtyUrl;
}



module.exports = router;
