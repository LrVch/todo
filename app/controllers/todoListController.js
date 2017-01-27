(function() {
'use strict';

	angular
	.module('todoList')
	.controller('TodoListController', TodoListController);

	TodoListController.$inject = ['$scope', 'fetchNotes'];

	function TodoListController($scope, fetchNotes) {
	  	console.log('TodoListController');
	  	const fetchedNotes = fetchNotes;
	  	$scope.fetchedNotes = fetchedNotes;
	  	$scope.categories = Object.keys(fetchedNotes.data.user);

	  	console.log($scope.categories);

	  	$scope.$on('REMOVE_CATEGORY', function(response) {
		    $scope.categories = Object.keys(fetchedNotes.data.user);

		});
	};
}());