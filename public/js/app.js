angular.module('PostsApp', [])
.controller('AddPostController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
	$scope.post = {};
	$scope.addPost = function() {
		$('#addPostModal').modal();
	};

	$scope.submitPost = function(item, event) {
		$http.post('/post', $scope.post).success(function(response) {
			console.log("got response:" + JSON.stringify(response));
			$rootScope.$emit('refresh');
		});
	};
}])
.controller('PostListController',['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

	var refresh = function() {
		$http.get('/posts').success(function(response) {
			$scope.postList = response;
		});
	};
	
	refresh();

	$rootScope.$on('refresh', function(event, data){
		refresh();
	});

	$scope.deletePost = function(id) {
		$http.delete('/post/' + id).success(function(response){
			console.log('Successfully deleted response.title');
			refresh();
		});
	};
}]);