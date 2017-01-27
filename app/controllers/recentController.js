(function() {
"use strict";

    angular
    .module('todoList')
    .controller('RecentController', RecentController);

    RecentController.$inject = ['$scope', 'DataService','fetchNotes', 'isTodayFilter'];

    function RecentController($scope, DataService, fetchNotes, isTodayFilter) {
        console.log('RecentController')
        const notes = fetchNotes.data.user;
        const arr = [];

        // console.log('notes', notes)
        
        for (let item in notes) {
            arr.push(notes[item]);
        }
        const allBlocks = arr.reduce(function(arr, item) {
            arr.push(...item);
            return arr;
        }, []);
        const allNotesArr = allBlocks.map(function(item) {
            return item.notes;
        });
        const allNotes = allNotesArr.reduce(function(arr, item) {
            arr.push(...item);
            return arr;
        }, []);

        $scope.allNotes = allNotes;
        const todayNotes = isTodayFilter(allNotes);
        $scope.today = todayNotes.length ? 'изменены сегодня' : 'изменений не было';

        // console.log(allNotes)
    };
}());