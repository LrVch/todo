(function() {
"use strict";

    angular
    .module('todoList')
    .directive('addNote', addNote);

    addNote.$inject = ['DataService', '$interval', '$timeout'];

    function addNote(DataService, $interval, $timeout) {
        return {
            restrict: 'E',
            scope: {
              notes: '=',
              saveFn: '&saveFn',
              section: '@'
            },
            templateUrl: 'templates/add-note.template.html',
            link: function(scope, element, attributes) {
                // console.log(scope.notes)
                const placeHolderTitle = "Enter a title";
                const mainElem = element[0];
                const titleElem = mainElem.querySelector("#addTitle");
                const plainTextElem = mainElem.querySelector("#addNoteText");

                scope.currentView = true; // plain text
                scope.isEdit = false;
                scope.text = "";
                scope.title = placeHolderTitle;
                scope.welcomeText = "take a note";
                scope.sticked = false;
                scope.isCompletedInNote = false;

                // document.body.addEventListener("click", function(event) {
                //     console.log(event.target.closest('.add-note'))
                //     if (!!event.target.closest('.add-note')) {
                //         console.log("close")
                //         scope.close();
                //         console.log(scope.isEdit)
                //     }
                // }, false);

                scope.close = function() {
                    scope.isEdit = false;
                    reset();
                }


                scope.activate = function() {
                    scope.isEdit = true;
                    scope.currentView = true;

                    titleElem.contentEditable = true;
                    plainTextElem.contentEditable = true;

                    $timeout(function() {
                        plainTextElem.focus();
                    }, 0);
                }

                scope.manageTitle = function() {
                    titleElem.contentEditable = true;
                    titleElem.focus();

                    if (scope.title === placeHolderTitle) {
                        scope.title = "";
                    }
                    console.log(scope.title)
                }

                scope.gotoText = function($event) { 
                     if ($event.which === 13) {
                        titleElem.contentEditable = false;
                        // document.body.focus();
                        // return;
                        // plainTextElem.focus();

                        // пофиксить добавление первоголишнего дива
                        // setTimeout(() => {
                        //     const elem = plainTextElem.querySelector("div");
                        //     console.log(plainTextElem)/
                        //     elem.parentNode.removeChild(elem)
                        // }, 0)
                         // удалить первый пустой див
                    } 
                }

                scope.setTitle = function() {
                    // console.log(scope.title)
                    if (titleElem.innerHTML.replace(/\&nbsp\;/gi, "").trim().length) {
                        scope.title = titleElem.innerHTML;
                        // console.log(scope.title)
                        return;
                    }

                    scope.title = placeHolderTitle;
                }

                scope.setPlainText = function() {
                    scope.text = plainTextElem.innerHTML;
                }

                scope.changeView = function(currentView) {
                    scope.currentView = !currentView;
                    scope.isEdit = true;
                    titleElem.contentEditable = true;
                    plainTextElem.contentEditable = true;

                    if (scope.currentView) { // в текст
                        console.log("text");
                        if (!scope.text.length) {
                            scope.text = "";
                            return;
                        }

                        if ( isCompleted(scope.text) ) {
                            const confirmarion = confirm("Удалить завершенные?");

                            if (confirmarion) {
                                const filtered = deleteCompleted( scope.text);
                                scope.text = toText(filtered);
                            } else {
                                scope.text = toText(scope.text);
                            }
                        }

                        scope.text = toText(scope.text);
                    } else { // в список
                        console.log("list");
                        if (!scope.text.replace(/\&nbsp\;/gi, "").trim().length) {
                            scope.text = [];
                            return;
                        }

                        scope.text = toList(scope.text);
                        scope.isCompletedInNote = scope.iscompletedInList(scope.currentView, scope.text);
                    }

                }

                scope.editItem = function($event, id) {
                    const elem = mainElem.querySelector("#" + id);

                    elem.contentEditable = true;
                    elem.focus();
                }

                scope.addNewItem = function($event, id) {
                    const elem = mainElem.querySelector("#" + id);
                    const newItemId = "id" + genId();

                    // console.log($event.which)

                    scope.text.push(createItem(String.fromCharCode($event.which), newItemId));
                    // scope.text.push(createItem("", newItemId));
                   

                    $timeout(function() {
                        const newItem = mainElem.querySelector("#" + newItemId);

                        newItem.contentEditable = true;
                        placeCaretAtEnd(newItem);
                        
                        elem.innerHTML = "";

                    }, 0);
                }

                scope.saveItem = function(id) {
                    const elem = mainElem.querySelector("#" + id);
                    scope.text[findElem(scope.text, id)].text = elem.innerHTML;
                }

                scope.deleteItemFromList = function($event, id) {
                    $event.preventDefault();

                    console.log(id)

                    scope.text.splice(findElem(scope.text, id), 1);
                    scope.isCompletedInNote = scope.iscompletedInList(scope.currentView, scope.text);
                }

                scope.addItemAfterItem = function($event, id) {
                    if ($event.which === 13) {
                        $event.preventDefault();

                        mainElem.querySelector("#" + id).contentEditable = false;

                        const newItemId = "id" + genId();

                        scope.text.splice(findElem(scope.text, id) + 1, 0, createItem("", newItemId));

                        $timeout(function() {
                            const newItem = mainElem.querySelector("#" + newItemId);
                            newItem.contentEditable = true;
                            newItem.focus();
                        }, 0);
                    }
                }

                scope.changeCompleted = function(id) {
                    scope.text[findElem(scope.text, id)].isCompleted = true;
                    scope.isCompletedInNote = scope.iscompletedInList(scope.currentView, scope.text);
                }

                scope.fromCompleted = function($event, id) {
                    $event.preventDefault();

                    scope.text[findElem(scope.text, id)].isCompleted = false;
                    scope.isCompletedInNote = scope.iscompletedInList(scope.currentView, scope.text);
                }

                scope.addNote = function() {
                    scope.isEdit = false;

                    // console.log('scope.text', scope.text)
                    // console.log('scope.title', scope.title)

                    let text;
                    const type = genId() + "";

                    if (scope.currentView) {
                        text = cleraFromDiv(scope.text); // как текст
                        console.log(text)
                    } else {
                        text = clearListItem(scope.text); // как список
                        text =  addTypeToListItem(text, type)
                        console.log(text);
                    }

                    if (!text.length) {
                        return;
                    }

                    
                    injectNote({ // добавление
                        "title": scope.title === placeHolderTitle ? "" : scope.title,
                        "id": "id" + genId(),
                        "allowedTypes": [type],
                        "notes": text,
                        "plainText": scope.currentView,
                        "section": scope.section,
                        "time": Date.now(),
                        "sticked": scope.sticked,
                        "type": "note"
                    });

                    scope.saveFn(); //сохранение
                    reset();


                    console.log('isEdit', scope.isEdit);
                }

                scope.stickNote = function($event) {
                    $event.preventDefault();

                    scope.sticked = true;
                }

                function createItem(text, id) {
                    return {
                        "text": text,
                        "isCompleted": false,
                        "id": id
                    }
                }

                function reset() {
                    scope.text = "";
                    scope.title = placeHolderTitle;
                    scope.currentView = true;
                    scope.sticked = false;
                }

                function cleraFromDiv(str) {
                    if (str.indexOf("<div\>") === -1) {
                        return str;
                    }

                    return str
                        .replace(/\&nbsp\;/gi, "")
                        .replace(/\amp\;/gi, "")
                        .replace(/\<\/div\>/gi, "")
                        .replace(/\<br\>/gi, "")
                        .replace(/\<div\>/gi, "<br>");
                }

                function clearString(str) {
                    return str
                        .replace(/\&nbsp\;/gi, "")
                        .replace(/\amp\;/gi, "")
                        .replace(/\<\/div\>/gi, "")
                        .replace(/\<br\>/gi, "")
                        .replace(/\<div\>/gi, "<br>");
                }

                function injectNote(note) {
                    // console.log(scope.notes.data.user[scope.section])
                    scope.notes.data.user[scope.section].splice(0, 0, note);
                    // console.log(scope.notes.data.user[scope.section])
                }

                function toList(text) {
                    const clear = cleraFromDiv(text)
                    const arr = clear.split("<br>");

                    if (arr.length === 1 && arr[0] === "") {
                        return [];
                    }

                    return arr.map(function(text) {
                        return {
                            "text": text,
                            "isCompleted": false,
                            "id": "id" + genId()
                        };
                    });
                }

                function toText(list) {
                    return list.reduce(function(str, item, index) {
                        // item = cleraFromDiv(item);
                        str += (index === 0) ? item.text : "<div>" + item.text + "</div>";
                        return str;
                    }, "");
                }  

                function isCompleted(list) {
                    return list.some(function(item) {
                        return item.isCompleted;
                    });
                }  

                scope.iscompletedInList = function(plainText, list) {
                    if (!plainText && isCompleted(list)) {
                        return true;
                    }

                    return false;
                }

                function deleteCompleted(list) {
                    return list.filter(function(item) {
                        return !item.isCompleted;
                    });
                }

                function clearListItem(list) {
                    const resultList = list.slice();

                    return resultList.map(function(item) {
                        item.text = clearString(item.text);
                        return item;
                    });
                }

                function addTypeToListItem(list, type) {
                    const resultList = list.slice();

                    return resultList.map(function(item) {
                        item.type = type;
                        return item;
                    });
                }


            },
        }
    }
}());