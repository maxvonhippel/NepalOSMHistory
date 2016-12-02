// a script to call all the UI changes that need to happen upon a variable change

// what to do when the date range changes
function date_range_change(start, end) {

	updateCardsRange(start, end);
	filter_map(start, end);

}

function filter_map(start, end) {
	// get current zoom bounds
	var zoom = map.getBounds();

	console.log("filter map called - range: ", start.toString(), " , ", end.toString(), " , username: ", gUsername, " box: ", zoom.toBBoxString());

	hash = {};
	var num = 0;
	markers.forEach(function(m) {
		++num;
		var wei = 0;
		var pos = m.position;
		console.log("versions: ", m.data.versions.toString());
		/*
		for (var version in m.data.versions) {
			var vdate = version[1].getDate();
			if (vdate >= start.getDate() && vdate <= end.getDate()) {
				wei += 1;
				// LEADERBOARDS
				if (zoom.contains(m.getLatLng())) {
					var item = version[0];
					if (item in hash)
						hash[item] += 1;
					else hash[item] = 1;
				}
			}
		}*/
		m.weight = wei;
		var b5 = m.weight == 0;
		var b6 = (gUsername && gUsername != "" && !m.data.versions.some(function(a) { return a[0] === gUsername }));
		if (b5 || b6) {
			m.filtered = true;
			console.log("filtered something.");
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
	console.log(ret.toString());

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