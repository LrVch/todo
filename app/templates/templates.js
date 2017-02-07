angular.module('templates').run(['$templateCache', function($templateCache) {$templateCache.put('templates/add-note.template.html','<div class="add-note clearfix" ">\r\n\t{{ welcomeText }}\r\n\t<div\r\n\t\tng-show="!isEdit"\r\n\t\tng-click="activate()"\r\n\t\tclass="add-note__mask"></div>\r\n\r\n\t<!-- <div class="add-note__btns"> -->\r\n\t\t<!-- <a\r\n\t\t\thidden\r\n\t\t\thref="#"\r\n\t\t\tclass="glyphicon glyphicon-star-empty"\r\n\t\t\tng-click="stickNote($event)"></a> -->\r\n\t\t<button\r\n\t\t\tclass="add-note__togle-view"\r\n\t\t\ttype="button"\r\n\t\t\tng-click="changeView(currentView)">{{ currentView ? \'L\' : \'T\' }}</button>\r\n\t<!-- </div> -->\r\n\r\n\t<div\r\n\t\tclass="add-note__content"\r\n\t\tng-show="isEdit">\r\n\t\t\r\n\t\t<!-- title -->\r\n\t\t<div\r\n\t\t\tclass="add-note__title"\r\n\t\t\tid="addTitle"\r\n\t\t\tng-bind-html="title"\r\n\t\t\tng-keypress="gotoText($event)"\r\n\t\t\tng-blur="setTitle()"\r\n\t\t\tng-click="manageTitle()"\r\n\t\t\t></div>\r\n\r\n\t\t<!-- text -->\r\n\t\t<div\r\n\t\t\tng-show="currentView"\r\n\t\t\tclass="add-note__text"\r\n\t\t\tid="addNoteText"\r\n\t\t\tng-bind-html="text"\r\n\t\t\tng-blur="setPlainText()"\r\n\t\t\ttabindex="0"></div>\r\n\r\n\t\t<!-- list -->\r\n\t\t<div\r\n\t\t\tng-show="!currentView"\r\n\t\t\tclass="add-note__list-view">\r\n\t\t\t<ul class="add-note__list">\r\n\t\t\t\t<li\r\n\t\t\t\t\tclass="list-group-item add-note__list-item"\r\n\t\t\t\t\tng-repeat="item in filtered = (text | isCompleted: false)  track by $index">\r\n\t\t\t\t\t<div class="add-note__list-item-cell">\r\n\t\t\t\t\t\t<input type="checkbox" ng-model="item.isCompleted" ng-change="changeCompleted(item.id)">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="add-note__list-item-cell">\r\n\t\t\t\t\t\t<div\r\n\t\t\t\t\t\t\tclass="add-note__list-item-area"\r\n\t\t\t\t\t\t\tid="{{item.id}}"\r\n\t\t\t\t\t\t\tng-blur="saveItem(item.id)"\r\n\t\t\t\t\t\t\tng-keypress="addItemAfterItem($event, item.id)"\r\n\t\t\t\t\t\t\tng-click="editItem($event, item.id)"\r\n\t\t\t\t\t\t\tng-bind-html="item.text"\r\n\t\t\t\t\t\t></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="add-note__list-item-cell" class="clearfix">\r\n\t\t\t\t\t\t<a href="#" class="glyphicon glyphicon-remove  pull-right add-note__list-item-remove" aria-hidden="true" ng-click="deleteItemFromList($event, item.id)"></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</li>\r\n\t\t\t\t<li class="list-group-item add-note__list-item">\r\n\t\t\t\t\t<div class="add-note__list-item-cell">\r\n\t\t\t\t\t\t<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="add-note__list-item-cell">\r\n\t\t\t\t\t\t<div\r\n\t\t\t\t\t\t\tid="newItem-003"\r\n\t\t\t\t\t\t\tclass="add-note__list-item-area add-note__add-new-item"\r\n\t\t\t\t\t\t\tng-click="editItem($event, \'newItem-003\')"\r\n\t\t\t\t\t\t\tng-keypress="addNewItem($event, \'newItem-003\')"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="add-note__list-item-cell" class="clearfix">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t\t<hr ng-show="isCompletedInNote" style="border-top-color: #000; margin: 0">\r\n\t\t\t<ul class="add-note__list completed" >\r\n\t\t\t\t<li\r\n\t\t\t\t\tclass="list-group-item add-note__list-item"\r\n\t\t\t\t\tng-repeat="item in filtered = (text | isCompleted: true)  track by $index">\r\n\t\t\t\t\t<div class="add-note__list-item-cell">\r\n\t\t\t\t\t\t<a href="#" class="glyphicon glyphicon-arrow-up add-note__list-item-up" aria-hidden="true" ng-click="fromCompleted($event, item.id)"></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="add-note__list-item-cell">\r\n\t\t\t\t\t\t<div\r\n\t\t\t\t\t\t\tclass="add-note__list-item-area add-note__list-item-area--checked"\r\n\t\t\t\t\t\t\tid="{{item.id}}"\r\n\t\t\t\t\t\t\tng-blur="saveItem(item.id)"\r\n\t\t\t\t\t\t\tng-keypress="addItemAfterItem($event, item.id)"\r\n\t\t\t\t\t\t\tng-click="editItem($event, item.id)"\r\n\t\t\t\t\t\t>{{ item.text }}</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="add-note__list-item-cell">\r\n\t\t\t\t\t\t<a href="#" class="glyphicon glyphicon-remove  pull-right add-note__list-item-remove" aria-hidden="true" ng-click="deleteItemFromList($event, item.id)"></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\r\n\t\t\r\n\t\t\r\n\t\t<div class="add-note__footer clearfix">\r\n\t\t\t<button\r\n\t\t\t\tclass="add-note__done pull-right"\r\n\t\t\t\tng-show="isEdit"\r\n\t\t\t\ttype="button"\r\n\t\t\t\tng-click="addNote()">Done</button>\r\n\r\n\t\t\t<span class="pull-right">&nbsp;</span>\t\r\n\t\t\t<button\r\n\t\t\t\tclass="add-note__close pull-right"\r\n\t\t\t\tng-show="isEdit"\r\n\t\t\t\ttype="button"\r\n\t\t\t\tng-click="close()">Close</button>\r\n\t\t</div>\r\n\t</div>\t\r\n</div>\r\n');
$templateCache.put('templates/allCategories.template.html','<div class="container">\r\n\t<div class="row">\r\n\t\t<div class="col-sm-12">\r\n\t\t\t<h1>{{ test }}</h1>\r\n\t\t</div>\r\n\t</div>\r\n</div>');
$templateCache.put('templates/categories.template.html','<div class="header">\r\n\t<div class="container">\r\n\t\t<a ui-sref=".recent">\r\n\t\t\t<img src="http://static.tumblr.com/dfca590769e2c7630fffcd4f073a851e/vmdywfv/AIgmosa4l/tumblr_static_notes_logo_square.jpg"\r\n\t\t\twidth="80" height="80">\r\n\t\t</a>\r\n\t\t<div class="row">\r\n\t\t\t<div class="col-sm-6">\r\n\t\t\t\t<form>\r\n\t\t\t\t\t<div class="input-group">\r\n\t\t\t\t\t\t<span class="input-group-btn">\r\n\t\t\t\t\t\t\t<button class="btn btn-default" type="button" ng-click="addCatetory()">Add Category</button>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<input type="text" class="form-control" placeholder="category name" ng-model="categoryName">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</form>\r\n\t\t\t</div>\r\n\t\t\t<div class="col-sm-6">\r\n\t\t\t\t<div class="dropdown">\r\n\t\t\t\t\t<button ng-disabled="todos.categories.length ? false : true" class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\r\n\t\t\t\t\tCategories\r\n\t\t\t\t\t<span class="caret"></span>\r\n\t\t\t\t\t</button>\r\n\t\t\t\t\t<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">\r\n\t\t\t\t\t\t<li ng-repeat="category in todos.categories">\r\n\t\t\t\t\t\t\t<a ui-sref=".category({categoryId: category })">{{ category }}</a>\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!-- <a ui-sref=".all-categories">View all categories</a> -->\r\n\t</div>\r\n</div>\r\n\r\n<!-- disableDropDown -->');
$templateCache.put('templates/category.template.html','\r\n\t<!-- \u0432\u044B\u043D\u0435\u0441\u0442\u0438 \u0432 \u043E\u0442\u0434\u0435\u043B\u0443\u044E \u0434\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u0443 -->\r\n\t\t\r\n\t\r\n\t<!-- => \u0432\u044B\u043D\u0435\u0441\u0442\u0438 \u0432 \u043E\u0442\u0434\u0435\u043B\u0443\u044E \u0434\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u0443 -->\r\n');
$templateCache.put('templates/init.template.html','<categories></categories>\r\n<sticked notes="todos.fetchedNotes"></sticked>\r\n<div ui-view></div>');
$templateCache.put('templates/list-of-tasks.template.html','<ul\r\n\tclass="list-group list-of-tasks"\r\n\tdnd-list="unCompleted"\r\n\tdnd-allowed-types="note.allowedTypes"\r\n\t>\r\n\t<!-- {{note.allowedTypes}} -->\r\n\t<li\r\n\t\tclass="list-group-item list-of-tasks__item"\r\n\t\tng-repeat="item in unCompleted"\r\n\t\tdnd-type="item.type"\r\n\t\tdnd-draggable="item"\r\n\t\tdnd-moved="unCompleted.splice($index, 1); writeListOrder(unCompleted);"\r\n\t\tdnd-effect-allowed="move"\r\n\t\tdnd-dragstart="logEvent(event, \'Started to drag an listItem\')">\r\n\t\t<!-- {{item.type}} -->\r\n\t\t<dnd-nodrag>\r\n\t\t\t<div dnd-handle class="handle">:::</div>\r\n\t\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t\t<input type="checkbox" ng-model="item.isCompleted" ng-change="change(item.id)">\r\n\t\t\t</div>\r\n\t\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t\t<div class="list-of-tasks__item-text" data-id="{{item.id}}" ng-click="edit(item.id)">{{ item.text}}</div>\r\n\t\t\t\t<textarea\r\n\t\t\t\t\tclass="list-of-tasks__item-area"\r\n\t\t\t\t\tdata-id="{{item.id}}"\r\n\t\t\t\t\thidden\r\n\t\t\t\t\tng-blur="saveText(item.id)"\r\n\t\t\t\t\tng-keypress="addNoteAfterNote($event, item.id)"\r\n\t\t\t\t></textarea>\r\n\t\t\t</div>\r\n\t\t\t<div class="list-of-tasks__item-cell" class="clearfix">\r\n\t\t\t\t<a href="#" class="list-of-tasks__icon  list-of-tasks__icon-remove  glyphicon glyphicon-remove  pull-right" aria-hidden="true" ng-click="delete($event, item.id)"></a>\r\n\t\t\t</div>\t\r\n\t\t</dnd-nodrag>\r\n\t</li>\r\n</ul>\r\n<div>\r\n\t<div class="list-group-item list-of-tasks__item">\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<div class="list-of-tasks__item-text" id="newItem-001" ng-click="editNew()">\r\n\t\t\t\t\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C\r\n\t\t\t</div>\r\n\t\t\t<textarea\r\n\t\t\t\tclass="list-of-tasks__item-area"\r\n\t\t\t\tid="newItem-001"\r\n\t\t\t\thidden\r\n\t\t\t\tng-blur="addNew($event)"\r\n\t\t\t\tng-keypress="addNewByKeyPress($event)"></textarea>\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<hr style="border-top-color: #000">\r\n<ul class="list-group completed" >\r\n\t<li class="list-group-item list-of-tasks__item" ng-repeat="item in completed">\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<a href="#" class="list-of-tasks__icon  glyphicon glyphicon-arrow-up  pull-right" aria-hidden="true" ng-click="fromCompleted($event, item.id)"></a>\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<div class="list-of-tasks__item-text list-of-tasks__item-text--checked" data-id="{{item.id}}" ng-click="edit(item.id)">{{ item.text}}</div>\r\n\t\t\t<textarea class="list-of-tasks__item-area" data-id="{{item.id}}" hidden ng-blur="saveText(item.id)"></textarea>\r\n\t\t</div>\r\n\t\t<div class="list-of-tasks__item-cell">\r\n\t\t\t<a href="#" class="list-of-tasks__icon list-of-tasks__icon-remove  glyphicon glyphicon-remove  pull-right" aria-hidden="true" ng-click="delete($event, item.id)"></a>\r\n\t\t\t\r\n\t\t</div>\r\n\t</li>\r\n</ul>');
$templateCache.put('templates/one-note.template.html','<div class="panel panel-default one-note">\r\n\t<div class="panel-heading one-note__header">\r\n\t\t<div class="clearfix">\r\n\t\t\t<a href="#" class="one-note__icon  one-note__header-icon  glyphicon glyphicon-remove pull-right" aria-hidden="true" ng-click="deleteNote($event, note.id)"></a>\r\n\r\n\t\t\t<a href="#" ng-show="note.sticked" class="one-note__icon  one-note__header-icon  glyphicon glyphicon-heart pull-right" aria-hidden="true" ng-click="unstickNote($event, note.id)">&nbsp;</a>\r\n\r\n\t\t\t<a href="#" ng-show="!note.sticked" class="one-note__icon  one-note__header-icon  glyphicon glyphicon-heart-empty pull-right" aria-hidden="true" ng-click="stickNote($event, note.id)">&nbsp;</a>\r\n\r\n\t\t\t<small class="one-note__date">last edited {{ note.time | date }} &nbsp;</small>\r\n\t\t</div>\r\n\t\t<div class="one-note__title">\r\n\t\t\t<textarea\r\n\t\t\t\tid="{{note.id}}"\r\n\t\t\t\tclass="one-note__title-area"\r\n\t\t\t\thidden\r\n\t\t\t\tng-blur="onChangeTitle(note.id)"\r\n\t\t\t\tng-keypress="saveOnEnter($event, note.id)"\r\n\t\t\t\t>\r\n\t\t\t</textarea>\r\n\t\t\t<div id="{{note.id}}" class="one-note__title-text" ng-click="editTitle(note.id)">{{ note.title }}</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="panel-body  one-note__body">\r\n\t\t<div class="content">\r\n\t\t\t<plain-text note="note" callback-fn="saveNoteInfo()" ng-show="note.plainText"></plain-text>\r\n\t\t\t<list-of-tasks note="note" callback-fn="saveNoteInfo()" ng-show="!note.plainText"></list-of-tasks>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="panel-footer  one-note__footer">\r\n\t\t<div class="btn-group" role="group" aria-label="...">\r\n\t\t\t<button class="btn btn-default" type="button" ng-click="change=changeView(note.plainText)">{{ note.plainText ? "list" : "text" }}</button>\r\n\t\t\t<button class="btn btn-default" tyep="button" ng-show="isNotesInList(note.plainText, note)" ng-click=deleteAll()>\t\r\n\t\t\t\tdelete all \r\n\t\t\t</button>\r\n\t\t</div>\r\n\t\t<br>\r\n\t\t<div class="btn-group" role="group" aria-label="...">\t\r\n\t\t\t<button class="btn btn-default" tyep="button" ng-show="iscompletedInList(note.plainText, note)" ng-click="uncheckAll()">\r\n\t\t\t\tup all\r\n\t\t\t</button>\r\n\t\t\t<button class="btn btn-default" tyep="button" ng-show="iscompletedInList(note.plainText, note)" ng-click=deleteChecked()>\r\n\t\t\t\tdelete marked\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>');
$templateCache.put('templates/oneCategory.template.html','<div class="main one-category">\r\n\t<div class="container">\r\n\t\t<h2 class="one-category__title" ng-click="oneCategory.removeCategory(oneCategory.activeCategory)" ng-bind="oneCategory.activeCategory"></h2>\r\n\t\t<add-note\r\n\t\t\tng-show="oneCategory.showAddField"\r\n\t\t\tnotes="oneCategory.fetchNotes",\r\n\t\t\tsection="{{oneCategory.activeCategory}}"\r\n\t\t\tsave-fn="oneCategory.save()">\r\n\t\t</add-note>\r\n\t\t<br>\r\n\t\t<div\r\n\t\t\tclass="row one-category__list"\r\n\t\t\tdnd-list="oneCategory.notes"\r\n\t\t\tdnd-allowed-types="oneCategory.allowedTypes"\r\n\t\t>\r\n\t\t\t<div \r\n\t\t\t\tng-repeat="note in oneCategory.notes"\r\n\t\t\t\tclass="col-xs-12 col-sm-4 col-md-3 one-category__note"\r\n\t\t\t\tdnd-type="note.type"\r\n\t\t\t\tdnd-draggable="note"\r\n\t\t\t\tdnd-moved="oneCategory.notes.splice($index, 1); oneCategory.writeNotesOrder(oneCategory.notes);"\r\n\t\t\t\tdnd-effect-allowed="move"\r\n\t\t\t\tdnd-dragstart="oneCategory.logEvent(event, \'Started to drag an item\')">\r\n\t\t\t\t<one-note\r\n\t\t\t\t\tactive-section="{{ oneCategory.activeCategory }}"\r\n\t\t\t\t\tnote="note"\r\n\t\t\t\t\tcallback-fn="oneCategory.save()"\r\n\t\t\t\t\tdelete="oneCategory.deleteCertainNote(id)"\r\n\t\t\t\t\tstick-fn="oneCategory.stickFn(id)"\r\n\t\t\t\t\tunstick-fn="oneCategory.unstickNote(id)"\r\n\t\t\t\t>\r\n\t\t\t\t</one-note>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>');
$templateCache.put('templates/plain-text.template.html','<div class=plain-text>\r\n\t<div\r\n\t\tclass="plain-text__text"\r\n\t\tng-click=\'edit(note.id)\'\r\n\t\tid="{{note.id}}"\r\n\t\tng-bind-html="note.notes"\r\n\t>\r\n\t</div>\r\n\t<textarea\r\n\t\tclass="plain-text__area"\r\n\t\thidden\r\n\t\tng-blur="onBlurtext($event, note.id)"\r\n\t\tid="{{note.id}}">\r\n\t</textarea>\r\n</div>');
$templateCache.put('templates/recent.template.html','<div class="container">\r\n\t<h2>Recent</h2>\r\n\t<div class="row">\r\n\t\t<div class="col-sm-12">\r\n\t\t<h4>{{ recent.today }}</h4>\r\n\t\t<div class="row">\r\n\t\t\t<div class="col-xs-12 col-sm-4 col-md-3" ng-repeat="note in filtered = (recent.todayNotes)">\r\n\t\t\t\t<div> <a ui-sref="^.category({categoryId: note.section })" class="label label-default">{{ note.section }}</a> \r\n\t\t\t\t\t<one-note\r\n\t\t\t\t\t\tactive-section="{{ note.section }}"\r\n\t\t\t\t\t\tnote="note"\r\n\t\t\t\t\t\tcallback-fn="recent.save()"\r\n\t\t\t\t\t\tdelete="recent.deleteCertainNote(id, note.section)"\r\n\t\t\t\t\t\tstick-fn="recent.stickFn(id, note.section)"\r\n\t\t\t\t\t\tunstick-fn="recent.unstickNote(id, note.section)">\r\n\t\t\t\t\t</one-note>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>');
$templateCache.put('templates/sticked.template.html','<div class="container">\r\n\t<h3>{{ title }}</h3>\r\n\t<div class="row">\r\n\t\t<div class="col-xs-12 col-sm-4 col-md-3" ng-repeat="note in sticked">\r\n\t\t\t<div>\r\n\t\t\t\t<a ui-sref=".category({categoryId: note.section })" \r\n\t\t\t\t\tng-class="{\r\n\t\t\t\t\t\t\'label label-primary\' : note.section === activeCategory,\r\n\t\t\t\t\t\t\'label label-default\' : note.section !== activeCategory, }">\r\n\t\t\t\t\t{{ note.section }}\r\n\t\t\t\t</a> \r\n\t\t\t\t<one-note\r\n\t\t\t\t\tactive-section="{{ note.section }}"\r\n\t\t\t\t\tnote="note"\r\n\t\t\t\t\tcallback-fn="save()"\r\n\t\t\t\t\tdelete="deleteCertainNote(id, note.section)"\r\n\t\t\t\t\tunstick-fn="unstickNote(id, note.section)"\r\n\t\t\t\t\tstick-fn="update(id)">\r\n\t\t\t\t</one-note>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>');}]);