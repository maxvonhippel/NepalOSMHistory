function getContent()
{
	if (!!window.EventSource) {
		// http://www.howopensource.com/2014/12/introduction-to-server-sent-events/
    		var source = new EventSource("server/map-data.php");
    		source.addEventListener("message", function(e) {
			var json = $.parseJSON(e.data);
			parseresponse(json);
		}, false);
		
		source.addEventListener("open", function(e) {
			console.log("Connection was opened.");
		}, false);
		
		source.addEventListener("error", function(e) {
			console.log("Error - connection was lost.");
		}, false);
		
    	} else {
		alert("Your browser does not support Server-sent events! Please upgrade it!");
	}

}

// initialize jQuery
$(function() {
    getContent();
});

// this function parses our response once we get it (see code above in fillmap() )
function parseresponse(json) {
	var lon = json.geometry.coordinates[0];
	var lat = json.geometry.coordinates[1];
	// for now we are only mapping features which have a lon and lat, so not relations or ways unfortunately
	// would be a good feature to add in the future!
	// but we do consider relations and ways in all of our printed statistics on the website in cards and charts
	if (lon !== 0.0 && lat !== 0.0) {
		// initialize a marker in our prune cluster object for this feature from the json
		var marker = new PruneCluster.Marker(lat, lon);
		marker.data.datestamp = new Date(json.properties.timestamp);
		marker.data.popup = "user: " + json.properties.user + " timestamp: " + marker.data.datestamp + " version: " + json.properties.version + " feature_id: " + json.properties.feature_id;
		markers.push(marker);
		leafletView.RegisterMarker(marker);
	}
}
