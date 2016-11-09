// we will use this function to populate the map with data from GEOJSON
function fillmap() {
	
	
	$.ajax({
		url:"server/api.php", //processing script on the server
		type: "POST",
		data: {"north":north, "south":south,"east":east,"west":west},
		success: function(response){
			//alert(response);
		},
		error: function (xhr, errmsg, err) {
			alert (xhr.status + "\n\n" + xhr.responseText);
		}
		
	})
	
}

// this function parses our response once we get it (see code above in fillmap() )
function parseresponse(json) {
	// loop over the json features
	for (var a = 0; a < json.features.length; a++) {
		// for each feature, get the longitude and latitude
		var lon = json.features[a].geometry.coordinates[0];
		var lat = json.features[a].geometry.coordinates[1];
		// for now we are only mapping features which have a lon and lat, so not relations or ways unfortunately
		// would be a good feature to add in the future!
		// but we do consider relations and ways in all of our printed statistics on the website in cards and charts
		if (lon !== 0.0 && lat !== 0.0) {
			// initialize a marker in our prune cluster object for this feature from the json
			var marker = new PruneCluster.Marker(lat, lon);
			marker.data.datestamp = new Date(json.features[a].properties.timestamp);
			marker.data.popup = "user: " + json.features[a].properties.user + " timestamp: " + marker.data.datestamp + " version: " + json.features[a].properties.version + " feature_id: " + json.features[a].properties.feature_id;
			markers.push(marker);
			leafletView.RegisterMarker(marker);
		}
	}
}