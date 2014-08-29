var express = require('express');
var router = express.Router();
var level = require('level');
var db = level('./data');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Index' });
});

router.get('/create', function(req, res) {
  res.render('create', { title: 'Create List' });
});

router.post('/create', function(req, res){
	var words = req.body.data.slice(0, -1).split(';');
	var options = words.map(function(word){
		return {
			type : 'put',
			key : word,
			value : {
				status : 'new'
			},
			valueEncoding : 'json'
		}
	})

	db.batch(options, function (err) {
	  if (err) return console.log('Ooops!', err)
	  console.log('Great success dear leader!')
	})

	res.end("Complete, Sir!")
})

router.get('/getWords', function(req, res){
	var words = '';
	db.createKeyStream()
	  .on('data', function (data) {
		words += data + ','
	  })
	  .on('error', function (err) {
	    console.log('Oh my!', err)
	  })
	  .on('close', function () {
	    console.log('Stream closed')
	  })
	  .on('end', function () {
  		res.send(words);
	  });
})

module.exports = router;
