(function(){
	var app = angular.module('create', []);
	app.controller('MainController', function(){
		this.words = [];
		this.word = '';
		this.list = '';
		this.addWord = function(){
			this.words.push(this.word);
			this.list += this.word + ';';
			this.word = '';
		};
	})
})();