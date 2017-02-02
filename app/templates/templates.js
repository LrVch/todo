angular.module('templates').run(['$templateCache', function($templateCache) {$templateCache.put('templates/allCategories.template.html','<div class="container">\r\n\t<div class="row">\r\n\t\t<div class="col-sm-12">\r\n\t\t\t<h1>{{ test }}</h1>\r\n\t\t</div>\r\n\t</div>\r\n</div>');
$templateCache.put('templates/categories.template.html','<div class="header">\r\n\t<div class="container">\r\n\t\t<a ui-sref=".recent">\r\n\t\t\t<img src="http://static.tumblr.com/dfca590769e2c7630fffcd4f073a851e/vmdywfv/AIgmosa4l/tumblr_static_notes_logo_square.jpg"\r\n\t\t\twidth="80" height="80">\r\n\t\t</a>\r\n\t\t<div class="row">\r\n\t\t\t<div class="col-sm-6">\r\n\t\t\t\t<form>\r\n\t\t\t\t\t<div class="input-group">\r\n\t\t\t\t\t\t<span class="input-group-btn">\r\n\t\t\t\t\t\t\t<button class="btn btn-default" type="button" ng-click="addCatetory()">Add Category</button>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<input type="text" class="form-control" placeholder="category name" ng-model="categoryName">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</form>\r\n\t\t\t</div>\r\n\t\t\t<div class="col-sm-6">\r\n\t\t\t\t<div class="dropdown">\r\n\t\t\t\t\t<button ng-disabled="todos.categories.length ? false : true" class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\r\n\t\t\t\t\tCategories\r\n\t\t\t\t\t<span class="caret"></span>\r\n\t\t\t\t\t</button>\r\n\t\t\t\t\t<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">\r\n\t\t\t\t\t\t<li ng-repeat="category in todos.categories">\r\n\t\t\t\t\t\t\t<a ui-sref=".category({categoryId: category })">{{ category }}</a>\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!-- <a ui-sref=".all-categories">View all categories</a> -->\r\n\t</div>\r\n</div>\r\n\r\n<!-- disableDropDown -->');
$templateCache.put('templates/category.template.html','\r\n\t<!-- \u0432\u044B\u043D\u0435\u0441\u0442\u0438 \u0432 \u043E\u0442\u0434\u0435\u043B\u0443\u044E \u0434\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u0443 -->\r\n\t\t\r\n\t\r\n\t<!-- => \u0432\u044B\u043D\u0435\u0441\u0442\u0438 \u0432 \u043E\u0442\u0434\u0435\u043B\u0443\u044E \u0434\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u0443 -->\r\n');
$templateCache.put('templates/init.template.html','<categories></categories>\r\n<sticked notes="todos.fetchedNotes"></sticked>\r\n<div ui-view></div>');
$templateCache.put('templates/list-of-tasks.template.html','<ul class="list-group list-of-tasks">\r\n\t<li class="list-group-item list-of-tasks__item" ng-repeat="note in filtered = (note.notes | isCompleted: false) track by $index">\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<input type="checkbox" ng-model="note.isCompleted" ng-change="change(note.id)">\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<div class="list-of-tasks__item-text" id="{{note.id}}" ng-click="edit(note.id)">{{ note.text}}</div>\r\n\t\t\t<textarea\r\n\t\t\t\tclass="list-of-tasks__item-area"\r\n\t\t\t\tid="{{note.id}}"\r\n\t\t\t\thidden\r\n\t\t\t\tng-blur="saveText(note.id)"\r\n\t\t\t\tng-keypress="addNoteAfterNote($event, note.id)"\r\n\t\t\t></textarea>\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell" class="clearfix">\r\n\t\t\t<a href="#" class="glyphicon glyphicon-remove  pull-right" aria-hidden="true" ng-click="delete($event, note.id)"></a>\r\n\t\t</div>\r\n\t\t\r\n\t</li>\r\n\t<li class="list-group-item list-of-tasks__item">\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<div class="list-of-tasks__item-text" id="newItem-001" ng-click="editNew()">\r\n\t\t\t\t\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C\r\n\t\t\t</div>\r\n\t\t\t<textarea class="list-of-tasks__item-area" id="newItem-001" hidden ng-blur="addNew($event)" ng-keypress="addNewByKeyPress($event)"></textarea>\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t</div>\r\n\t</li>\r\n</ul>\r\n<hr style="border-top-color: #000">\r\n<ul class="list-group completed" >\r\n\t<li class="list-group-item" ng-repeat="note in filtered = (note.notes | isCompleted: true) track by $index">\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<a href="#" class="glyphicon glyphicon-arrow-up  pull-right" aria-hidden="true" ng-click="fromCompleted($event, note.id)"></a>\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<div class="list-of-tasks__item-text list-of-tasks__item-text--checked" id="{{note.id}}" ng-click="edit(note.id)">{{ note.text}}</div>\r\n\t\t\t<textarea class="list-of-tasks__item-area" id="{{note.id}}" hidden ng-blur="saveText(note.id)"></textarea>\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<a href="#" class="glyphicon glyphicon-remove  pull-right" aria-hidden="true" ng-click="delete($event, note.id)"></a>\r\n\t\t\t\r\n\t\t</div>\r\n\t</li>\r\n</ul>');
$templateCache.put('templates/one-note.template.html','<div class="panel panel-default">\r\n\t<div class="panel-heading">\r\n\t\t<div class="clearfix">\r\n\t\t\t<a href="#" class="glyphicon glyphicon-remove pull-right" aria-hidden="true" ng-click="deleteNote($event, note.id)"></a>\r\n\r\n\t\t\t<a href="#" ng-show="note.sticked" class="glyphicon glyphicon-heart pull-right" aria-hidden="true" ng-click="unstickNote($event, note.id)">&nbsp;</a>\r\n\r\n\t\t\t<a href="#" ng-show="!note.sticked" class="glyphicon glyphicon-heart-empty pull-right" aria-hidden="true" ng-click="stickNote($event, note.id)">&nbsp;</a>\r\n\r\n\t\t\t<small class="">last edited {{ note.time | date }} &nbsp;</small>\r\n\t\t</div>\r\n\t\t<div class="board-title">\r\n\t\t\t<textarea\r\n\t\t\t\tid="{{note.id}}"\r\n\t\t\t\tclass="board-title__area"\r\n\t\t\t\thidden\r\n\t\t\t\tng-blur="onChangeTitle(note.id)"\r\n\t\t\t\tng-keypress="saveOnEnter($event, note.id)"\r\n\t\t\t\t>\r\n\t\t\t</textarea>\r\n\t\t\t<div id="{{note.id}}" class="board-title-text" ng-click="editTitle(note.id)">{{ note.title }}</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="panel-body">\r\n\t\t<div class="content">\r\n\t\t\t<plain-text note="note" callback-fn="saveNoteInfo()" ng-show="note.plainText"></plain-text>\r\n\t\t\t<list-of-tasks note="note" callback-fn="saveNoteInfo()" ng-show="!note.plainText"></list-of-tasks>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="panel-footer">\r\n\t\t<div class="btn-group" role="group" aria-label="...">\r\n\t\t\t<button class="btn btn-default" type="button" ng-click="change=changeView(note.plainText)">{{ note.plainText ? "list" : "text" }}</button>\r\n\t\t\t<button class="btn btn-default" tyep="button" ng-show="isNotesInList(note.plainText, note)" ng-click=deleteAll()>\t\r\n\t\t\t\tdelete all \r\n\t\t\t</button>\r\n\t\t</div>\r\n\t\t<br>\r\n\t\t<div class="btn-group" role="group" aria-label="...">\t\r\n\t\t\t<button class="btn btn-default" tyep="button" ng-show="iscompletedInList(note.plainText, note)" ng-click="uncheckAll()">\r\n\t\t\t\tup all\r\n\t\t\t</button>\r\n\t\t\t<button class="btn btn-default" tyep="button" ng-show="iscompletedInList(note.plainText, note)" ng-click=deleteChecked()>\r\n\t\t\t\tdelete marked\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>');
$templateCache.put('templates/oneCategory.template.html','<div class="main">\r\n\t<div class="container">\r\n\t\t<h2 ng-click="oneCategory.removeCategory(oneCategory.activeCategory)" ng-bind="oneCategory.activeCategory"></h2>\r\n\t\t<div class="input-group">\r\n\t\t\t<span class="input-group-btn">\r\n\t\t\t\t<button class="btn btn-default" type="button">add note!</button>\r\n\t\t\t</span>\r\n\t\t\t<input type="text" class="form-control" placeholder="...">\r\n\t\t</div>\r\n\t\t<br>\r\n\t\t<div class="row">\r\n\t\t\t<div class="col-xs-12 col-sm-4 col-md-3" ng-repeat="note in oneCategory.notes">\r\n\t\t\t\t<one-note\r\n\t\t\t\t\tactive-section="{{ oneCategory.activeCategory }}"\r\n\t\t\t\t\tnote="note"\r\n\t\t\t\t\tcallback-fn="oneCategory.save()"\r\n\t\t\t\t\tdelete="oneCategory.deleteCertainNote(id)"\r\n\t\t\t\t\tstick-fn="oneCategory.stickFn(id)"\r\n\t\t\t\t\tunstick-fn="oneCategory.unstickNote(id)"\r\n\t\t\t\t\t>\r\n\t\t\t\t</one-note>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>');
$templateCache.put('templates/plain-text.template.html','<div class=plain-text>\r\n\t<div\r\n\t\tclass="plain-text__text"\r\n\t\tng-click=\'edit(note.id)\'\r\n\t\tid="{{note.id}}"\r\n\t\tng-bind-html="note.notes"\r\n\t>\r\n\t</div>\r\n\t<textarea\r\n\t\tclass="plain-text__area"\r\n\t\thidden\r\n\t\tng-blur="onBlurtext($event, note.id)"\r\n\t\tid="{{note.id}}">\r\n\t</textarea>\r\n</div>');
$templateCache.put('templates/recent.template.html','<div class="container">\r\n\t<h2>Recent</h2>\r\n\t<div class="row">\r\n\t\t<div class="col-sm-12">\r\n\t\t<h4>{{ recent.today }}</h4>\r\n\t\t<div class="row">\r\n\t\t\t<div class="col-xs-12 col-sm-4 col-md-3" ng-repeat="note in filtered = (recent.todayNotes)">\r\n\t\t\t\t<div> <a ui-sref="^.category({categoryId: note.section })" class="label label-default">{{ note.section }}</a> \r\n\t\t\t\t\t<one-note\r\n\t\t\t\t\t\tactive-section="{{ note.section }}"\r\n\t\t\t\t\t\tnote="note"\r\n\t\t\t\t\t\tcallback-fn="recent.save()"\r\n\t\t\t\t\t\tdelete="recent.deleteCertainNote(id, note.section)"\r\n\t\t\t\t\t\tstick-fn="recent.stickFn(id, note.section)"\r\n\t\t\t\t\t\tunstick-fn="recent.unstickNote(id, note.section)">\r\n\t\t\t\t\t</one-note>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>');
$templateCache.put('templates/sticked.template.html','<div class="container">\r\n\t<h3>{{ title }}</h3>\r\n\t<div class="row">\r\n\t\t<div class="col-xs-12 col-sm-4 col-md-3" ng-repeat="note in sticked">\r\n\t\t\t<div>\r\n\t\t\t\t<a ui-sref=".category({categoryId: note.section })" \r\n\t\t\t\t\tng-class="{\r\n\t\t\t\t\t\t\'label label-primary\' : note.section === activeCategory,\r\n\t\t\t\t\t\t\'label label-default\' : note.section !== activeCategory, }">\r\n\t\t\t\t\t{{ note.section }}\r\n\t\t\t\t</a> \r\n\t\t\t\t<one-note\r\n\t\t\t\t\tactive-section="{{ note.section }}"\r\n\t\t\t\t\tnote="note"\r\n\t\t\t\t\tcallback-fn="save()"\r\n\t\t\t\t\tdelete="deleteCertainNote(id, note.section)"\r\n\t\t\t\t\tunstick-fn="unstickNote(id, note.section)"\r\n\t\t\t\t\tstick-fn="update(id)">\r\n\t\t\t\t</one-note>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>');}]);