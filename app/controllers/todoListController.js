(function() {
'use strict';

	angular
	.module('todoList')
	.controller('TodoListController', TodoListController);

	TodoListController.$inject = ['$scope', 'fetchNotes'];

	function TodoListController($scope, fetchNotes) {
	  	console.log('TodoListController');
	  	const fetchedNotes = fetchNotes;

	  	const vm = this;
	  	vm.fetchedNotes = fetchedNotes;
	  	vm.categories = Object.keys(fetchedNotes.data.user);

	  	// console.log($scope.categories);

	  	$scope.$on('REMOVE_CATEGORY', function(e, data) {
	  		console.log(data)
		    vm.categories = Object.keys(fetchedNotes.data.user);
		});
	};
}());