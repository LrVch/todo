(function() {
"use strict";

    angular
	.module('todoList')
	.directive('listOfTasks', listOfTasks);

	listOfTasks.$inject = ['$state', 'DataService'];

	function listOfTasks($state, DataService) {
		return {
            restrict: 'E',
            scope: {
              note: '='
            },
            templateUrl: 'templates/list-of-tasks.template.html',
            link: function(scope, element, attributes, ngModel) {

                console.log('listOfTasks', scope.note.notes)
            }

        }
	}
}());