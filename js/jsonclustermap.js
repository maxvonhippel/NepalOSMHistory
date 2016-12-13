// set up the options for our initial map
var southWest = L.latLng(26.487043, 78.739439);
var northEast = L.latLng(30.688485, 89.847341);
var mapOptions = {
	center: [28.478348, 86.542285],
	zoom: 7,
    minZoom:7,
	maxZoom:18,
	maxBounds: L.latLngBounds(southWest, northEast),
	attributionControl:false
};

// find the div and put the map there
var map = L.map("mapid", mapOptions);

// initialize global variables here
gNorth = northEast.lat,
gEast = northEast.lng,
gWest = southWest.lng,
gSouth = southWest.lat,
gUsername="";
gStartTime=new Date("March 18, 2007 11:13:00");
gEndTime=new Date();
gCallFlag=0;
countTimes=0;
countTest=0;
searchText="";

// find our nepal border geometry so we can mask anything outside nepal
var latLngGeom = nepal_border;

// get the map tiles and initialize the tiles and boundary mask on the leflet map
var osm = L.TileLayer.boundaryCanvas('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: nepal_border
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>'
}).addTo(map);

var attrib = L.control.attribution({position:'bottomleft'});
attrib.addAttribution('Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="http://kathmandulivinglabs.org/">Kathmandu Living Labs</a>');
attrib.addTo(map);

// initialize the prune cluster object
var leafletView = new PruneClusterForLeaflet();

//Fire this when map is panned/zoomed/reset
map.on('moveend', function(ev){
	//set new values for global geo coordinates
	_bounds=map.getBounds();
	gNorth=_bounds.getNorth();
	gSouth=_bounds.getSouth();
	gEast=_bounds.getEast();
	gWest=_bounds.getWest();
	request_for_data();
});

function show_searchResults(){
	$("#username").show();
	//$("#username").fadeTo("fast",1);


}

function hide_searchResults(){
	$("#username").hide();
	//$("#username").fadeTo("fast",0);


}

function setSearchBoxContent(val) {
	gCallFlag=1; //set gCallFlag
	set_gUsername(val); //set global [gUsername] here
	document.getElementById('searchBox').value = val; //populate searchBox with the selected value from the <li> element.
	hide_searchResults(); //hide <ul> upon selection of an <li>
	request_for_data();
}

function request_for_data() {

	if (gStartTime == null || gEndTime == null)
		return;
	console.log("Requesting for Data with the following parameters:\n gNorth:" +
	gNorth +"\n gSouth:" +
	gSouth +"\n gEast:"+
	gEast +"\n gWest:"+
	gWest +"\n gStartTime:"+
	gStartTime.getFullYear() + "-" + gStartTime.getMonth() + "-" + gStartTime.getDay() + "\n gEndTime:"+
	gEndTime.getFullYear() + "-" + gEndTime.getMonth() + "-" + gEndTime.getDay() + "\n gUsername:"+
	gUsername
	);

	$("#glassy-effect").css("filter","blur(1px)");
	console.log("asking for json object for selection statistics");

	date_range_change(gStartTime, gEndTime)
	$("#block-everything").hide();


}

function matched(searchText) {
	console.log("keyup...");
	//if (gUsernames=="") gUsernames=usernames();
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