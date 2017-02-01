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

		        return notes.filter(note => (reverse ? note.isCompleted : !note.isCompleted));
		    };
		})
		.filter('isToday', function () {
		    return function (notes) {
		    	const today = formatDate(new Date());
		        notes = notes || [];

		        return notes.filter(note => formatDate(new Date(note.date)) === today);
		    };
		});


	function formatDate(date) {
		return "" + date.getDate() + (date.getMonth() + 1) + date.getFullYear();
	}
}());