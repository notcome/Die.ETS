(function(){
	var app = angular.module('index', []);
  app.controller('MainController', function($scope, $http){
		this.count = 0;
		this.currentWord = 'Placeholder';
		$scope.words = [];
		this.loadList = function(){
		  $http.get('/words').success(function (data) {
			 $scope.words.push(data.words[0].word);
			});
		}

		this.goNext = function(){
			this.count = (this.count + 1) % $scope.words.length;
			this.currentWord = $scope.words[this.count];
		}
	});
})();