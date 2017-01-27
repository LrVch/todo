(function() {
'use strict';

	angular.module('core.notes')
		.factory('Notes', ['$http', function($http) {
			console.log("notes service call")
			  	return $http({method: 'GET', url: 'api/notes.json'});
			}
		]);
}());

