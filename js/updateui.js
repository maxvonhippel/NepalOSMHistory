// a script to call all the UI changes that need to happen upon a variable change

// what to do when the date range changes
function date_range_change(start, end) {

	// turns out this is way faster than foreach
	for (var i = 0; i < markers.length; i++) {
		var m = markers[i];
		m.weight = m.data ? m.data.versions.reduce(function(n, version) {
			return n + (version[1] >= start && version[1] <= end);
		}, 0) : 0;
		m.filtered = m.weight == 0;
	}
	// process changes
	leafletView.ProcessView();
	// updateCardsRange function in cards.js
	self.updateCardsRange(gStartTime, gEndTime);

}

// what to do when the bounding box changes
/*
function bounding_box_change(mn_x, mn_y, mx_x, mx_y) {

}
*/

// what to do when a user is searched for
/*
function user_search(user) {

}
*/