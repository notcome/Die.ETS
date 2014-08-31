(function(){
	var app = angular.module('index', []);
  	app.controller('MainController', function($scope, $http){
		this.count = 0;
		this.currentWord = 'Placeholder';
		this.spelling = '';
		$scope.words = [];
		this.testInfo = '';

		this.loadList = function(){
		  $http.get('/words').success(function (data) {
				$scope.words = data.words.map(function(obj){
			 		return obj.word;
				})
			});
		}

		this.goNext = function(){
			this.count = (this.count + 1) % $scope.words.length;
			this.currentWord = $scope.words[this.count];
		}

		this.sound = function(){
			var msg = new SpeechSynthesisUtterance(this.currentWord);
			window.speechSynthesis.speak(msg);
		}

		this.iForgot = function(){
			this.testInfo = "I forget!";
		}

		this.checkSpelling = function(){
			if(this.spelling == this.currentWord)
				this.testInfo = "Passed!";
		}
	});
})();