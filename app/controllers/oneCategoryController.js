(function() {
"use strict";

    angular
    .module('todoList')
    .controller('OneCategoryController', OneCategoryController);

    OneCategoryController.$inject = ['$scope', '$stateParams',  'DataService', '$state', 'fetchNotes'];

    function OneCategoryController($scope, $stateParams, DataService, $state, fetchNotes) {
        console.log('OneCategoryController');

        const vm = this;
        const activeCategory = $stateParams.categoryId;
        const notes = fetchNotes.data.user;
        // console.log('notes in one controller', notes);

        if (activeCategory in notes) {
            vm.activeCategory = activeCategory;
            vm.boards = notes[vm.activeCategory];
            vm.showAddButton = true;          
        } else {
            vm.activeCategory = 'нет такой категории';
            vm.showAddButton = false;
         return            
        }

        vm.save = function() {
            console.log("save data");
            DataService.saveDataToLocalStorage(fetchNotes);
        }

        vm.removeCategory = function removeCategory(name) {
            const categories = Object.keys(fetchNotes.data.user);
            console.log('notes before removeCategory', notes);

            // console.log(notes)

            delete notes[name];

            if (categories.length > 1) {
                $state.go('^.category', {categoryId: categories[0] === activeCategory ? categories[1] : categories[0]})
            } else {
                vm.activeCategory = 'Добавьте категорию';
                vm.boards = [];
                vm.showAddButton = false;
            }

            console.log(fetchNotes)
            
            DataService.saveDataToLocalStorage(fetchNotes);

            console.log('notes after removeCategory', notes);

            $scope.$parent.$broadcast('REMOVE_CATEGORY', 'data');
        }

        vm.deleteCertainNote = function(id) {
            notes[activeCategory].splice(findElem(notes[activeCategory], id), 1);
            DataService.saveDataToLocalStorage(fetchNotes);
        }
    };
}());