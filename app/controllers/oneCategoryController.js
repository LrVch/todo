(function() {
"use strict";

    angular
    .module('todoList')
    .controller('OneCategoryController', OneCategoryController);

    OneCategoryController.$inject = ['$scope', '$stateParams',  'DataService', '$state', 'fetchNotes', '$rootScope'];

    function OneCategoryController($scope, $stateParams, DataService, $state, fetchNotes, $rootScope) {
        console.log('OneCategoryController');

        $scope.test = "test";

        const activeCategory = $stateParams.categoryId;
        // console.log(activeCategory);
        const fetchedNotes = fetchNotes;
        $scope.fetchedNotes = fetchedNotes;
        const notes = fetchedNotes.data.user;
        // console.log('notes in one controller', notes);

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
            const categories = Object.keys(fetchedNotes.data.user);
            console.log('notes before removeCategory', notes);

            delete notes[name];

            if (categories.length > 1) {
                $state.go('^.category', {categoryId: categories[0] === activeCategory ? categories[1] : categories[0]})
            } else {
                $scope.activeCategory = 'Добавьте категорию';
                $scope.boards = [];
                $scope.showAddButton = false;
            }

            console.log(fetchNotes)
            
            DataService.saveDataToLocalStorage(fetchNotes);

            console.log('notes after removeCategory', notes);

            $scope.$parent.$broadcast('REMOVE_CATEGORY', 'data');
        }
    };
}());