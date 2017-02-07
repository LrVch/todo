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

                function render() {
                    scope.unCompleted = Array.isArray(scope.note.notes) ? getUnCompleted(scope.note.notes) : [];
                    scope.completed = Array.isArray(scope.note.notes) ? getCompleted(scope.note.notes) : [];
                    // console.log('scope.unCompleted', scope.unCompleted)
                    // console.log('scope.completed', scope.completed)
                }

                render();

                // console.log('listOfTasks', scope.note.notes);

                // console.log('scope.note', scope.note);
                scope.writeListOrder = function(note) {
                    console.log("writeListOrder");
                    console.log(scope.note)
                    console.log(note)
                    const allNotes = scope.unCompleted.concat(scope.completed);
                    scope.note.notes = allNotes;
                    console.log(scope.note.notes)
                    save();
                    render();
                    // render();
                }

                scope.logEvent = function(event, mess) {
                    console.log('logEvent', mess)
                    console.log(event)
                    console.log(event.target)
                }

                scope.change = function(id) {
                    console.log(id)
                    scope.note.notes[findElem(scope.note.notes, id)].isCompleted = true;
                    console.log(findElem(scope.note.notes, id));
                    save();
                    render();
                };

                scope.fromCompleted = function($event,id) {
                    $event.preventDefault();

                    scope.note.notes[findElem(scope.note.notes, id)].isCompleted = false;
                    scope.completed = false;
                    save();
                    render();
                    console.log(findElem(scope.note.notes, id));
                }; 

                scope.delete = function($event,id) {
                    $event.preventDefault();
                    scope.note.notes.splice(findElem(scope.note.notes, id), 1);
                    console.log(findElem(scope.note.notes, id));
                    save();
                    render();
                }; 

                scope.edit = function(id) {
                    const mainElem = element[0]; 
                    const text = mainElem.querySelector("div[data-id='" + id + "']");
                    const area = mainElem.querySelector("textarea[data-id='" + id + "']");

                    console.log(id)
                    console.log(mainElem)
                    console.log(text)
                    console.log(area)

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
                    const text = mainElem.querySelector("div[data-id='" + id + "']");
                    const area = mainElem.querySelector("textarea[data-id='" + id + "']");

                    text.innerHTML = area.value;
                    scope.note.notes[findElem(scope.note.notes, id)].text = area.value;

                    text.hidden = false;
                    area.hidden = true;
                    save();
                    render();
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
                    render();
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
                        render();
                    }
                }

                scope.addNoteAfterNote = function($event, id) {
                    const mainElem = element[0]; 
                    const area = mainElem.querySelector("textarea[data-id='" + id + "']");

                    area.style.height = area.scrollHeight + "px";
                    // console.log(area.offsetHeight)


                    if ($event.which === 13) {
                        const newNoteId = "id" + genId();

                        scope.saveText(id);
                        addSiblingNote(id, newNoteId);

                        setTimeout(function() {
                            console.log("newNoteId", newNoteId)
                            scope.edit(newNoteId);
                        }, 0);
                    }
                }

                function addNewNoteToTheEnd(text) {
                    const type = scope.note.allowedTypes[0];

                    scope.note.notes.push({
                        "text": text,
                        "isCompleted": false,
                        "id": "id" + genId(),
                        "type": type
                    });
                }

                function addSiblingNote(parentId, noteId) {
                    const type = scope.note.allowedTypes[0];

                    scope.note.notes.splice(findElem(scope.note.notes, parentId) + 1, 0, {
                        "text": "",
                        "isCompleted": false,
                        "id": noteId,
                        "type": type
                    });
                }

                function save() {
                    scope.callbackFn();
                }

                function getCompleted(notes) {
                    return notes.filter(function(note) {
                        return note.isCompleted;
                    })
                }

                function getUnCompleted(notes) {
                    return notes.filter(function(note) {
                        return !note.isCompleted;
                    })
                }


                scope.$on('EDIT_TODAY', function(e, data) {
                    // console.log(data)
                    render();
                    // vm.categories = Object.keys(fetchedNotes.data.user);
                    // alert("form list")
                    // vm.isCategories = !!vm.categories.length;
                    // console.log('vm.isCategories', vm.isCategories)
                });
            }

        }
	}
}());

