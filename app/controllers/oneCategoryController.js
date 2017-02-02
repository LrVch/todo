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

        function removeSticked(notes) {
            return notes.filter(function(note) {
                return !note.sticked;
            });
        }

        if (activeCategory in notes) {
            vm.activeCategory = activeCategory;
            // vm.notes = notes[vm.activeCategory];
            vm.notes = removeSticked(notes[vm.activeCategory]);
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
                vm.notes = [];
                vm.showAddButton = false;
            }

            console.log(fetchNotes)
            
            DataService.saveDataToLocalStorage(fetchNotes);

            console.log('notes after removeCategory', notes);

            $scope.$parent.$broadcast('REMOVE_CATEGORY', 'data');
        }

        vm.deleteCertainNote = function(id) {
            console.log(fetchNotes.data.user)
            notes[activeCategory].splice(findElem(notes[activeCategory], id), 1);
            console.log(fetchNotes.data.user)
            DataService.saveDataToLocalStorage(fetchNotes);
            $scope.$parent.$broadcast('DELETE_NOTE', {id: id, section: activeCategory});
            vm.notes = removeSticked(notes[vm.activeCategory]);
        }

        vm.stickFn = function(id) {
            notes[activeCategory][findElem(notes[activeCategory], id)].sticked = true;
            console.log("sticked in OneCategoryController");
            DataService.saveDataToLocalStorage(fetchNotes);
            // console.log(fetchNotes.data.user);
            $scope.$parent.$broadcast('STICK_NOTE', {id: id, section: activeCategory});
            vm.notes = removeSticked(notes[vm.activeCategory]);
        }

        vm.unstickNote =function(id) {
            notes[activeCategory][findElem(notes[activeCategory], id)].sticked = false;
            console.log("unsticked in OneCategoryController");
            DataService.saveDataToLocalStorage(fetchNotes);
            // console.log(fetchNotes.data.user);
            $scope.$parent.$broadcast('UNSTICK_NOTE', {id: id, section: activeCategory});
        }

        $scope.$on('UNSTICK_NOTE', function(e, data) {
            console.log("unsticked event form sticked controller")
            vm.notes = removeSticked(fetchNotes.data.user[vm.activeCategory]);
        });

        $scope.$parent.$broadcast('CHANGE_SECTION', {categoryId: $stateParams.categoryId});
    };
}());