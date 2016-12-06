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
	/*
	// sample data
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
	*/

	// format the url
	if (!user || user == null || user == "")
		user = "";
	url = baseurl + "jsonselection/" + start.getFullYear() + "-" + start.getMonth() + "-" + start.getDay() + "," + end.getFullYear() + "-" + end.getMonth() + "-" + end.getDay() + "/" + mn_x.toString() + "/" + mn_y.toString() + "/" + mx_x.toString() + "/" + mx_y.toString() + "/" + user + "/";

	debugger;

	$.ajax({
	    url: url,
		type: "GET",
	    dataType: "json",
	    timeout: 600000,	// Set your timeout value in milliseconds or 0 for unlimited
	    success: function(response) {

			debugger;
			updateSelectionStatistics(response);
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
	//return 0;
	/*Remove upto here.... when CORS is taken care of*/


}


function nodes_stats(ret){

	var nodesTable = {};
	var nums = [ "first", "second", "third", "fourth", "fifth" ];
	// ^topnodes/timerange/mn_x/mn_y/mx_x/mx_y/first/second/third/fourth/fifth/
	var url = baseurl + "topnodes/" + start.getFullYear() + "-" + start.getMonth() + "-" + start.getDay() + "," + end.getFullYear() + "-" + end.getMonth() + "-" + end.getDay() + "/" + mn_x.toString() + "/" + mn_y.toString() + "/" + mx_x.toString() + "/" + mx_y.toString() + "/" + ret[0] + "/" + ret[1] + "/" + ret[2] + "/" + ret[3] + "/" + ret[4] + "/";
	/*
	for (var key in ret) {
		console.log("Place: ", ++place, " User: ", key, " Nodes mapped: ", ret[key]);
	}*/
	debugger;

	$.ajax({
	    url: url,
		type: "GET",
	    dataType: "json",
	    timeout: 600000,	// Set your timeout value in milliseconds or 0 for unlimited
	    success: function(response) {

			debugger;
			// {"\u9ec3\u9756\u5a9b": "none", "samely": "crossing",`"048296609": "none", "12marina9": "none", "2370save": "none"}`
			var st = 0;
			Papa.parse(response, {
				download: true, 		// downloads the file, otherwise it doesn't work
				dynamicTyping: true, 	// automatically figures out if something is a string, number, etc
				delimiter: ",", 		// explicit statement improves speed
				worker: true,
				step: function(row) {
					// row.data[0]
					var arr = row.data[0].split(':');
					nodesTable[nums[st]] = {};
					nodesTable[nums[st]]["Rank"] = st + 1;
					nodesTable[nums[st]]["OSM Username"] = arr[0];
					nodesTable[nums[st]]["Most Frequently edited POI"] = arr[1];
					++st;
				},
				complete: function() {
					updateNodes(nodesTable);
					return 0;
				}
			});
		},
	    error: function(jqXHR, textStatus, errorThrown) {
	        if(textStatus==="timeout") {
	            console.log("Call has timed out");	// Handle the timeout
			} else {
	            console.log("Another error was returned");	// Handle other error type
			}
		}
	});
	return 1; // failure
}

/*
function ways_stats(gWest, gSouth, gEast, gNorth, gStartTime, gEndTime, gUsername){

	// Remove from here.... when CORS is taken care of
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
	// Remove upto here.... when CORS is taken care of

}*/