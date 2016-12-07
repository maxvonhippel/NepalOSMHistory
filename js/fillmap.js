importScripts('papaparse.min.js', 'jsonclustermap.js', 'updateui.js', 'jsonclustermap.js', 'leaflet.js', '../plugins/PruneCluster/dist/PruneCluster.js');


// For threading
// Setup an event listener that will handle messages sent to the worker.
self.addEventListener('message', function(e) {
  	// Send the message back.
  	if (e.data == "fill!") {
		console.log("roger that!  Starting to fill the map!");
		fillmap();
  	}
}, false);

var a = 0; // how many total versions have we seen?
var mks = 0; // how many total node ids have we seen?

function fillmap() {
	// -------------------------- CSV PARSING FOR THE MAP ----------------------------------
	console.log("filling map");
	Papa.parse("http://139.59.37.112/NepalOSMHistory/data/sampledaily/nodes.csv", {

		download: true, 		// downloads the file, otherwise it doesn't work
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
			self.close();
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
				self.postMessage('move!');
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
	} catch (err) { console.log(err + " full str: " + c.toString()); } // log error and move on, usually can expect a couple, it's ok
}
