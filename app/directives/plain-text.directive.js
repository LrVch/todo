(function() {
"use strict";

  angular
	.module('todoList')
	.directive('plainText', plainText);

	plainText.$inject = ['$state', 'DataService', '$interval'];

	function plainText($state, DataService, $interval) {
		return {
            restrict: 'E',
            scope: {
              note: '=',
              callbackFn: '&callbackFn'
            },
            templateUrl: 'templates/plain-text.template.html',
            link: function(scope, element, attributes) {

              // console.log('plainText', scope.note.notes)
                let timerId;

                scope.edit = function edit(id) {
                    const mainElem = element[0]; 
                    const text = mainElem.querySelector("div#" + id);
                    const area = mainElem.querySelector("textarea#" + id);

                    // сделать нормально и вынести в функцию
                    area.style.height = text.offsetHeight + "px";
                    area.style.width = text.offsetWidth + "px";

                    area.style.fontSize = getComputedStyle(text).fontSize;
                    area.style.fontFamily = getComputedStyle(text).fontFamily;

                    text.hidden = true;
                    area.hidden = false;

                    timerId = $interval(function() {
                        area.style.height = area.scrollHeight + "px";
                        // console.log("yes");
                    }, 50);

                    area.value = addNewLine(text.innerHTML);
                    area.focus();         
                }

                scope.onBlurtext = function($event, id) {
                    const mainElem = element[0]; 
                    const text = mainElem.querySelector("div#" + id);
                    const area = mainElem.querySelector("textarea#" + id);

                    text.innerHTML = addBr(area.value);

                    $interval.cancel(timerId);
                    timerId = undefined;
                    // console.log(scope)
                    scope.note.notes = addBr(area.value);

                    text.hidden = false;
                    area.hidden = true;
                    save();
                }

                function save() {
                    scope.callbackFn();
                }
            }
        }
	}
}());