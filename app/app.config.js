(function() {
'use strict';

	angular
	.module('todoList')
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {

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
            .state('app.category', {
			    url: '/category/:categoryId',
			    templateUrl: 'templates/oneCategory.template.html',
			    controller: 'OneCategoryController as oneCategory'
		    });


            $locationProvider.html5Mode(false).hashPrefix('!');

	}]);
}());

