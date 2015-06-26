angular.module('PostsApp', [])
.controller('PostListController',['$scope', '$http', function($scope, $http) {

	$http.get('/posts').success(function(response){
		console.log("got response" + response);
		$scope.postList = response;
	});

}]);