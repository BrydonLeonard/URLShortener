var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var collection = req.db.get('threads');
  collection.find({}, {}, function(err, results){
    res.render('threadList', { title: 'Threads', threadList:results});
})
});
router.post('/', function(req, res, next){
  var collection = req.db.get('threads');
  collection.count({}, function(err, count){
    collection.insert({
      title:req.body.threadName,
      urlExt:(count+1).toString(36)
    });
    res.send('success');
  });
});

router.post('/delete', function(req, res, next){
  var threadCollection = req.db.get('threads');
  var commentsCollection = req.db.get('comments');

  threadCollection.findOne({_id:req.body.id},{}, function(err, threadResult){
    commentsCollection.remove({tID:threadResult._id},{},function(){});
    threadCollection.remove({_id:threadResult._id});
    res.send("success");
  });
});

router.get('/:thread', function(req, res, next){
  var threadCollection = req.db.get('threads');
  var commentsCollection = req.db.get('comments');

  threadCollection.findOne({urlExt:req.params.thread},{},function(err, threadResult){
    if (threadResult)
      commentsCollection.find({tID:threadResult._id},{sort:{time:-1}, limit:20},function(err2, commentResults){
        if (commentResults){
          if (commentResults.length > 0)
            res.render('thread', {thread:threadResult, comments:commentResults});
          else res.render('thread', {thread:threadResult, comments:[{text:'No comments yet'}]});
        }
      });
  });
});

router.post('/:thread', function(req, res, next){
  var threadsCollection = req.db.get('threads');
  var commentsCollection = req.db.get('comments');

  threadsCollection.findOne({urlExt:req.params.thread}, {}, function(err, threadResult){
    commentsCollection.insert({
      tID:threadResult._id,
      text:req.body.text,
      time:new Date().getTime()
    });
    res.send('success');
  });
});

module.exports = router;
