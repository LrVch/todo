(function() {
"use strict";

    angular
	.module('todoList')
	.directive('listOfTasks', listOfTasks);

	listOfTasks.$inject = ['$state', 'isCompletedFilter'];

	function listOfTasks($state, isCompletedFilter) {
		return {
            restrict: 'E',
            scope: {
              note: '=',
              callbackFn: '&callbackFn'
            },
            templateUrl: 'templates/list-of-tasks.template.html',
            link: function(scope, element, attributes) {

                // console.log('listOfTasks', scope.note.notes);

                // console.log(scope.note);

                scope.change = function(id) {
                    scope.note.notes[findElem(scope.note.notes, id)].isCompleted = true;
                    console.log(findElem(scope.note.notes, id));
                    save();
                };

                scope.fromCompleted = function($event,id) {
                    $event.preventDefault();

                    scope.note.notes[findElem(scope.note.notes, id)].isCompleted = false;
                    scope.completed = false;
                    save();
                    console.log(findElem(scope.note.notes, id));
                }; 

                scope.delete = function($event,id) {
                    $event.preventDefault();
                    scope.note.notes.splice(findElem(scope.note.notes, id), 1);
                    console.log(findElem(scope.note.notes, id));
                    save();
                }; 

                scope.edit = function(id) {
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

                    area.value = text.innerHTML;
                    area.focus();
                }; 

                scope.saveText = function(id) {
                    const mainElem = element[0]; 
                    const text = mainElem.querySelector("div#" + id);
                    const area = mainElem.querySelector("textarea#" + id);

                    text.innerHTML = area.value;
                    scope.note.notes[findElem(scope.note.notes, id)].text = area.value;

                    text.hidden = false;
                    area.hidden = true;
                    save();
                }

                scope.editNew = function(id) {
                    const mainElem = element[0]; 
                    const text = mainElem.querySelector("div#newItem-001");
                    const area = mainElem.querySelector("textarea#newItem-001");

                    area.style.height = text.offsetHeight + "px";
                    area.style.width = text.offsetWidth + "px";
                    area.style.fontSize = getComputedStyle(text).fontSize;
                    area.style.fontFamily = getComputedStyle(text).fontFamily;

                    text.hidden = true;
                    area.hidden = false;

                    area.focus();
                }

                scope.addNew = function() {
                    const mainElem = element[0]; 
                    const text = mainElem.querySelector("div#newItem-001");
                    const area = mainElem.querySelector("textarea#newItem-001");

                    text.hidden = false;
                    area.hidden = true;

                    if (!area.value.trim()) {
                        return;
                    }

                    console.log("blur")

                    addNewNoteToTheEnd(area.value);
                    area.value = "";
                    save();
                }

                scope.addNewByKeyPress = function($event) {
                    if ($event.which === 13) {
                        const mainElem = element[0]; 
                        const text = mainElem.querySelector("div#newItem-001");
                        const area = mainElem.querySelector("textarea#newItem-001");

                        if (!area.value.trim()) {
                            return;
                        }


                        addNewNoteToTheEnd(area.value);
                        area.value = "";
                        save();
                    }
                }

                scope.addNoteAfterNote = function($event, id) {
                    const mainElem = element[0]; 
                    const area = mainElem.querySelector("textarea#" + id);

                    area.style.height = area.scrollHeight + "px";
                    // console.log(area.offsetHeight)


                    if ($event.which === 13) {
                        const newNoteId = "id" + genId();

                        scope.saveText(id);
                        addSiblingNote(id, newNoteId);

                        setTimeout(() => {
                            scope.edit(newNoteId);
                        }, 0);
                    }
                }

                function addNewNoteToTheEnd(text) {
                    scope.note.notes.push({
                        "text": text,
                        "isCompleted": false,
                        "id": "id" + genId()
                    });
                }

                function addSiblingNote(parentId, noteId) {
                    scope.note.notes.splice(findElem(scope.note.notes, parentId) + 1, 0, {
                        "text": "",
                        "isCompleted": false,
                        "id": noteId
                    });
                }

                function save() {
                    scope.callbackFn();
                }
            }

        }
	}
}());

