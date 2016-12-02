// a script to call all the UI changes that need to happen upon a variable change

// what to do when the date range changes
function date_range_change(start, end) {

	updateCardsRange(start, end);
	filter_map(start, end);

}

function filter_map(start, end) {
	// get current zoom bounds
	var zoom = map.getBounds();

	// console.log("filter map called - range: ", start.toString(), " , ", end.toString(), " , username: ", gUsername, " box: ", zoom.toBBoxString());

	hash = {};
	var num = 0;
	markers.forEach(function(m) {
		++num;
		var wei = 0;
		var pos = m.position;
		var veruser = m.data.versions[0][0];
		var cver = 0;
		var isuser = (gUsername == "" || !gUsername) ? true : false;
		while (true) {
			try {
				if (veruser == gUsername)
					isuser = true;
				verdate = m.data.versions[cver][1];
				var inzoom = (zoom._southWest.lat <= m.position.lat && zoom._southWest.lng <= m.position.lng && zoom._northEast.lat >= m.position.lat && zoom._northEast.lng >= m.position.lng);
				if (verdate.getDate() >= start.getDate() && verdate.getDate() <= end.getDate() && inzoom) {
					++wei;
					if (veruser in hash)
						hash[veruser] += 1;
					else hash[veruser] = 1;
				}
				// console.log(" start date: ", start.toDateString(), " verdate: ", verdate.toDateString(), " end date: ", end.toDateString(), " in zoom? ", inzoom);
				veruser = m.data.versions[++cver][0];
			} catch (err) { break; }
		}

		m.weight = wei;
		if (m.weight == 0 || !isuser) {
			m.filtered = true;
		} else m.filtered = false;
	});
	// process changes
	leafletView.ProcessView();
	// leaderboards calculation
	var keys = []; for(var key in hash) keys.push(key);
	var r = keys.sort(function(a,b){ return hash[a] - hash[b]} );
	var ret = new Array(5);
	for (var q = 0; q < 5 && q < r.length; q++) {
		ret[r[q]] = this.hash[r[q]];
	}

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