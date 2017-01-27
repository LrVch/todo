
"use strict";

angular.module('todoList')
    .controller('CategoryController', ['$scope', 'DataService', '$state', '$stateParams', '$rootScope', function ($scope, DataService, $state, $stateParams, $rootScope) {
    	console.log('CategoryController')

    	$scope.addCatetory = function addCatetory() {
    		const existCategories = $rootScope.categories;

    		if (!$scope.categoryName) {
    			return;
    		}

    		if (existCategories.indexOf($scope.categoryName) !== -1) {
	    		alert("такая категория существует");
	    		return;
    		}

    		const notes = DataService.getNotes();
    		console.log('notes before addCatetory', notes);
    		notes[$scope.categoryName] = [];
    		DataService.saveDataToLocalStorage();
			$state.go('category', {categoryId: $scope.categoryName});
			$scope.categoryName = '';
    		console.log('notes after addCatetory', notes);
    	}

    	// console.log($rootScope);

    	// if ($rootScope.categories) {
	    // 	if (!$rootScope.categories.length) {
	    		// $scope.disableDropDown = $rootScope.categories.le ? true: false;
	    // 	} else {
	    		// $scope.disableDropDown = false;
	    // 	}
    	// }

    }]);