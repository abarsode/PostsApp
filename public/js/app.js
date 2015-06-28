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

	$scope.deletePost = function(id, $event) {
		$event.stopPropagation();
		$http.delete('/post/' + id).success(function(response){
			console.log('Successfully deleted' + response._id);
			refresh();
		});
	};

	$scope.updatePostModal = function(id) {
		$http.get('/post/' + id).success(function(response) {
    		$scope.update = response;
			$('#updatePostModal').modal();
  		});
	};

	$scope.updatePost = function(item, event) {
		$http.put('/post/' + $scope.update._id, $scope.update).success(function(response){
			console.log('Successfully updated' +  response._id);
			refresh();
		});
	};
}]);