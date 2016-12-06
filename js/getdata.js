// this script gets data from the server

var baseurl = "http://127.0.0.1:8080/";


// Create the XHR object.
function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
    	// XHR for Chrome/Firefox/Opera/Safari.
		xhr.open(method, url, true);
  	} else if (typeof XDomainRequest != "undefined") {
    	// XDomainRequest for IE.
		xhr = new XDomainRequest();
		xhr.open(method, url);
  	} else {
    	// CORS not supported.
		xhr = null;
  	}
  	return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  	return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest(url) {

  	var xhr = createCORSRequest('GET', url);
  	if (!xhr) {
    	alert('CORS not supported');
		return null;
  	}

  	// Response handlers.
  	xhr.onload = function() {
    	var text = xhr.responseText;
		var title = getTitle(text);
		console.log('Response from CORS request to ' + url + ': ' + title);
		return text;
  	};

  	xhr.onerror = function() {
    	console.log('Woops, there was an error making the request.');
    	return null;
  	};
  	xhr.send();
}


// get and return the array of usernames
// example: see server/geodjango/example output/testusernames.txt
function usernames () {
	console.log("requesting usernames");
	// format the url
	url = baseurl + "usernames/";

	var usernames = [];
	$.ajax({

    	url: url,
		data: null,
		type: 'GET',
    	crossDomain: true,
		dataType: 'txt',
		success: function(data) {
			usernames = data;
			console.log("got usernames:");
    		console.log(usernames);
    		return usernames;
		},
		error: function(xhr, status, text) {
	        var response = xhr.responseText;

	        console.log('Failure!');

	        if (response)
			console.log(response.error);
		}

	});
	return null;

	return makeCorsRequest(url);

}

// get and return the json of country data
// example:
// {"Building": 22560, "Roads": 2512, "Education": 1, "Health": 9, "Mappers": 9465}
function country_stats () {
	/*Remove from here.... when CORS is taken care of*/
		/*var cStats={"Buildings": 22560, "Roads": 2512, "Education": 1, "Health": 9, "Mappers": 9465};
		updateNepalStatistics(cStats);
		return 0;*/
	/*Remove upto here.... when CORS is taken care of*/

	// format the url
	url = baseurl + "jsoncountry/";
	// get the data
	$.get(url)
	.done(function(cStats) {
		//return data;
		//var cStats={"Buildings": 22560, "Roads": 2512, "Education": 1, "Health": 9, "Mappers": 9465};
		updateNepalStatistics(cStats);
		return cStats; // doesn't do much; just returning in keeping up with the norm.
	});
	return null;
}

// get and return the json of selection data
function selection_stats (mn_x, mn_y, mx_x, mx_y, start, end, user) {


	/*Remove from here.... when CORS is taken care of*/
	var sStats={
		"Buildings_start":1000,
		"Roads_start":1000,
		"Education_start":1000,
		"Health_start":1000,
		"Buildings_end":2000,
		"Roads_end":2000,
		"Education_end":2000,
		"Health_end":2000
	};
	updateSelectionStatistics(sStats);
	//return 0;
	/*Remove upto here.... when CORS is taken care of*/


	/*

	// format the url
	if (!user || user == null || user == "")
	user = "user";	// for now, fix the actual server later to be able to handle empty user param
	url = baseurl + "jsonselection/" + start.getFullYear() + "-" + start.getMonth() + "-" + start.getDay() + "T" + start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds() + start.getTimezoneOffset() + "," + end.getFullYear() + "-" + end.getMonth() + "-" + end.getDay() + "T" + end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds() + end.getTimezoneOffset() + "/" + mn_x.toString() + "/" + mn_y.toString() + "/" + mx_x.toString() + "/" + mx_y.toString() + "/" + user + "/";

	debugger;

	$.ajax({
	    url: url,
		type: "GET",
	    dataType: "json",
	    timeout: 600000,	// Set your timeout value in milliseconds or 0 for unlimited
	    success: function(response) {
			debugger;
			updateSelectedStatistics(response);

			return response;
		},
	    error: function(jqXHR, textStatus, errorThrown) {
	        if(textStatus==="timeout") {
	            console.log("Call has timed out");	// Handle the timeout
				} else {
	            console.log("Another error was returned");	// Handle other error type
			}
		}
	});

	console.log("nothing found on server for selection");
	return null;
	*/

}


function nodes_stats(gWest, gSouth, gEast, gNorth, gStartTime, gEndTime, gUsername){

	/*Remove from here.... when CORS is taken care of*/
	var nodesTable = {
		"first":{
			"Rank":1,
			"OSM Username":"Nama Budhathoki",
			"Nodes":1214145,
			"Most Frequently edited POI":"Restaurant"

		}
		,
		"second":{
			"Rank":2,
			"OSM Username":"Pratik Gautam",
			"Nodes":1018216,
			"Most Frequently edited POI":"Airport"
		}
		,
		"third":{
			"Rank":3,
			"OSM Username":"Sazal(Solaris)",
			"Nodes":1018216,
			"Most Frequently edited POI":"Museum"
		},
		"fourth":{
			"Rank":255,
			"OSM Username":"Two Fifty Five",
			"Nodes":14216,
			"Most Frequently edited POI":"Two Fifty Diners",
			"highlight":1
		},
		"fifth":{
			"Rank":512,
			"OSM Username":"Five Twelve",
			"Nodes":14216,
			"Most Frequently edited POI":"Five Tweleve Eatery"
		}
	};
	updateNodes(nodesTable);
	return 0;
	/*Remove upto here.... when CORS is taken care of*/

}


function ways_stats(gWest, gSouth, gEast, gNorth, gStartTime, gEndTime, gUsername){

	/*Remove from here.... when CORS is taken care of*/
	var waysTable = {
		"first":{
			"Rank":1,
			"OSM Username":"Sazal(Solaris)",
			"Ways":1214145,
			"Most Frequently edited POI":"Museum"
		}
		,
		"second":{
			"Rank":2,
			"OSM Username":"Nama Budhathoki",
			"Ways":1018216,
			"Most Frequently edited POI":"Restaurant"
		}
		,
		"third":{
			"Rank":3,
			"OSM Username":"Pratik Gautam",
			"Ways":1018216,
			"Most Frequently edited POI":"Airport"
		},
		"fourth":{
			"Rank":255,
			"OSM Username":"Two Fifty Five",
			"Ways":14216,
			"Most Frequently edited POI":"Two Fifty Diners",
			"highlight":1
		},
		"fifth":{
			"Rank":512,
			"OSM Username":"Five Twelve",
			"Ways":14216,
			"Most Frequently edited POI":"Five Tweleve Eatery"
		}
	};
	updateWays(waysTable);
	return 0;
	/*Remove upto here.... when CORS is taken care of*/

}
// get and return the csv data on activity

// get and return the geojson for the map