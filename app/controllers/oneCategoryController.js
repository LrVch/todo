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
        vm.fetchNotes = fetchNotes;
        console.log(fetchNotes)
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
            vm.showAddField = true;          

        } else {
            vm.activeCategory = 'нет такой категории';
            vm.showAddField = false;
         return            
        }

        vm.save = function() {
            console.log("save data");
            vm.notes = removeSticked(notes[vm.activeCategory]);
            DataService.saveDataToLocalStorage(fetchNotes);
        }

        // function checkCategoryFill() {
        //     return false;
        // }

        vm.removeCategory = function removeCategory(name) {
            if (notes[activeCategory].length) {
                const confirmation = confirm("Категория не пуста, всеравно удалить?");
                if (!confirmation) {
                    return;
                }
            }


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
                vm.showAddField = false;
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