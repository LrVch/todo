"use strict";

angular.module('todoList')
    .controller('OneCategoryController', 
    	['$scope', '$stateParams',  'DataService', '$rootScope', '$state',
    	function ($scope, $stateParams, DataService, $rootScope, $state) {

    	const activeCategory = $stateParams.categoryId;
    	const notes = DataService.getNotes();
    	// console.log('notes in one controller', notes)

    	console.log('OneCategoryController');


    	if (activeCategory in notes) {
    		$scope.activeCategory = activeCategory;
	    	$scope.boards = notes[$scope.activeCategory];
	    	$scope.showAddButton = true;   	      
    	} else {
    		$scope.activeCategory = 'нет такой категории';
    		$scope.showAddButton = false;
	    	return   	      
    	}

    	$scope.removeCategory = function removeCategory(name) {
    		const notes = DataService.getNotes();
    		console.log('notes before removeCategory', notes);

    		delete notes[name];

    		if ($rootScope.categories.length > 1) {
	    		$state.go('category', {categoryId: $rootScope.categories[0] === activeCategory ? $rootScope.categories[1] : $rootScope.categories[0]})
    		} else {
    			$scope.activeCategory = 'Добавьте категорию';
    			$scope.boards = [];
    			$scope.showAddButton = false;
    			$rootScope.categories = [];
    		}
    		
    		DataService.saveDataToLocalStorage();
    		console.log('notes after removeCategory', notes);
    	}


    }]);