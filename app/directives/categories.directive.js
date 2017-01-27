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
            controller: function ($scope, $element) {
                console.log('CategoryController');

                $scope.addCatetory = function addCatetory() {
		            const existCategories = $scope.categories;

		            if (!$scope.categoryName) {
		                return;
		            }

		            console.log($scope.categoryName);

		            if (existCategories.indexOf($scope.categoryName) !== -1) {
		                alert("такая категория существует");
		                return;
		            }

		            const fetchedNotes = $scope.fetchedNotes;

		            console.log('notes before addCatetory', fetchedNotes);
		            const notes = fetchedNotes.data.user;
		            notes[$scope.categoryName] = [];
		            // console.log("fetchedNotes fetchedNotes", fetchedNotes)
		            DataService.saveDataToLocalStorage(fetchedNotes);
		            $scope.categories = Object.keys($scope.fetchedNotes.data.user);
		            $state.go('^.category', {categoryId: $scope.categoryName});
		            $scope.categoryName = '';
		            console.log('notes after addCatetory', notes);
		        }

		        console.log($scope.categories)

		        $scope.$watch('$scope.categories', function (newval, oldval) {
                    if (newval) {
                    	console.log('$scope.categories.length', $scope.categories.length)
                    } else {

                    }
                });
            }
        }
	}
}());