(function() {
'use strict';

    angular
    .module('todoList')
    .factory('DataService', DataService);

    DataService.$inject = ['Notes'];

    function DataService(Notes) {
        var cash;

        function fetchNotes() {
            cash = cash ? cash : getDataFromLocalStorage();
            cash = cash || Notes
            // cash = cash ? cash : Notes;
            console.log("api call")
            return  cash;
            // return  cash;
        }

        function saveDataToLocalStorage(data) {
            console.log("save data to localStorage")
            localStorage.setItem("todoListData", JSON.stringify(data));
        }

        function save() {
            console.log("save data", cash)
            localStorage.setItem("todoListData", JSON.stringify(cash));
        }

        function getDataFromLocalStorage() {
            return JSON.parse(localStorage.getItem("todoListData")); // добавить try catch
        }

        function getNotes() {
            return cash;
        }

        // для теста
        // window.getNotes = getNotes;
        // window.fetchNotes = fetchNotes;
        // window.saveDataToLocalStorage = saveDataToLocalStorage;
        // window.getDataFromLocalStorage = getDataFromLocalStorage;
        // window.save = save;

        return {
            fetchNotes: fetchNotes,
            getNotes: getNotes,
            saveDataToLocalStorage: saveDataToLocalStorage,
            save: save
        }
    }
}());