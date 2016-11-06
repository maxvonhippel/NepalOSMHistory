var southWest = L.latLng(26.487043, 78.739439);
var northEast = L.latLng(30.688485, 89.847341);
var mapOptions = {
	center: [28.478348, 86.542285],
	zoom: 7,
    minZoom:7,
	maxZoom:19,
	maxBounds: L.latLngBounds(southWest, northEast)
};

var map = L.map("mapid", mapOptions);

var latLngGeom = nepal_border; //Define real geometry here

var osm = L.TileLayer.boundaryCanvas('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: nepal_border, 
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>'
}).addTo(map);

var leafletView = new PruneClusterForLeaflet(160);
var size = 10000;
var markers = [];

function fillmap() {
	var request = new XMLHttpRequest();
	request.open("GET", "data/dirtydate.json", false);
	request.send(null)
	var json = JSON.parse(request.responseText);
	for (var a = 0; a < json.features.length; a++) {
		var lon = json.features[a].geometry.coordinates[0];
		var lat = json.features[a].geometry.coordinates[1];
		if (lon != 0.0 && lat != 0.0) {
			var marker = new PruneCluster.Marker(lat, lon);
			marker.data.datestamp = new Date(json.features[a].properties.timestamp);
			marker.data.popup = "user: " + json.features[a].properties.user + " timestamp: " + marker.data.datestamp + " version: " + json.features[a].properties.version + " feature_id: " + json.features[a].properties.feature_id;
			markers.push(marker);
			leafletView.RegisterMarker(marker);
		}
	}
}

fillmap();

var lastUpdate = 0;
window.setInterval(function () {
    var now = +new Date();
    if ((now - lastUpdate) < 400) {
    	return;
    }

    for (i = 0; i < size / 2; ++i) {
        var coef = i < size / 8 ? 10 : 1;
        var ll = markers[i].position;
        ll.lat += (Math.random() - 0.5) * 0.00001 * coef;
        ll.lng += (Math.random() - 0.5) * 0.00002 * coef;
    }

    leafletView.ProcessView();
    lastUpdate = now;
}, 500);

map.addLayer(leafletView); 

function showRange(start, end) {
    var j = 0;
    var i = 0;
    markers.forEach(function(marker) {
		// return true if it is not in the date range, false if it is in the daterange
		marker.filtered = (start > marker.data.datestamp || marker.data.datestamp > end);
	});
	leafletView.ProcessView();
}

//Fire this when map is panned/zoomed/reset
map.on('moveend', function(ev){
	//get new southWest and northEast values
	_bounds=map.getBounds();
	north=_bounds.getNorth();
	south=_bounds.getSouth();
	east=_bounds.getEast();
	west=_bounds.getWest();
	/*$('#pageTitle').html(
		'north='+north+
		'<br/>east='+east+
		'<br/>south='+south+
		'<br/>west='+west
	);*/
	//AJAX new output
	
	//update #selectedStatistics
	
	//update tables
});