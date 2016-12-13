// move code
var width = 1; // current width out of 100 of the progress bar
var hundredth = 200000; // one one hundredth of the total number of nodes we will parse, approximately
var map_built = false;

// -------------------------- HELPER FUNCTION TO ANIMATE PROGRESS BAR UI ----------------------------------

// iterates the progress bar by 1%, or resets if at 100 (that shouldn't happen though)
function move() {
	try {

		if (!prog || !bar)
			console.log("no elem");
		else if (width >= 100) {
			width = 1;
			bar.style.width = width + '%';
		} else {
			width++;
			bar.style.width = width + '%';
		}
		$('#myProgress').hide().show(0);

	} catch (err) { console.log(err); }
}

var a = 0; // how many total versions have we seen?
var mks = 0; // how many total node ids have we seen?


// -------------------- full vs lite held in bool var FULLVERSION --------------------

function fillmap() {

	while (FULLVERSION == true) {
		console.log("downloading nodes gzip file");
		leafletView.RemoveMarkers();
		markers = [];
		// TODO: make it so we can begin the download, save our progress, and start again from where we were
		// this means doing the following:
		// - a django header to tell us how many there are total to downlaod
		// - javascript parsing thereof
		// - when we start reading, skip to the line that is the number we've already parsed
		// - make sure that items held in markers [] are actually re-added correctly
		// add any data we have left over in our array
		// for (var m in markers) { leafletView.RegisterMarker(m); }
		console.log("called fill_map, getting full map data");
		get_map_data("http://139.59.37.112/NepalOSMHistory/data/sampledaily/nodes.csv.gz");
		break;
	}

}

function fillmap_lite(point) {

	if (point == null)
		return;
	// remove all points on the map
	lite_markers = [];
	leafletView.RemoveMarkers();
	// what is the center of the current range?
	url = "http://139.59.37.112:8080/today/" + point.getFullYear() + "-" + (parseInt(point.getMonth()) + 1).toString() + "-" + point.getDate() + "/";
	console.log("going to fill map with data requested from: ", url);
	get_map_data(url);

}

function get_map_data(url) {

	console.log("getting map data");
	$.ajax({
        type: "GET",
		url: url,
		dataType: "text",
		success: function(data) {
			console.log("success.  Calling handlenodes.");
			handlenodes(data);
		},
		error: function(xhr, ajaxOptions, thrownError) { console.log("error getting map files: ", xhr.responseText); }
    });


}

function handlenodes(data) {

	console.log("filling map");
	if (data == "null" || data == null || !data) {
		console.log("no data for this day.");
		return;
	}

	bar.style.visibility = 'visible';
	prog.style.visibility = 'visible';

	Papa.parse(data, {

		download: false, 		// downloads the file, otherwise it doesn't work
		dynamicTyping: true, 	// automatically figures out if something is a string, number, etc
		delimiter: ",", 		// explicit statement improves speed
		worker: true,			// so the website doesn't lag
		step: function(row) {
			if (row.data[0].length == 4)
				parseresponse(row.data[0]);		// parse row by row for speed
		},
		complete: function() {

			console.log("All done parsing nodes for map from csv!");
			// remove progress bar
			bar.style.visibility = 'hidden'
			prog.style.visibility = 'hidden'
			// put stuff on map
			mymap.addLayer(leafletView);
			leafletView.ProcessView();
		},
		error: function(err, file, inputElem, reason)
		{
			// executed if an error occurs while loading the file,
			// or if before callback aborted for some reason
			console.log("error parsing map: ", err, reason);
		}
	});

}


function parseresponse(c) {

	try {
		// initialize new marker
		var marker = new PruneCluster.Marker(c[2], c[1]);
		// feature_id
		marker.data.id = c[0];
		// number of individual versions
		w = 0;
		// array of versions
		var versions = []; // possibly use new Array(n) later if I can find way to calculate N.
		marker.data.versions = [];
		// remove { and } around array string literal, maybe unnecesary?
		// then iterate over the csv within
		c[3].toString().replace(/["'{}]/g, "").replace(/([^:,]+):([^,]*)/g, function(noStep3, name, stamp) {
			// console.log("edit: ", name, " and stamp: ", stamp);
			a += 1;	// keep track of number of versions total parsed
			w += 1;
			if (a % hundredth == 0) {
				console.log("incrementing the progress bar");
				move();
			}
			versions.push([Object.freeze(name.toString()), Object.freeze(new Date(stamp.toString()))]);

		});
		// do we have a legit node to add now?
		if (w > 0) {
			marker.weight = w; // number of items in the cluster
			marker.data.versions = versions; // hold all versions in data as array
			mks += 1; // keep track of total node ids parsed

			if (FULLVERSION == true)
				markers.push(marker);	// add to array used for filtering
			else lite_markers.push(marker);
			console.log("adding marker to leaflet view");
			leafletView.RegisterMarker(marker); // add to map (not yet rendered)
		}
	} catch (err) { console.log(err + "; full str: " + c.toString()); } // log error and move on, usually can expect a couple, it's ok

}
