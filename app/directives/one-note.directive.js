(function() {
"use strict";

    angular
    .module('todoList')
    .directive('oneNote', oneNote);

    oneNote.$inject = ['DataService', '$interval'];

    function oneNote( DataService, $interval) {
        return {
            restrict: 'E',
            scope: {
              note: '=',
              callbackFn: '&callbackFn',
              deleteFn: '&delete',
              activeSection: '@',
              stickFn: '&stickFn',
              unstickFn: '&unstickFn'
            },
            templateUrl: 'templates/one-note.template.html',
            link: function(scope, element, attributes) {

                let timerId;

                scope.isNotesInList = function(plainText, note) {
                    if (!plainText && note.notes.length) {
                        return true;
                    }

                    return false;
                }

                scope.iscompletedInList = function(plainText, note) {
                    if (!plainText && isCompleted(note.notes)) {
                        return true;
                    }

                    return false;
                }

                scope.deleteNote = function($event, id) {
                    $event.preventDefault();

                    scope.deleteFn({id: id});
                }

                scope.editTitle = function(id) {
                    const mainElem = element[0]; 
                    const text = mainElem.querySelector("div#" + id);
                    const area = mainElem.querySelector("textarea#" + id);

                    // сделать нормально и вынести в функцию
                    area.style.height = text.offsetHeight + "px";
                    area.style.width = text.offsetWidth + "px";

                    area.style.fontSize = getComputedStyle(text).fontSize;
                    area.style.fontFamily = getComputedStyle(text).fontFamily;
                    area.style.paddingTop = getComputedStyle(text).paddingTop;
                    area.style.paddingBottom = getComputedStyle(text).paddingBottom;
                    area.style.paddingLeft = getComputedStyle(text).paddingLeft;
                    area.style.paddingRight = getComputedStyle(text).paddingRight;
                    area.style.lineHeight = getComputedStyle(text).lineHeight;

                    text.hidden = true;
                    area.hidden = false;

                    timerId = $interval(function() {
                        area.style.height = area.scrollHeight + "px";
                        console.log("yes");
                    }, 50);

                    area.value = text.innerHTML;
                    area.focus();
                    // console.log(mainElem);
                }

                scope.onChangeTitle = function(id) {
                    const mainElem = element[0];
                    const text = mainElem.querySelector("div#" + id);
                    const area = mainElem.querySelector("textarea#" + id);

                    text.innerHTML = area.value;

                    $interval.cancel(timerId);
                    timerId = undefined;

                    text.hidden = false;
                    area.hidden = true;

                    scope.titleNote = area.value;

                    saveNoteInfo();
                }

                scope.saveOnEnter = function($event, id) {
                    if ($event.which === 13) {
                        scope.onChangeTitle(id);
                    }
                }

                scope.saveNoteInfo = saveNoteInfo;

                scope.deleteAll = function() {
                    scope.note.notes = [];
                    saveNoteInfo();
                }

                scope.deleteChecked = function() {
                    scope.note.notes = deleteCompleted(scope.note.notes);
                    saveNoteInfo();
                }

                scope.changeView = function(plainText) {
                    plainText = !plainText;

                    if (!plainText) {
                        scope.note.notes = toList(scope.note.notes);
                        scope.note.plainText = false;
                        console.log("list");
                    } else {
                        if ( isCompleted(scope.note.notes) ) {
                            const confirmarion = confirm("Удалить завершенные?");

                            if (confirmarion) {
                                const filtered = deleteCompleted(scope.note.notes);
                                scope.note.notes = toText(filtered);
                            } else {
                                scope.note.notes = toText(scope.note.notes);
                            }

                            scope.note.plainText = true;
                            saveNoteInfo();
                            return;
                        }

                        scope.note.notes = toText(scope.note.notes);
                        scope.note.plainText = true;
                        console.log("text");
                    }

                    saveNoteInfo();
                }

                scope.uncheckAll = function() {
                    scope.note.notes = uncheckAll(scope.note.notes);
                    saveNoteInfo();
                }

                scope.stickNote = function($event, id) {
                    $event.preventDefault();

                    console.log("stick")
                    scope.stickFn({id: id});
                }

                scope.unstickNote = function($event, id) {
                    $event.preventDefault();

                    console.log("unstick");
                    scope.unstickFn({id: id});
                }

                function saveNoteInfo() {
                    scope.note.time = Date.now();
                    scope.note.section = scope.activeSection;
                    

                    if (scope.titleNote) {
                        scope.note.title = scope.titleNote;
                        
                    }

                    scope.callbackFn();

                    scope.$parent.$parent.$parent.$broadcast('EDIT_TODAY', 'edit today');
                    // console.log(scope)
                }

                function toText(list) {
                    let count = 0;

                    return list.reduce(function(str, item) {
                        str += (count >= list.length - 1) ? item.text : item.text + "<br>";
                        count++;
                        return str;
                    }, "");
                }     

                function isCompleted(list) {
                    return list.some(function(item) {
                        return item.isCompleted;
                    });
                }           

                function toList(text) {
                    const arr = text.split("<br>");

                    if (arr.length === 1 && arr[0] === "") {
                        return [];
                    }

                    const type = scope.note.allowedTypes[0]; 

                    return arr.map(function(text) {
                        return {
                            "text": text,
                            "isCompleted": false,
                            "id": "id" + genId(),
                            "type": type
                        };
                    });
                }

                function deleteCompleted(list) {
                    return list.filter(function(item) {
                        return !item.isCompleted;
                    });
                }

                function uncheckAll(list) {
                    return list.map(function(item) {
                        item.isCompleted = false;
                        return item;
                    })
                }


                // scope.$on('$destroy', function() {
                //     console.log("delete note")
                // });
            },
        }
    }
}());