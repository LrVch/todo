(function() {
"use strict";

    angular
	.module('todoList')
	.directive('categories', categories);

	categories.$inject = ['DataService', '$state'];

	function categories(DataService, $state) {
		return {
            restrict: 'E',
            templateUrl: 'templates/categories.template.html',
            controller: CategoriesController
        }
	}

	CategoriesController.$inject = ['$scope', '$element', 'DataService', '$state'];

	function CategoriesController($scope, $element, DataService, $state) {
        console.log('CategoriesController');
        // console.log($scope.todos)

        $scope.addCatetory = function addCatetory() {
            const existCategories = $scope.todos.categories;
            // console.log($scope.todos)
            // console.log($scope)

            if (!$scope.categoryName) {
                return;
            }

            // console.log($scope.categoryName);

            if (existCategories.indexOf($scope.categoryName) !== -1) {
                alert("такая категория существует");
                return;
            }

            const fetchedNotes = $scope.todos.fetchedNotes;

            console.log('notes before addCatetory', fetchedNotes);
            const notes = fetchedNotes.data.user;
            notes[$scope.categoryName] = [];
            console.log("fetchedNotes fetchedNotes", fetchedNotes)
            DataService.saveDataToLocalStorage(fetchedNotes);
            $scope.todos.categories = Object.keys($scope.todos.fetchedNotes.data.user);
            $state.go('^.category', {categoryId: $scope.categoryName});
            $scope.categoryName = '';
            console.log('notes after addCatetory', notes);
        }
    }
}());