(function() {
"use strict";

    angular
	.module('todoList')
	.directive('sticked', sticked);

	sticked.$inject = ['DataService', '$stateParams', '$state'];

	function sticked(DataService, $stateParams, $state) {
		return {
            restrict: 'E',
            scope: {
              notes: '='
            },
            templateUrl: 'templates/sticked.template.html',
            controller: function ($scope, $element) {
                console.log('stickedController');
                const notes = $scope.notes.data.user;
                // console.log($scope.notes)

                render(notes);

                $scope.activeCategory = $stateParams.categoryId; 

                function render(notes) {
		            const keys = Object.keys(notes);
		            const allNotes = keys.reduce((arr, key) => {
		                return arr.concat(notes[key]);
		            }, []);

		            $scope.sticked = allNotes.filter(function(item) {
		            	return item.sticked;
		            });
		            $scope.title = $scope.sticked.length ? "Sticked" : "";
		        }

		        $scope.save = function() {
		            console.log("save data in sticed");
		            DataService.saveDataToLocalStorage($scope.notes);
		        }

		        $scope.deleteCertainNote = function(id, section) {
		            $scope.notes.data.user[section].splice(findElem($scope.notes.data.user[section], id), 1);

		            render($scope.notes.data.user);

		            DataService.saveDataToLocalStorage($scope.notes);
		        }

		        $scope.unstickNote = function(id, section) {
                    console.log("unstick in sticked", id);
                    console.log(notes[section])
                    notes[section][findElem(notes[section], id)].sticked = false;
		            DataService.saveDataToLocalStorage($scope.notes);
		            console.log($scope.notes.data.user)
		            render($scope.notes.data.user);
		            $scope.$parent.$broadcast('UNSTICK_NOTE', {id: id, section: section});
                }

                $scope.$on('STICK_NOTE', function(e, data) {
			  		render(notes);
				});

				$scope.$on('UNSTICK_NOTE', function(e, data) {
			  		render(notes);
				});

				$scope.$on('DELETE_NOTE', function(e, data) {
			  		render(notes);
				});

				$scope.$on('EDIT_TODAY', function(e, data) {
		            // console.log('EDIT_TODAY', data);
		            // console.log(notes)
		            // setTimeout(() => {

		            // render(notes);
		            // }, 0)
		            // init(fetchNotes.data.user);
		        });

		        $scope.$on('CHANGE_SECTION', function(e, data) {
		        	$scope.activeCategory = data.categoryId;
			  		// console.log('$scope.activeCategory', $scope.activeCategory)
				});
            }
        }
	}
}());