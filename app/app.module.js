'use strict';

// angular.module('todoList', ['core', 'cfp.hotkeys', 'templates']);
angular.module('todoList', ['core', 'templates', 'ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
    
	    $urlRouterProvider.otherwise('all-categories');

	    $urlRouterProvider.when('', '/');
	    
		$stateProvider
			.state('/', {
			    url: '/',
			    templateUrl: 'templates/welcome.template.html',
			    resolve: {
			    	fetchNotes: ['DataService', function(DataService) {
			    		return DataService.fetchNotes();
			    	}]
				},
			    controller: 'WelcomeController'
		    }) 
		  	.state('all-categories', {
		    	url: '/all-categories',
		    	templateUrl: 'templates/allCategories.template.html',
		    	resolve: {
			    	fetchNotes: ['DataService', function(DataService) {
			    		return DataService.fetchNotes();
			    	}]
				},
				controller: 'AllCategoriesController'

	    	})
	    	.state('category', {
			    url: '/category/:categoryId',
			    templateUrl: 'templates/oneCategory.template.html',
			    resolve: {
			    	fetchNotes: ['DataService', function(DataService) {
			    		return DataService.fetchNotes();
			    	}]
				},
			    controller: 'OneCategoryController'
		    }) 
	})
	.factory('DataService', ['Notes', '$q', '$rootScope', function(Notes, $q, $rootScope) {

		const data = {};
		const deferred = $q.defer();

        function fetchNotes() {
        	Notes.get({}, function (notes) {
        		if(notes) {
        			data.notes = getDataFromLocalStorage() || notes.user;
        			$rootScope.categories = Object.keys(data.notes)
        			deferred.resolve(data.notes);
        			console.log("api call");
        		} else {
        			deferred.reject(err);
        			console.log(err);
        		}
        	});

        	return deferred.promise;
        }

        function saveDataToLocalStorage() {
        	localStorage.setItem("todoListData", JSON.stringify(data.notes));
        }

        function getDataFromLocalStorage() {
        	return JSON.parse(localStorage.getItem("todoListData")); // добавить try catch
        }

        function getNotes() {
        	return data.notes;
        }

        function setNotes(notes) {
        	data.notes = notes;
        }

        // для теста
        window.getNotes = getNotes;
        window.saveDataToLocalStorage = saveDataToLocalStorage;
        window.getDataFromLocalStorage = getDataFromLocalStorage;

    	return {
    		fetchNotes: fetchNotes,
    		getNotes: getNotes,
    		setNotes: setNotes,
    		saveDataToLocalStorage: saveDataToLocalStorage,
    	}
	}]);