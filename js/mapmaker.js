var southWest = L.latLng(26.487043, 78.739439);
var northEast = L.latLng(30.688485, 89.847341);
var mapOptions = {
	center: [28.478348, 86.542285],
	zoom: 7,
    minZoom:7,
	maxZoom:19,
	maxBounds: L.latLngBounds(southWest, northEast),
	scrollWheelZoom: false,
	touchZoom: false,
	boxZoom: false
};

var mymap = L.map('mapid', mapOptions);

/*L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>'
}).addTo(mymap);*/


   /* var nepalBorderLatLngArray = [];

    var nepalBorderGeoJSON = L.geoJson(nepal_border);
    $.map(nepalBorderGeoJSON._layers, function(layer, index) {
        $.extend(nepalBorderLatLngArray, layer._latlngs);
   });*/


var latLngGeom = nepal_border; //Define real geometry here
var osm = L.TileLayer.boundaryCanvas('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: nepal_border
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>'
}).addTo(mymap);

/*var attrib = L.control.attribution(
	position: 'bottomleft'
).addAttribution('Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>').addTo(mymap);*/




//Make sure to add the slider to the map ;-) // Doing it in mapmaker.js
//mymap.addControl(sliderControl);

//And initialize the slider // Doing it in mapmaker.js
//sliderControl.startSlider();



//Fire this when map is panned/zoomed/reset
mymap.on('moveend', function(ev){
	//get new southWest and northEast values
	_bounds=mymap.getBounds();
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