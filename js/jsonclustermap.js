// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

// USE THIS SITE FOR DEBUGGING: http://jshint.com

// set up the options for our initial map
var southWest = L.latLng(26.487043, 78.739439);
var northEast = L.latLng(30.688485, 89.847341);
var mapOptions = {
	center: [28.478348, 86.542285],
	zoom: 7,
    minZoom:7,
	maxZoom:18,
	maxBounds: L.latLngBounds(southWest, northEast)
};

// find the div and put the map there
var map = L.map("mapid", mapOptions);

// initialize global variables here
gNorth = northEast.lat,
gEast = northEast.lng,
gWest = southWest.lng,
gSouth = southWest.lat,
gStartTime="",
gEndTime="",
gUsername="";
gCallFlag=0;
countTimes=0;
countTest=0;
searchText="";

// find our nepal border geometry so we can mask anything outside nepal
var latLngGeom = nepal_border;

// get the map tiles and initialize the tiles and boundary mask on the leflet map
var osm = L.TileLayer.boundaryCanvas('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: nepal_border,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>'
}).addTo(map);

/*
//Add leaflet-search controls here
var searchLayer = L.layerGroup().addTo(map);
//... adding data in searchLayer ...
map.addControl( new L.Control.Search({
	url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
	jsonpParam: 'json_callback',
	propertyName: 'display_name',
	propertyLoc: ['lat','lon'],
	marker: L.circleMarker([0,0],{radius:30}),
	autoCollapse: true,
	autoType: false,
	minLength: 0
}) );

*/

//searchLayer is a L.LayerGroup contains searched markers

// initialize the prune cluster object
var leafletView = new PruneClusterForLeaflet(160);
var size = 10000;
var markers = [];

// fillmap() starts the entire series of events outlined above
//fillmap();

// this handles updates to what should be visible on the map
var lastUpdate = 0;
window.setInterval(function () {
	var now = +new Date();
	if ((now - lastUpdate) < 400) {
		return;
	}
	for (i = 0; i < size / 2; ++i) {
		if (typeof markers != "undefined" && typeof markers[i] != "undefined" && markers[i].hasOwnProperty("<position>")) {
			var coef = i < size / 8 ? 10 : 1;
			var ll = markers[i].position;
			ll.lat += (Math.random() - 0.5) * 0.00001 * coef;
			ll.lng += (Math.random() - 0.5) * 0.00002 * coef;
		}
	}
	leafletView.ProcessView();
	lastUpdate = now;

}, 500);

// we add the leaflet view to the map, thus showing the clusters from the prune cluster object
map.addLayer(leafletView);

// this is the callback for when the google chart date range changes, to filter out what we show in the map
function showRange(start, end) {
	markers.forEach(function(marker) {
		// return true if it is not in the date range, false if it is in the daterange
		marker.filtered = (start > marker.data.datestamp || marker.data.datestamp > end);
	});
	leafletView.ProcessView();
}

//Fire this when map is panned/zoomed/reset
map.on('moveend', function(ev){
	//set new values for global geo coordinates
	_bounds=map.getBounds();
	gNorth=_bounds.getNorth();
	gSouth=_bounds.getSouth();
	gEast=_bounds.getEast();
	gWest=_bounds.getWest();
	request_for_data();

	//

	/*
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
	*/
});

// For the SearchBox
function fetch_Addr_Username(value){
	// can we reach the server?
	$.ajax({
		url:"server/usernames.js",
		type:"POST",
		success:function(response){
			//show_searchResults();
			alert(response);
		},
		error: function (xhr, errmsg, err) {
			alert (xhr.status + "\n\n" + xhr.responseText);
		}

	});
}

function show_searchResults(){
	$("#username").show();
	//$("#username").fadeTo("fast",1);


}

function hide_searchResults(){
	$("#username").hide();
	//$("#username").fadeTo("fast",0);


}


