// this script gets data from the server
var baseurl = "http://192.168.1.25:8000/";

// get and return the array of usernames
// example: see server/geodjango/example output/testusernames.txt
function usernames () {
	// format the url
	url = baseurl + "usernames/";
	var usernames = [];
	// get the data
	$.get(url)
	.done(function(data) {
    	usernames = data;
    	return usernames;
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
	.done(function(data)) {
		return str(data);
	});
	return null;
}

// get and return the json of selection data
function selection_stats (mn_x, mn_y, mx_x, mx_y, start, end, user) {
	// format the url
	url = baseurl + "jsonselection/" + $.format.date(start, 'yyyy-MM-ddTHH:mm:ss') + start.getTimezoneOffset() + "," + $.format.date(end, 'yyyy-MM-ddTHH:mm:ss') + end.getTimezoneOffset() + "/" + str(mn_x) + "/" + str(mn_y) + "/" + str(mx_x) + "/" + str(mx_y) + "/" + user + "/";
	// get the data
	$.get(url)
	.done(function(data)) {
		return str(data);
	});
	return null;
}

// get and return the csv data on activity

// get and return the geojson for the map