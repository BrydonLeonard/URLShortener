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

  console.log(url);

  var pos = url.indexOf('https://')
  url = url.slice(pos+1,url.length);
  pos =  url.indexOf('http://')
  url = url.slice(pos+1, url.length);

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
      var lURL = req.body.lURL;
      var pos = lURL.indexOf('https://')
      lURL = lURL.slice(pos+1,lURL.length);
      pos = lURL.indexOf('http://')
      lURL = lURL.slice(pos+1, lURL.length);

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


function cleanURL(dirtyUrl){
  console.log(dirtyUrl);
  var testString = 'https://';
  var pos = dirtyUrl.indexOf(testString)
  if (pos != -1)
    dirtyUrl = dirtyUrl.slice(pos+testString.length,dirtyUrl.length);
      console.log(dirtyUrl);
  testString = 'http://';
  pos =  dirtyUrl.indexOf(testString)
  if (pos != -1)
    dirtyUrl = dirtyUrl.slice(pos+testString.length,dirtyUrl.length);
      console.log(dirtyUrl);
  testString = 'www.';
  pos =  dirtyUrl.indexOf(testString)
  if (pos != -1)
    dirtyUrl = dirtyUrl.slice(pos+testString.length,dirtyUrl.length);
      console.log(dirtyUrl);
  return dirtyUrl;
}



module.exports = router;
