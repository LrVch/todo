(function() {
'use strict';

	angular
	.module('todoList')
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	    $urlRouterProvider.otherwise("/");
      
		$stateProvider
			.state('app', {
				abstract: true,
                templateUrl: 'templates/init.template.html',
                controller: 'TodoListController as todos',
                resolve: {
				    	fetchNotes: ['DataService', function(DataService) {
				    		return DataService.fetchNotes();
				    	}]
				    }
	        })
			.state('app.recent', {
                url: "/",
                templateUrl: 'templates/recent.template.html',
                controller: 'RecentController as recent',
            })
            .state('app.all-categories', {
                url: '/all-categories',
                templateUrl: 'templates/allCategories.template.html',
                controller: 'AllCategoriesController as allCategories',
            })
            .state('app.category', {
			    url: '/category/:categoryId',
			    templateUrl: 'templates/oneCategory.template.html',
			    controller: 'OneCategoryController'
		    });


            $locationProvider.html5Mode(false).hashPrefix('!');

	});
}());

(function() {
'use strict';

	var DataService = function(Notes) {
		let cash;

        function fetchNotes() {
        	cash = cash ? cash : getDataFromLocalStorage();
        	// cash = cash ? cash : Notes;
        	console.log("api call")
	        return  cash || Notes;
	        // return  cash;
        }

        function saveDataToLocalStorage(data) {
        	localStorage.setItem("todoListData", JSON.stringify(data));
        }

        function getDataFromLocalStorage() {
        	return JSON.parse(localStorage.getItem("todoListData")); // добавить try catch
        }

        function getNotes() {
        	return cash;
        }

        // для теста
        window.getNotes = getNotes;
        window.fetchNotes = fetchNotes;
        window.saveDataToLocalStorage = saveDataToLocalStorage;
        window.getDataFromLocalStorage = getDataFromLocalStorage;

    	return {
    		fetchNotes: fetchNotes,
    		getNotes: getNotes,
    		saveDataToLocalStorage: saveDataToLocalStorage,
    	}
	}

	DataService.$inject = ['Notes'];

	angular
	.module('todoList')
	.factory('DataService', DataService);
}());