(function() {
"use strict";

    angular
	.module('todoList')
	.directive('oneNote', oneNote);

	oneNote.$inject = ['$state', 'DataService'];

	function oneNote($state, DataService) {
		return {
            restrict: 'E',
            scope: {
              note: '='
            },
            templateUrl: 'templates/one-note.template.html',
            link: function(scope, element, attributes) {

                console.log(scope)
                scope.plainText = scope.note.plainText;
                scope.isChecked = !scope.plainText;

                scope.edit = function edit() {
                    
                }




                // element.on('$destroy', function() {
                //   alert(1)
                // });
                
            },
            // controller: function ($scope, $element) {
            //     console.log('note directive');
            //     // console.log($element)
            //     console.log($scope)

      //           $scope.addBoard = function addBoard(activeCategory) {
      //           	// console.log("addBoard to ", activeCategory);

      //           	const fetchedNotes = $scope.oneCategory.fetchedNotes;
      //               const notes = fetchedNotes.data.user;
      //           	console.log(activeCategory);

      //           	notes[activeCategory].push({
      //           		"title": "title",
						// "id": Math.random().toString(32).slice(2),
						// "weigth": 0,
						// "notes": []
      //           	});

      //           	// console.log(fetchedNotes)

      //           	DataService.saveDataToLocalStorage(fetchedNotes);
      //           }

      //           $scope.editTitle = function editTitle($event, activeCategory, boardId) {
      //           	$event.preventDefault();

      //           	console.log(activeCategory, boardId);
      //           }

      //           function edit() {
				  //   area.style.height = view.offsetHeight + "px";
				  //   area.style.fontSize = getComputedStyle(view).fontSize;
				  //   area.style.fontFamily = getComputedStyle(view).fontFamily;

				  //   view.hidden = true;
				  //   area.hidden = false;
				  //   area.value = view.innerHTML;
				  //   area.focus();
				  // }

            // }
        }
	}
}());