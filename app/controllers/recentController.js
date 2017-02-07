(function() {
"use strict";

    angular
    .module('todoList')
    .controller('RecentController', RecentController);

    RecentController.$inject = ['$scope', 'DataService','fetchNotes', 'isTodayFilter', 'newFirstFilter'];

    function RecentController($scope, DataService, fetchNotes, isTodayFilter, newFirstFilter) {
        console.log('RecentController')

        const vm = this;
        const notes = fetchNotes.data.user;

        init(notes)

        vm.save = function() {
            console.log("save data in recent");
            DataService.saveDataToLocalStorage(fetchNotes);
        }

        vm.deleteCertainNote = function(id, section) {
            fetchNotes.data.user[section].splice(findElem(fetchNotes.data.user[section], id), 1);
            init(fetchNotes.data.user);
            DataService.saveDataToLocalStorage(fetchNotes);
            $scope.$parent.$broadcast('DELETE_NOTE', {id: id, section: section});
        }

        function init(notes) {
            const keys = Object.keys(notes);
            const allNotes = keys.reduce(function(arr, key) {
                return arr.concat(notes[key]);
            }, []);

            vm.allNotes = allNotes;
            vm.todayNotes = isTodayFilter(allNotes);
            vm.today = vm.todayNotes.length ? 'changed today' : 'there are no changes today';
        }

        vm.stickFn = function(id, section) {
            notes[section][findElem(notes[section], id)].sticked = true;
            console.log("sticked in OneCategoryController");
            DataService.saveDataToLocalStorage(fetchNotes);
            console.log(fetchNotes.data.user);
            $scope.$parent.$broadcast('STICK_NOTE', {id: id, section: section});
        }

        vm.unstickNote =function(id, section) {
            notes[section][findElem(notes[section], id)].sticked = false;
            console.log("unsticked in OneCategoryController");
            DataService.saveDataToLocalStorage(fetchNotes);
            console.log(fetchNotes.data.user);
            $scope.$parent.$broadcast('UNSTICK_NOTE', {id: id, section: section});
        }

        $scope.$on('EDIT_TODAY', function(e, data) {
            console.log('EDIT_TODAY', data);
            init(fetchNotes.data.user);
        });

        $scope.$parent.$broadcast('CHANGE_SECTION', {categoryId: ''});

    };
}());