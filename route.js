var express = require('express');
var router = express.Router();
var level = require('level');
var db = level('./data');

/* GET pages */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/create', function(req, res) {
  res.render('create');
});

/* API */

router.route('/words/:word')
	.delete(function(req, res){ // Delete a word from DB
		var word = req.params.word;
		db.del(word, function(err){
			if (err) msg = 'error';
			else msg = 'ok';
			res.json({ msg : msg });
		});
	})
	.put(function(req, res){	// Update status of words
		var word = req.params.word;
		var status = req.body.status;
		db.put(word, { status : status }, { valueEncoding : 'json' }, function(err){
			if (err) msg = 'error';
			else msg = 'ok';
			res.json({ msg : msg });
		});
	})

router.route('/words')
	.post(function(req, res){
		var words = req.body.data.slice(0, -1).split(';');
		var options = words.map(function(word){
			return {
				type : 'put',
				key : word,
				value : {
					status : 'new'
				},
				valueEncoding : 'json'
			};
		});
		db.batch(options, function (err) {
			if (err) throw err;
			console.log('Great success dear leader!');
		});
		res.json({msg: "Complete, Sir!"});
	})
	.get(function(req, res){
		var words = [];
		db.createReadStream()
		  	.on('data', function (data) {
		    	words.push({ word : data.key, attribute: JSON.parse(data.value) });
	  		})
	  		.on('error', function (err) {
		    	console.log('Oh my!', err)
	  		})
		  	.on('close', function () {
			    console.log('Stream closed')
		  	})
		  	.on('end', function () {
	  		  res.json({words : words});
			  console.log('Sent');
		  	});
	})

module.exports = router;