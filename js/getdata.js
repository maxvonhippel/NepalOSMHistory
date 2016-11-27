// this script gets data from the server
var baseurl = "http://192.168.1.33:8080/";

// get and return the array of usernames
// example: see server/geodjango/example output/testusernames.txt
function usernames () {
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
}

// get and return the json of country data
// example:
// {"Building": 22560, "Roads": 2512, "Education": 1, "Health": 9, "Mappers": 9465}
function country_stats () {
	// format the url
	url = baseurl + "jsoncountry/";
	// get the data
	$.get(url)
	.done(function(data) {
		return data;
	});
	return null;
}

// get and return the json of selection data
function selection_stats (mn_x, mn_y, mx_x, mx_y, start, end, user) {

	// format the url
	if (!user || user == null || user == "")
		user = "user";	// for now, fix the actual server later to be able to handle empty user param
	url = baseurl + "jsonselection/" + start.getFullYear() + "-" + start.getMonth() + "-" + start.getDay() + "T" + start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds() + start.getTimezoneOffset() + "," + end.getFullYear() + "-" + end.getMonth() + "-" + end.getDay() + "T" + end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds() + end.getTimezoneOffset() + "/" + mn_x.toString() + "/" + mn_y.toString() + "/" + mx_x.toString() + "/" + mx_y.toString() + "/" + user + "/";

	$.ajax({
	    url: url,
	    type: "GET",
	    dataType: "json",
	    timeout: 600000,	// Set your timeout value in milliseconds or 0 for unlimited
	    success: function(response) { return response; },
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
}

// get and return the csv data on activity

// get and return the geojson for the map