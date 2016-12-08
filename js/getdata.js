// this script gets data from the server
var baseurl = "http://139.59.37.112:8080/";
var usernames;

function getsomething(url, callback) {
	$.ajax({
    	crossOrigin: true,
		url: url,
		success: function(data) {
			if (callback)
				callback(url);
			console.log("URL: ", url);
			console.log("DATA: ", data);
      		return data;
      	},
      	error: function() {
	      	console.log("error requesting ", url);
	      	return null;
      	}
    });
}

function setusernames(data) {
	console.log("setting usernames");
	usernames = data;
}

function usernames () {
	console.log("requesting usernames");
	url = baseurl + "usernames/";
	getsomething(url, setusernames);
}

usernames();

function country_stats () {
	console.log("getting country stats.");
	// format the url
	var url = baseurl + "jsoncountry/";
	var cStats = getsomething(url, updateNepalStatistics);
	return cStats; // doesn't do much; just returning in keeping up with the norm.
}

// get and return the json of selection data
function selection_stats (mn_x, mn_y, mx_x, mx_y, start, end, user) {
	console.log("getting selection stats");
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
	var url = baseurl + "jsonselection/" + start.getFullYear() + "-" + start.getMonth() + "-" + start.getDate() + "," + end.getFullYear() + "-" + end.getMonth() + "-" + end.getDate() + "/" + mn_x.toString() + "/" + mn_y.toString() + "/" + mx_x.toString() + "/" + mx_y.toString() + "/" + user + "/";
	var response = [];
	response = getsomething(url, updateSelectionStatistics);
	return response;
}


function nodes_stats(ret, start, end){
	console.log("getting nodes stats");
	var nodesTable = {};
	var nums = [ "first", "second", "third", "fourth", "fifth" ];
	// ^topnodes/timerange/mn_x/mn_y/mx_x/mx_y/first/second/third/fourth/fifth/
	var url;
	try {
		url = baseurl + "topnodes/" + start.getFullYear() + "-" + start.getMonth() + "-" + start.getDate() + "," + end.getFullYear() + "-" + end.getMonth() + "-" + end.getDate() + "/" + mn_x.toString() + "/" + mn_y.toString() + "/" + mx_x.toString() + "/" + mx_y.toString() + "/" + ret[0] + "/" + ret[1] + "/" + ret[2] + "/" + ret[3] + "/" + ret[4] + "/";
	} catch (err) { return null; }

	function handleNodesData(response) {
		var st = 0;
		Papa.parse(response, {
			download: true, 		// might not need this
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
		return 1; // failure
	}

	var response = getsomething(url, handleNodesData);
	return response;
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