function setSearchBoxContent(val){
	gCallFlag=1; //set gCallFlag
	set_gUsername(val); //set global [gUsername] here
	document.getElementById('searchBox').value = val; //populate searchBox with the selected value from the <li> element.
	hide_searchResults(); //hide <ul> upon selection of an <li>
	request_for_data();
}

function request_for_data() {
	console.log("Requesting for Data with the following parameters:\n gNorth:" +
	gNorth +"\n gSouth:" +
	gSouth +"\n gEast:"+
	gEast +"\n gWest:"+
	gWest +"\n gStartTime:"+
	gStartTime +"\n gEndTime:"+
	gEndTime +"\n gUsername:"+
	gUsername
	);

	//show load icon and keep it displayed till ajax returns
	//$("#block-everything").toggle();
	$("#block-everything").show();
	$("#glassy-effect").css("filter","blur(1px)");

	//disable_map_controls();


	//query the server with the current states of all [data]
	$.ajax({
		url:"server/api.php?"+Math.random(), //processing script on the server; for now it is hooked to a direct json response;
		type: "POST",
		data: {
			"north":gNorth,
			"south":gSouth,
			"east":gEast,
			"west":gWest,
			"startTime":gStartTime,
			"endTime":gEndTime,
			"username":gUsername
		},
		success: function(response){
			//Creat JSON object from the response text
			var _obj = JSON.parse(response);
			//Update Nepal Statistics Table
			updateNepalStatistics(_obj);
			//Update Selection Statistics Table
			updateSelectedStatistics(_obj);
			updateNodes(_obj);
			updateWays(_obj);
			//hide load icon
			$("#block-everything").hide();
			//$("#glassy-effect").css("filter","blur(0px)");
			//enable_map_controls();
		},
		error: function (xhr, errmsg, err) {
			alert (xhr.status + "\n\n" + xhr.responseText);
		}

	});
}

function matched(searchText) {
	console.log("keyup...");
	//document.getElementById('console').innerHTML = "";
	document.getElementById('username').innerHTML = "";
	var _matchCount=0; //variable to determine how many resutls are being shown on the name list; initialized to zero
	show_searchResults();
	var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
	if(searchText != null){
		if (searchText.length==0){
			set_gUsername(searchText);
		}
		else{
			var _flag=0;
			for (i = 0; i < usernames.length; ++i) {
				if (searchText == "") {
					//document.getElementById('console').innerHTML = "";
					document.getElementById('username').innerHTML = "";
				}
				if (searchText.indexOf(invalid)){
					searchText=searchText.replace(invalid,"");
					console.log(searchText);
				}
				if (usernames[i].match(new RegExp(searchText, "i"))) {
					//show only 2 elements at max:
					if(_matchCount<5){
						_matchCount++;
						//document.getElementById('console').innerHTML += usernames[i];
						$('#username').append("<li onclick='setSearchBoxContent(this.innerHTML)'>" + usernames[i] + "</li>");
					}
				}
			}
		}
	}
}


function myfocusout(){
	console.log("myfocusout");
	if(gUsername==""){
		$("#searchBox").val("");
	}
}

function set_gUsername(val){
	console.log("setting gUsername as..."+val);
	gUsername=val;
	if(val==""){
		//if the current value of [gUsername] is blank then initiate ajax for all users
		request_for_data();
	}
}

function disable_map_controls(){
	map._handlers.forEach(function(handler) {
		handler.disable();
	});
	map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();
	map.boxZoom.disable();
	map.keyboard.disable();
	if (map.tap) map.tap.disable();
	document.getElementById('mapid').style.cursor='default';
}

function enable_map_controls(){
	map._handlers.forEach(function(handler) {
		handler.enable();
	});
	map.dragging.enable();
	map.touchZoom.enable();
	map.doubleClickZoom.enable();
	map.scrollWheelZoom.enable();
	map.boxZoom.enable();
	map.keyboard.enable();
	if (map.tap) map.tap.enable();
	document.getElementById('mapid').style.cursor='grab';
}