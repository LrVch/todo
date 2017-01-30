(function() {
"use strict";

    angular
	.module('todoList')
	.directive('plainText', plainText);

	plainText.$inject = ['$state', 'DataService'];

	function plainText($state, DataService) {
		return {
            restrict: 'E',
            scope: {
              note: '='
            },
            templateUrl: 'templates/plain-text.template.html',
            link: function(scope, element, attributes, ngModel) {

              console.log('plainText', scope.note.notes)

              scope.edit = function edit(noteIid, noteSection) {
                 console.log(noteIid, noteSection)         
              }
            }

            

        }
	}
}());