// set up the options for our initial map
var southWest = L.latLng(26.487043, 78.739439);
var northEast = L.latLng(30.688485, 89.847341);
var mapOptions = {
	center: [28.478348, 86.542285],
	zoom: 7,
    minZoom:7,
	maxZoom:19,
	maxBounds: L.latLngBounds(southWest, northEast)
};

// initialize global variables here
var gNorth, gEast, gWest, gSouth, gStartTime, gEndTime, gUsername;

// find the div and put the map there
var map = L.map("mapid", mapOptions);

// find our nepal border geometry so we can mask anything outside nepal
var latLngGeom = nepal_border;

// get the map tiles and initialize the tiles and boundary mask on the leflet map
var osm = L.TileLayer.boundaryCanvas('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: nepal_border, 
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>'
}).addTo(map);

// initialize the prune cluster object
var leafletView = new PruneClusterForLeaflet(160);
var size = 10000;
var markers = [];

// we will use this function to populate the map with data from GEOJSON
function fillmap() {
	// this is an asynchronous request.  It is exactly the same as JQUERY/AJAX, this is what
	// happens "under the hood" when you use those tools anyway.  This may even be a tiny bit
	// faster.  But we get more granular control.
	var request = new XMLHttpRequest();
	request.open("GET", "data/dirtydate.json", true);
	request.onload = function (e) {
		// on asynchronous load of the file, we check if it is ready to be read
		if (request.readyState === 4) {
		    if (request.status === 200) 
		    	parseresponse(request);	// if so, we send it to our parsing function
		    else xmlhttperr();	// if not, we had an error, so we log it to the console
		}
	};
	request.onerror = function (e) {
		xmlhttperr();	// if we make it here there was an error, so we log it
	};
	request.send(null); // this sends the request which leads to the asynchronous events listed above
}

// this function parses our response once we get it (see code above in fillmap() )
function parseresponse(request) {
	// we successfully, asynchronously recieved the json
	var json = JSON.parse(request.responseText);
	// loop over the json features
	for (var a = 0; a < json.features.length; a++) {
		// for each feature, get the longitude and latitude
		var lon = json.features[a].geometry.coordinates[0];
		var lat = json.features[a].geometry.coordinates[1];
		// for now we are only mapping features which have a lon and lat, so not relations or ways unfortunately
		// would be a good feature to add in the future!
		// but we do consider relations and ways in all of our printed statistics on the website in cards and charts
		if (lon != 0.0 && lat != 0.0) {
			// initialize a marker in our prune cluster object for this feature from the json
			var marker = new PruneCluster.Marker(lat, lon);
			marker.data.datestamp = new Date(json.features[a].properties.timestamp);
			marker.data.popup = "user: " + json.features[a].properties.user + " timestamp: " + marker.data.datestamp + " version: " + json.features[a].properties.version + " feature_id: " + json.features[a].properties.feature_id;
			markers.push(marker);
			leafletView.RegisterMarker(marker);
		}
	}
}

// if we have an error with our asynchronous file loading, this will get called
function xmlhttperr() {
	console.error("there was an error with the async xmlhttprequest for the geojson file used to populate the cluster map.");
}

// fillmap() starts the entire series of events outlined above
fillmap();

// this handles updates to what should be visible on the map
var lastUpdate = 0;
window.setInterval(function () {
	var now = +new Date();
	if ((now - lastUpdate) < 400) {
    		return;
    	}
    	if (markers[0] != null) {
		for (i = 0; i < size / 2; ++i) {
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

//For the SearchBox
function fetch_Addr_Username(value){
	$.ajax({
		url:"resources/usernames.js",
		type:"POST",
		success:function(response){
			show_searchResults();
			//alert(response);
		},
		error: function (xhr, errmsg, err) {
			alert (xhr.status + "\n\n" + xhr.responseText);
		}
	
	})
}

function show_searchResults(){
	$("#username").show();
	//$("#searchResults_usernames").show();
	
}

function hide_searchResults(){
	//alert('shoot');
	$("#username").hide();
	$("#console").hide();
	//$("#searchResults_usernames").hide();
	
}


usernames = [
  "Sazal(Solaris)",
  "NamaBudhathoki",
  "PratikGautam"
];

function setSearchBoxContent(val){
	document.getElementById('searchBox').value = val; //populate searchBox with the selected value from the <li> element.
	hide_searchResults(); //hide <ul> upon selection of an <li>
	request_for_data();
}

function request_for_data() {
  //document.getElementById('searchBox').value = val; //populate searchBox with the selected value from the <li> element. //obsolete (cosider deleting this)
  
  //hide_searchResults(); //hide <ul> upon selection of an <li> //obsolete (cosider deleting this)
  
  //get current states of all [data] for this AJAX request /*This step might be redundant if all globals are set elsewhere*/
  
  
  //query the server with the current states of all [data]
  $.ajax({
		url:"server/api.php", //processing script on the server
		type: "POST",
		data: {
			"north":gNorth, 
			"south":gSouth,
			"east":gEast,
			"west":gWwest
			
		},
		success: function(response){
			alert(response);
		},
		error: function (xhr, errmsg, err) {
			alert (xhr.status + "\n\n" + xhr.responseText);
		}
		
	})

}

function matched(searchText) {
  document.getElementById('console').innerHTML = "";
  document.getElementById('username').innerHTML = "";
  show_searchResults();
  for (i = 0; i < usernames.length; ++i) {
    if (searchText == "") {
      document.getElementById('console').innerHTML = "";
      document.getElementById('username').innerHTML = "";
    } else if (usernames[i].match(new RegExp(searchText, "i"))) {
      document.getElementById('console').innerHTML += usernames[i];
      //$('#username').append("<li onclick='request_for_data(this.innerHTML)'>" + usernames[i] + "</li>");
	  $('#username').append("<li onclick='setSearchBoxContent(this.innerHTML)'>" + usernames[i] + "</li>");
    }
  }
}