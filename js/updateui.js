// a script to call all the UI changes that need to happen upon a variable change

// what to do when the date range changes
function date_range_change(start, end) {
	markers.forEach(function(marker) {
		// return true if it is not in the date range, false if it is in the daterange
		marker.filtered = (start > marker.data.datestamp || marker.data.datestamp > end);
	});
	leafletView.ProcessView();
	// updateCardsRange function in cards.js
	self.updateCardsRange(gStartTime, gEndTime);
}

// what to do when the bounding box changes
function bounding_box_change(mn_x, mn_y, mx_x, mx_y) {

}

// what to do when a user is searched for
function user_search(user) {

}