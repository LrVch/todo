"use strict";

angular.module('todoList')
    .controller('WelcomeController', ['$scope', 'DataService', 'fetchNotes', function ($scope, DataService, fetchNotes) {

    	console.log('WelcomeController')
    	const notes = DataService.getNotes();
        const arr = [];
        console.log('fetchNotes', fetchNotes)
        $scope.fetchNotes = fetchNotes;
        
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
        $scope.today = allNotes.length ? 'изменены сегодня' : 'изменений не было';

        // console.log(allNotes)
        
    }]);