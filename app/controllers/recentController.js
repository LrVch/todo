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
        }

        function init(notes) {
            const keys = Object.keys(notes);

            const allNotes = keys.reduce((arr, key) => {
                return arr.concat(notes[key]);
            }, []);

            vm.allNotes = allNotes;
            vm.todayNotes = isTodayFilter(allNotes);
            vm.today = vm.todayNotes.length ? 'изменены сегодня' : 'изменений не было';
        }

    };
}());