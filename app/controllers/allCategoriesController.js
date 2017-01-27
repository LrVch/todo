(function() {
'use strict';

	angular
	.module('todoList')
	.controller('AllCategoriesController', AllCategoriesController);

	AllCategoriesController.$inject = ['$scope'];

	function AllCategoriesController($scope) {
	  	$scope.test = "Все категории";

    	console.log('AllCategoriesController')
	};
}());