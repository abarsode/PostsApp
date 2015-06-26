angular.module('PostsApp', [])
.controller('PostListController', function($scope){
	$scope.postList = [
		{
			title: "My very first Post!",
			content:" This is my first Post !"
		},
		{
			title: "Second post",
			content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
		},
		{
			title: "Third Post",
			content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
		}
	];
});