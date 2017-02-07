(function() {
'use strict';

	angular.module('core.filters', [])
		.filter('isCompleted', function () {
		    return function (notes, reverse) {
		        notes = notes || [];
		        // console.log('notes', notes)
		        
		        if (!notes.filter) {
		        	return;
		        }

		        return notes.filter(function(note) {return (reverse ? note.isCompleted : !note.isCompleted)});
		    };
		})
		.filter('isToday', function () {
		    return function (notes) {
		    	var today = formatDate(new Date());
		        notes = notes || [];

		        return notes.filter(function(note) {return formatDate(new Date(note.time)) === today});
		    };
		})
		.filter('newFirst', function () {
		    return function (notes) {
		        notes = notes || [];

		        return notes.sort(function(a, b) {return b.time - a.time});
		    };
		});


	function formatDate(date) {
		return "" + date.getDate() + (date.getMonth() + 1) + date.getFullYear();
	}
}());