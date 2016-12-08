// move code
var width = 1; // current width out of 100 of the progress bar
var hundredth = 200000; // one one hundredth of the total number of nodes we will parse, approximately
var map_built = false;
// -------------------------- HELPER FUNCTIONS TO REMOVE PROGRESS BARS FROM UI ----------------------------------
Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	for(var i = this.length - 1; i >= 0; i--) {
	    if(this[i] && this[i].parentElement) {
	        this[i].parentElement.removeChild(this[i]);
	    }
	}
}

// -------------------------- HELPER FUNCTION TO ANIMATE PROGRESS BAR UI ----------------------------------

// iterates the progress bar by 1%, or resets if at 100 (that shouldn't happen though)
function move() {
	if (!elem)
		console.log("no elem");
	else if (width >= 100) {
		width = 1;
		elem.style.width = width + '%';
	} else {
		width++;
		elem.style.width = width + '%';
	}
	$('#myProgress').hide().show(0);
}

var a = 0; // how many total versions have we seen?
var mks = 0; // how many total node ids have we seen?


// -------------------- full vs lite held in bool var FULLVERSION --------------------

function fillmap() {
	console.log("downloading nodes gzip file");
	get_map_data("http://139.59.37.112/NepalOSMHistory/data/sampledaily/nodes.csv.gz")
}

function fillmap_lite() {
	// what is the center of the current range?
	var midpoint = new Date((gStartTime.getTime() + gEndTime.getTime()) / 2);
	url = "http://139.59.37.112/today/" + midpoint.getFullYear() + "-" + (parseInt(midpoint.getMonth()) + 1).toString() + midpoint.getDate() + "/";
	get_map_data(url);
}

function get_map_data(url) {
	$.ajax({
        type: "GET",
		url: url,
		dataType: "text",
		success: function(data) { handlenodes(data); },
		error: function(xhr, ajaxOptions, thrownError) { console.log("error getting map files: ", xhr.responseText); }
    });
}


function handlenodes(data) {
	// -------------------------- CSV PARSING FOR THE MAP ----------------------------------
	console.log("filling map");
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
			document.getElementById("myBar").remove();
			document.getElementById("myProgress").remove();
			// clean up markers array
			markers.length = mks;
			// put stuff on map
			map.addLayer(leafletView);
			map_built = true;
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
			markers.push(marker);	// add to array used for filtering
			leafletView.RegisterMarker(marker); // add to map (not yet rendered)
		}
	} catch (err) { console.log(err + "; full str: " + c.toString()); } // log error and move on, usually can expect a couple, it's ok
}
