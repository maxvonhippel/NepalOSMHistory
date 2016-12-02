// a script to call all the UI changes that need to happen upon a variable change

// what to do when the date range changes
function date_range_change(start, end) {

	filter_map(start, end);
	// updateCardsRange function in cards.js
	self.updateCardsRange(gStartTime, gEndTime);

}

function bubbleSort(arr) {
	var n = arr.length, swapped, tmp;
	do {
    	swapped = false;
		for (var i = 1; i < n; i++) {
			if (arr[i-1][1] < arr[i][1]) {
				tmp = arr[i];
				arr[i] = arr[i-1];
				arr[i-1] = tmp;
				swapped = true;
      		}
    	}
  	} while (swapped && n--)
}

function filter_map(start, end) {
	// get current zoom bounds
	var zoom = pruneCluster._map.getZoom();
	// for leaderboards
	var okusers = {}
	var countedusers = 0;
	var thisuser = 0;

	var usersparsed;
	// turns out this is way faster than foreach
	for (usersparsed = 0; usersparsed < markers.length; usersparsed++) {
		var m = markers[usersparsed];
		if (m && m.hasOwnProperty(data) && m.hasOwnProperty(weight)) {
			var wei = 0;
			var pos = m.getLatLng();
			for (var version in m.data.versions) {
				if (version[1].getDate() >= start.getDate() && version[1].getDate() <= end.getDate()) {
					wei += 1;
					var pos = m.getLatLng();
					var b1 = pos.lat >= zoom.minLat;
					var b2 = pos.lat <= zoom.maxLat;
					var b3 = pos.lng >= zoom.minLng;
					var b4 = pos.lng <= zoom.maxLng;
					if (b1 && b2 && b3 && b4) {
						// this item can be considered for the leaderboards
						var thisusername = version[0];
						// need to do something here with leaderboard not sure how yet
					}
				}
			}
			m.weight = wei;
			var b5 = m.weight == 0;
			var b6 = (gUsername != "" && !m.data.versions.some(function(a){return a[0]===gUsername}));
			m.filtered = (b5 || b6);
		}
	}
	okusers.length = usersparsed + 1;
	// process changes
	leafletView.ProcessView();
	// leaderboards calculation


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