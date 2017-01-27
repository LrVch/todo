'use strict';

angular.module('core.notes').
	factory('Notes', ['$resource', function($resource) {
		  	return $resource('api/notes.json', {});
		}
	]);
