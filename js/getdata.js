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
	.done(function(data) {
		return str(data);
	});
	return null;
}

// get and return the json of selection data
function selection_stats (mn_x, mn_y, mx_x, mx_y, start, end, user) {
	// format the url
	if (!user || user == null || user == "")
		user = "user";	// for now, fix the actual server later to be able to handle empty user param
	url = baseurl + "jsonselection/" + start.getFullYear() + "-" + start.getMonth() + "-" + start.getDay() + "T" + start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds() + start.getTimezoneOffset() + "," + end.getFullYear() + "-" + end.getMonth() + "-" + end.getDay() + "T" + end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds() + end.getTimezoneOffset() + "/" + mn_x.toString() + "/" + mn_y.toString() + "/" + mx_x.toString() + "/" + mx_y.toString() + "/" + user + "/";
	// get the data
	console.log("url to request:");
	console.log(url);
	$.get(url)
	.done(function(data) {
		console.log("response:");
		console.log(data);
		return data;
	});
	console.log("nothing");
	return null;
}

// get and return the csv data on activity

// get and return the geojson for the map